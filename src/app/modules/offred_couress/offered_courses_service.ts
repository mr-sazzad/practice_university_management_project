import { OfferedCourse } from '@prisma/client';
import { IOfferedCourse } from '../../../interfaces/common';
import prisma from '../../../libs/prismadb';

const createOfferedCourse = async (
  course: IOfferedCourse
): Promise<OfferedCourse[]> => {
  const { courseIds, academicDepartmentId, semesterRegistrationId } = course;

  const result: OfferedCourse[] = [];
  await Promise.all(
    courseIds.map(async (courseId: string) => {
      const isExist = await prisma.offeredCourse.findFirst({
        where: {
          academicDepartmentId,
          semesterRegistrationId,
          courseId,
        },
      });

      if (!isExist) {
        const createdOfferedCourse = await prisma.offeredCourse.create({
          data: {
            academicDepartmentId,
            semesterRegistrationId,
            courseId,
          },
          include: {
            course: true,
            semesterRegistration: true,
            academicDepartment: true,
          },
        });

        result.push(createdOfferedCourse);
      }
    })
  );

  return result;
};

export const OfferedCoursesService = {
  createOfferedCourse,
};
