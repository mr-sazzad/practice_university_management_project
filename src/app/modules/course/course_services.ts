import ApiError from '../../../errors/ApiError';
import { ICourse } from '../../../interfaces/common';
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

export const courseServices = {
  createCourse,
};
