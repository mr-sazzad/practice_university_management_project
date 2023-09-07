import prisma from '../../../libs/prismadb';

const createCourse = async (data: any): Promise<any> => {
  const { preRequisiteCourses, ...course } = data;
  const newCourse = await prisma.$transaction(async tx => {
    const result = await tx.course.create({
      data: course,
    });

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      for (let i = 0; i <= preRequisiteCourses.length; i++) {
        await tx.courseToPrereqisite.create({
          data: {
            courseId: result.id,
            preRequisiteId: preRequisiteCourses[i].courseId,
          },
        });
      }
    }

    return result;
  });

  if (newCourse) {
    const data = prisma.course.findUnique({
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
};

export const courseServices = {
  createCourse,
};
