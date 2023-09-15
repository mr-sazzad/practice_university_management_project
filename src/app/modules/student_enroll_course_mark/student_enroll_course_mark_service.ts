import {
  ExamType,
  Prisma,
  PrismaClient,
  StudentEnrolledCourseStatus,
} from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../libs/prismadb';
import { calcCGPAandGrads, setGrade } from './student_enroll_course_mark_utils';

const createStudentEnrolledCourseDefaultMark = async (
  tx: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
  payload: {
    studentId: string;
    studentEnrollCourseId: string;
    academicSemesterId: string;
  }
) => {
  const isExist = await tx.studentEnrolledCourseMark.findFirst({
    where: {
      examType: ExamType.MIDTERM,
      student: {
        id: payload.studentId,
      },
      studentEnrolledCourse: {
        id: payload.studentEnrollCourseId,
      },
      academicSemester: {
        id: payload.academicSemesterId,
      },
    },
  });

  if (!isExist) {
    await prisma?.studentEnrolledCourseMark.create({
      data: {
        student: {
          connect: {
            id: payload.studentId,
          },
        },
        studentEnrolledCourse: {
          connect: {
            id: payload.studentEnrollCourseId,
          },
        },
        academicSemester: {
          connect: {
            id: payload.academicSemesterId,
          },
        },
        examType: ExamType.MIDTERM,
      },
    });
  }
  const isExistFinalTerm = await tx.studentEnrolledCourseMark.findFirst({
    where: {
      examType: ExamType.FINAL,
      student: {
        id: payload.studentId,
      },
      studentEnrolledCourse: {
        id: payload.studentEnrollCourseId,
      },
      academicSemester: {
        id: payload.academicSemesterId,
      },
    },
  });

  if (!isExistFinalTerm) {
    await prisma?.studentEnrolledCourseMark.create({
      data: {
        student: {
          connect: {
            id: payload.studentId,
          },
        },
        studentEnrolledCourse: {
          connect: {
            id: payload.studentEnrollCourseId,
          },
        },
        academicSemester: {
          connect: {
            id: payload.academicSemesterId,
          },
        },
        examType: ExamType.FINAL,
      },
    });
  }
};

const updateStudentMark = async (payload: any) => {
  console.log(payload);
  const { studentId, academicSemesterId, courseId, examType, marks } = payload;

  const result = await setGrade(marks);

  const studentEnrollCourseMark =
    await prisma.studentEnrolledCourseMark.findFirst({
      where: {
        student: {
          id: studentId,
        },
        academicSemester: {
          id: academicSemesterId,
        },
        studentEnrolledCourse: {
          id: courseId,
        },
        examType,
      },
    });

  if (!studentEnrollCourseMark) {
    throw new ApiError(404, 'Student mark not found');
  }

  const updateStudentMarks = await prisma.studentEnrolledCourseMark.update({
    where: {
      id: studentEnrollCourseMark.id,
    },
    data: {
      marks,
      grade: result.grade,
    },
  });

  return updateStudentMarks;
};

const updateFinalMarks = async (payload: any) => {
  const { studentId, academicSemesterId, courseId } = payload;

  const studentEnrollCourse = await prisma.studentEnrolledCourse.findFirst({
    where: {
      student: {
        id: studentId,
      },
      academicSemester: {
        id: academicSemesterId,
      },
      course: {
        id: courseId,
      },
    },
  });

  if (!studentEnrollCourse) {
    throw new ApiError(404, 'Student Enrolled Course not found');
  }

  const studentEnrolledCourseMark =
    await prisma.studentEnrolledCourseMark.findMany({
      where: {
        student: {
          id: studentId,
        },
        academicSemester: {
          id: academicSemesterId,
        },
        studentEnrolledCourse: {
          id: courseId,
        },
      },
    });

  if (!studentEnrolledCourseMark.length) {
    throw new ApiError(404, 'Student Enrolled Course Mark not found');
  }
  const midtermMark =
    studentEnrolledCourseMark.find(item => item.examType === 'MIDTERM')
      ?.marks || 0;
  const finalTermMark =
    studentEnrolledCourseMark.find(item => item.examType === 'FINAL')?.marks ||
    0;

  const totalFinalMarks =
    Math.ceil(midtermMark * 0.4) + Math.ceil(finalTermMark * 0.6);

  const result = setGrade(totalFinalMarks);

  await prisma.studentEnrolledCourse.updateMany({
    where: {
      student: {
        id: studentId,
      },
      academicSemester: {
        id: academicSemesterId,
      },
      course: {
        id: courseId,
      },
    },
    data: {
      grade: result.grade,
      point: result.point,
      totalMarks: totalFinalMarks,
      status: StudentEnrolledCourseStatus.COMPLETED,
    },
  });

  const grads = await prisma.studentEnrolledCourse.findMany({
    where: {
      student: {
        id: studentId,
      },
      status: StudentEnrolledCourseStatus.COMPLETED,
    },
    include: {
      course: true,
    },
  });

  const academicResult = calcCGPAandGrads(grads);

  const studentAcademicInfo = await prisma.studentEnrolledCourse.findFirst({
    where: {
      student: {
        id: studentId,
      },
    },
  });

  if (studentAcademicInfo) {
    await prisma.studentAcademicInfo.update({
      where: {
        id: studentAcademicInfo.id,
      },
      data: {
        cgpa: academicResult.cgpa,
        totalCompletedCredits: academicResult.totalCompletedCredits,
      },
    });
  } else {
    await prisma.studentAcademicInfo.create({
      data: {
        student: {
          connect: {
            id: studentId,
          },
        },
        cgpa: academicResult.cgpa,
        totalCompletedCredits: academicResult.totalCompletedCredits,
      },
    });
  }
  return grads;
};

export const studentEnrollCourseMarkService = {
  createStudentEnrolledCourseDefaultMark,
  updateStudentMark,
  updateFinalMarks,
};
