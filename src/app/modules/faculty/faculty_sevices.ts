import { CourseFaculty, Faculty, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IFilters, IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../libs/prismadb';

const createFaculty = async (data: Faculty): Promise<Faculty> => {
  const createdFaculty = await prisma.faculty.create({
    data,
  });

  return createdFaculty;
};

const getAllFaculty = async (
  filters: IFilters,
  options: IPaginationOptions
) => {
  const { page, pageSize, skip } =
    paginationHelpers.calculatePagination(options);

  const { searchTerm, ...others } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      OR: ['title', 'code', 'startMonth', 'endMonth'].map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(others).length > 0) {
    andCondition.push({
      AND: Object.keys(others).map(field => ({
        [field]: {
          equals: (others as any)[field],
        },
      })),
    });
  }

  const whereConditions: Prisma.FacultyWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const data = await prisma.faculty.findMany({
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
  const total = await prisma.academicSemester.count();

  const response: IGenericResponse<Faculty[]> = {
    meta: {
      total,
      page,
      pageSize,
    },
    data,
  };

  return response;
};

const getSingleFaculty = async (id: string): Promise<Faculty | null> => {
  const faculty = await prisma.faculty.findUnique({
    where: {
      id,
    },
  });

  return faculty;
};

const updateSingleFaculty = async (
  id: string,
  data: Partial<Faculty>
): Promise<Faculty> => {
  const updatedFaculty = prisma.faculty.update({
    where: {
      id,
    },
    data,
  });

  return updatedFaculty;
};

const deleteSingleFaculty = async (id: string): Promise<Faculty | null> => {
  const deletedFaculty = prisma.faculty.delete({
    where: {
      id,
    },
  });
  return deletedFaculty;
};

const assignCourses = async (
  id: string,
  payload: string[]
): Promise<CourseFaculty[]> => {
  await prisma.courseFaculty.createMany({
    data: payload.map(courseId => ({
      facultyId: id,
      courseId,
    })),
  });

  const assignedCourses = await prisma.courseFaculty.findMany({
    where: {
      facultyId: id,
    },
    include: {
      course: true,
    },
  });

  return assignedCourses;
};

const removeCourses = async (id: string, payload: string[]) => {
  await prisma.courseFaculty.deleteMany({
    where: {
      facultyId: id,
      courseId: {
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

export const facultyServices = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateSingleFaculty,
  deleteSingleFaculty,
  assignCourses,
  removeCourses,
};
