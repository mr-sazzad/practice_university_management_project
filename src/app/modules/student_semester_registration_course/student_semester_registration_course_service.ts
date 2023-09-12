import { semesterRegistrationStatus } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../libs/prismadb';

const enrollIntoCourse = async (
  userId: string,
  payload: { offeredCourseId: string; offeredCourseSectionId: string }
): Promise<{ message: string }> => {
  const student = await prisma.student.findFirst({
    where: {
      studentId: userId,
    },
  });

  if (!student) {
    throw new ApiError(401, 'Student Information not found!');
  }

  const ongoingSemester = await prisma.semesterRegistration.findFirst({
    where: {
      status: semesterRegistrationStatus.ONGOING,
    },
  });

  if (!ongoingSemester) {
    throw new ApiError(400, 'No ongoing semester');
  }

  const offeredCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: payload.offeredCourseId,
    },
    include: {
      course: true,
    },
  });

  if (!offeredCourse) {
    throw new ApiError(404, 'Offered Course Not Found!');
  }

  const offeredCourseSection = await prisma.offeredCourseSection.findFirst({
    where: {
      id: payload.offeredCourseSectionId,
    },
  });

  if (!offeredCourseSection) {
    throw new ApiError(404, 'Offered Course Section Not Found!');
  }

  if (
    offeredCourseSection.currentlyEnrolledStudent &&
    offeredCourseSection.maxCapacity
  ) {
    if (
      offeredCourseSection.currentlyEnrolledStudent >=
      offeredCourseSection.maxCapacity
    ) {
      throw new ApiError(
        400,
        `You can't enroll more than ${offeredCourseSection.maxCapacity} students in this section`
      );
    }
  }

  await prisma.$transaction(async tx => {
    await tx.studentSemesterRegistrationCourse.create({
      data: {
        studentId: student?.id,
        semesterRegistrationId: ongoingSemester.id,
        offeredCourseId: payload.offeredCourseId,
        offeredCourseSectionId: payload.offeredCourseSectionId,
      },
    });
    await tx.offeredCourseSection.update({
      where: {
        id: payload.offeredCourseSectionId,
      },
      data: {
        currentlyEnrolledStudent: {
          increment: 1,
        },
      },
    });
    await tx.studentSemesterRegistration.updateMany({
      where: {
        student: {
          id: student?.id,
        },
        semesterRegistration: {
          id: ongoingSemester.id,
        },
      },
      data: {
        totalCreditsTaken: {
          increment: offeredCourse.course.credits,
        },
      },
    });
  });
  return {
    message: 'Successfully enrolled into the course',
  };
};

const withDrawFromCourse = async (
  userId: string,
  payload: { offeredCourseId: string; offeredCourseSectionId: string }
): Promise<{ message: string }> => {
  const student = await prisma.student.findFirst({
    where: {
      studentId: userId,
    },
  });

  if (!student) {
    throw new ApiError(401, 'Student Information not found!');
  }

  const ongoingSemester = await prisma.semesterRegistration.findFirst({
    where: {
      status: semesterRegistrationStatus.ONGOING,
    },
  });

  if (!ongoingSemester) {
    throw new ApiError(400, 'No ongoing semester');
  }

  const offeredCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: payload.offeredCourseId,
    },
    include: {
      course: true,
    },
  });

  if (!offeredCourse) {
    throw new ApiError(404, 'Offered Course Not Found!');
  }

  await prisma.$transaction(async tx => {
    await tx.studentSemesterRegistrationCourse.delete({
      where: {
        semesterRegistrationId_studentId_offeredCourseId: {
          semesterRegistrationId: ongoingSemester.id,
          studentId: student.id,
          offeredCourseId: payload.offeredCourseId,
        },
      },
    });
    await tx.offeredCourseSection.update({
      where: {
        id: payload.offeredCourseSectionId,
      },
      data: {
        currentlyEnrolledStudent: {
          decrement: 1,
        },
      },
    });
    await tx.studentSemesterRegistration.updateMany({
      where: {
        student: {
          id: student?.id,
        },
        semesterRegistration: {
          id: ongoingSemester.id,
        },
      },
      data: {
        totalCreditsTaken: {
          decrement: offeredCourse.course.credits,
        },
      },
    });
  });
  return {
    message: 'Successfully withdraw from course',
  };
};

export const studentSemesterRegistrationCourse = {
  enrollIntoCourse,
  withDrawFromCourse,
};
