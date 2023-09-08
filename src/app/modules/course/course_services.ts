import { CourseFaculty } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { ICourse } from '../../../interfaces/common';
import { IFilters, IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../libs/prismadb';

const createCourse = async (data: ICourse): Promise<ICourse | null> => {
  const { preRequisiteCourses, ...course } = data;

  const newCourse = await prisma.$transaction(async tx => {
    const result = await tx.course.create({
      data: course,
    });

    if (!result) {
      throw new ApiError(401, 'unable to create course !');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      preRequisiteCourses.forEach(async element => {
        await tx.courseToPrereqisite.create({
          data: {
            courseId: result.id,
            preRequisiteId: element.courseId,
          },
        });
      });
    }

    return result;
  });

  if (newCourse) {
    const data = await prisma.course.findUnique({
      where: {
        id: newCourse.id,
      },
      include: {
        preRequisite: {
          include: {
            course: true,
          },
        },
        preRequisiteFor: {
          include: {
            preRequisitCourse: true,
          },
        },
      },
    });
    return data;
  }

  throw new ApiError(401, 'Unable to create course !');
};

const getAllCourses = async (
  options: IPaginationOptions,
  filters: IFilters
) => {
  const { page, pageSize, skip } =
    paginationHelpers.calculatePagination(options);

  const { searchTerm, ...others } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: [searchTerm].map(filed => ({
        [filed]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(others).length > 0) {
    andConditions.push({
      AND: Object.keys(others).map(filed => ({
        [filed]: {
          equals: (others as any)[filed],
        },
      })),
    });
  }

  const whereConditions =
    andConditions.length && andConditions.length > 0
      ? { AND: andConditions }
      : {};

  const courses = await prisma.course.findMany({
    where: whereConditions,
    skip,
    take: pageSize,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.course.count();

  return {
    meta: {
      page,
      pageSize,
      total,
    },
    data: courses,
  };
};

const updateSingleCourse = async (id: string, payload: Partial<ICourse>) => {
  const { preRequisiteCourses, ...courseData } = payload;

  await prisma.$transaction(async tx => {
    const isExist = await tx.course.findFirst({
      where: {
        id,
      },
    });
    if (!isExist) {
      throw new ApiError(401, 'Course not found');
    }

    const updatedCourse = await tx.course.update({
      where: {
        id,
      },
      data: courseData,
    });

    if (!updatedCourse) {
      throw new ApiError(401, 'Unable to update course');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPreRequisite = preRequisiteCourses.filter(
        course => course.courseId && course.isAcceptDeletion
      );

      const newPreRequisiteCourses = preRequisiteCourses.filter(
        course => course.courseId && !course.isAcceptDeletion
      );

      for (let i = 0; i < deletedPreRequisite.length; i++) {
        await tx.courseToPrereqisite.deleteMany({
          where: {
            AND: [
              { courseId: id },
              { preRequisiteId: deletedPreRequisite[i].courseId },
            ],
          },
        });
      }
      for (let i = 0; i < newPreRequisiteCourses.length; i++) {
        await tx.courseToPrereqisite.create({
          data: {
            courseId: id,
            preRequisiteId: newPreRequisiteCourses[i].courseId,
          },
        });
      }
    }
    return updatedCourse;
  });

  const data = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      preRequisite: {
        include: {
          course: true,
        },
      },
      preRequisiteFor: {
        include: {
          preRequisitCourse: true,
        },
      },
    },
  });
  return data;
};

const getSingleCourse = async (id: string) => {
  const data = await prisma.course.findUnique({
    where: {
      id,
    },
  });

  if (data) {
    return data;
  }
  throw new ApiError(401, 'Unable to get course!');
};

const deleteSingleCourse = async (id: string) => {
  const data = await prisma.course.delete({
    where: {
      id,
    },
  });
  if (data) {
    return data;
  }
  throw new ApiError(401, 'Unable to delete course!');
};

const assignFaculties = async (
  id: string,
  payload: string[]
): Promise<CourseFaculty[]> => {
  await prisma.courseFaculty.createMany({
    data: payload.map(facultyId => ({
      courseId: id,
      facultyId,
    })),
  });

  const assignedFaculties = await prisma.courseFaculty.findMany({
    where: {
      courseId: id,
    },
    include: {
      faculty: true,
    },
  });

  return assignedFaculties;
};

const removeFaculties = async (id: string, payload: string[]) => {
  await prisma.courseFaculty.deleteMany({
    where: {
      courseId: id,
      facultyId: {
        in: payload,
      },
    },
  });

  const response = await prisma.courseFaculty.findMany({
    where: {
      courseId: id,
    },
    include: {
      faculty: true,
    },
  });

  return response;
};

export const courseServices = {
  createCourse,
  getSingleCourse,
  deleteSingleCourse,
  getAllCourses,
  updateSingleCourse,
  assignFaculties,
  removeFaculties,
};
