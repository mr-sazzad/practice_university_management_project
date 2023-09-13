import {
  Course,
  OfferedCourse,
  Prisma,
  SemesterRegistration,
  StudentSemesterRegistration,
  StudentSemesterRegistrationCourse,
  semesterRegistrationStatus,
} from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IFilters, IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../libs/prismadb';
import { studentSemesterRegistrationCourse } from '../student_semester_registration_course/student_semester_registration_course_service';

const createSemesterRegistration = async (
  data: SemesterRegistration
): Promise<SemesterRegistration> => {
  const anySemesterRunning = await prisma.semesterRegistration.findFirst({
    where: {
      OR: [
        { status: semesterRegistrationStatus.UPCOMING },
        { status: semesterRegistrationStatus.ONGOING },
      ],
    },
  });

  if (anySemesterRunning) {
    throw new ApiError(
      401,
      'There was a problem registering the specified semester'
    );
  }

  const result = await prisma.semesterRegistration.create({
    data,
  });
  return result;
};

const startMyRegistration = async (
  userId: string
): Promise<{
  semesterRegistration: SemesterRegistration | null;
  studentSemesterRegistration: StudentSemesterRegistration | null;
}> => {
  const studentInfo = await prisma.student.findFirst({
    where: {
      id: userId,
    },
  });

  if (!studentInfo) {
    throw new ApiError(401, 'Student Information not found !');
  }

  const semesterInfo = await prisma.semesterRegistration.findFirst({
    where: {
      status: {
        in: [
          semesterRegistrationStatus.UPCOMING,
          semesterRegistrationStatus.ONGOING,
        ],
      },
    },
  });

  if (semesterInfo?.status === semesterRegistrationStatus.UPCOMING) {
    throw new ApiError(401, `Registration Is Not Started yet`);
  }

  let studentRegistration = await prisma.studentSemesterRegistration.findFirst({
    where: {
      student: {
        id: studentInfo.id,
      },
      semesterRegistration: {
        id: semesterInfo?.id,
      },
    },
  });

  if (!studentRegistration) {
    studentRegistration = await prisma.studentSemesterRegistration.create({
      data: {
        student: {
          connect: {
            id: studentInfo.id,
          },
        },
        semesterRegistration: {
          connect: {
            id: semesterInfo?.id,
          },
        },
      },
    });
  }
  return {
    semesterRegistration: semesterInfo,
    studentSemesterRegistration: studentRegistration,
  };
};

const getAllCreatedSemesters = async (
  filters: IFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<SemesterRegistration[]>> => {
  const { searchTerm, status } = filters;
  const { page, pageSize, skip } = await paginationHelpers.calculatePagination(
    options
  );

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: ['startDate', 'endDate', 'status', 'minCredit', 'maxCredit'].map(
        field => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })
      ),
    });
  }

  if (status) {
    andConditions.push({
      status: {
        equals: status,
      },
    });
  }

  const whereConditions: Prisma.SemesterRegistrationWhereInput =
    andConditions && andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.semesterRegistration.findMany({
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
  const total = await prisma.semesterRegistration.count();

  return {
    meta: {
      page,
      pageSize,
      total: total,
    },
    data: result,
  };
};

const getSingleCreatedSemester = async (id: string) => {
  const result = await prisma.semesterRegistration.findUnique({
    where: {
      id,
    },
    include: {
      academicSemester: true,
    },
  });
  return result;
};

const updateSingleSemester = async (
  id: string,
  payload: Partial<SemesterRegistration>
): Promise<SemesterRegistration> => {
  const isExist = await prisma.semesterRegistration.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(404, 'Recourse Not Found !');
  }

  if (
    payload.status &&
    isExist.status === semesterRegistrationStatus.UPCOMING &&
    payload.status === semesterRegistrationStatus.ONGOING
  ) {
    throw new ApiError(400, 'Can Only Move From UPCOMING to ONGOING');
  }

  if (
    payload.status &&
    isExist.status === semesterRegistrationStatus.ONGOING &&
    payload.status === semesterRegistrationStatus.ENDED
  ) {
    throw new ApiError(400, 'Can Only Move From ONGOING to ENDED');
  }

  const result = await prisma.semesterRegistration.update({
    where: { id },
    data: payload,
    include: {
      academicSemester: true,
    },
  });

  return result;
};

const deleteSingleSemester = async (id: string) => {
  const result = await prisma.semesterRegistration.delete({
    where: { id },
    include: {
      academicSemester: true,
    },
  });
  return result;
};

const enrollIntoCourseService = async (
  userId: string,
  payload: any
): Promise<{ message: string }> => {
  const result = await studentSemesterRegistrationCourse.enrollIntoCourse(
    userId,
    payload
  );

  return result;
};

const withDrawFromCourseService = async (
  userId: string,
  payload: { offeredCourseId: string; offeredCourseSectionId: string }
): Promise<{ message: string }> => {
  const result = await studentSemesterRegistrationCourse.withDrawFromCourse(
    userId,
    payload
  );

  return result;
};

const confirmRegistration = async (
  userId: string
): Promise<{ message: string }> => {
  const onGoingSemesterRegistration =
    await prisma.semesterRegistration.findFirst({
      where: {
        status: semesterRegistrationStatus.ONGOING,
      },
    });

  if (!onGoingSemesterRegistration) {
    throw new ApiError(401, 'There is no ongoing semester registration');
  }

  const studentSemesterRegistration =
    await prisma.studentSemesterRegistration.findFirst({
      where: {
        semesterRegistration: {
          id: onGoingSemesterRegistration?.id,
        },
        student: {
          studentId: userId,
        },
      },
    });

  if (!studentSemesterRegistration) {
    throw new ApiError(401, 'You are not registered in this semester');
  }

  const maxCredit = onGoingSemesterRegistration.maxCredit;
  const minCredit = onGoingSemesterRegistration.minCredit;
  const totalCreditsTaken = studentSemesterRegistration?.totalCreditsTaken;

  if (totalCreditsTaken === 0) {
    throw new ApiError(401, 'You are not registered in this semester');
  }

  if (minCredit && maxCredit && totalCreditsTaken) {
    if (totalCreditsTaken < minCredit) {
      throw new ApiError(401, `You have taken less than ${minCredit} credits`);
    } else if (totalCreditsTaken > maxCredit) {
      throw new ApiError(401, `You have taken more than ${maxCredit} credits`);
    } else {
      await prisma.studentSemesterRegistration.update({
        where: {
          id: studentSemesterRegistration.id,
        },
        data: {
          isConfirmed: true,
        },
      });
    }
  }

  return { message: 'Registration Confirmed' };
};

const getMyRegistration = async (userId: string) => {
  const semesterRegistration = await prisma.semesterRegistration.findFirst({
    where: {
      status: semesterRegistrationStatus.ONGOING,
    },
    include: {
      academicSemester: true,
    },
  });
  const studentSemesterRegistration =
    await prisma.studentSemesterRegistration.findFirst({
      where: {
        semesterRegistration: {
          id: semesterRegistration?.id,
        },
        student: {
          studentId: userId,
        },
      },
      include: {
        student: true,
      },
    });

  return { semesterRegistration, studentSemesterRegistration };
};

const startNewSemester = async (semesterId: string) => {
  const semesterRegistration = await prisma.semesterRegistration.findUnique({
    where: {
      id: semesterId,
    },
    include: {
      academicSemester: true,
    },
  });
  if (!semesterRegistration) {
    throw new ApiError(404, 'Semester Registration Not Found');
  }

  if (semesterRegistration.status !== semesterRegistrationStatus.ENDED) {
    throw new ApiError(401, 'Semester Registration Not Ended yet !');
  }

  if (semesterRegistration.academicSemester.isCurrent) {
    throw new ApiError(401, 'Semester Registration Already Started!');
  }
  await prisma.$transaction(async ts => {
    await ts.academicSemester.updateMany({
      where: {
        isCurrent: true,
      },
      data: {
        isCurrent: false,
      },
    });

    await ts.academicSemester.update({
      where: {
        id: semesterRegistration.academicSemester.id,
      },
      data: {
        isCurrent: true,
      },
    });

    const studentSemesterRegistrations =
      await prisma.studentSemesterRegistration.findMany({
        where: {
          semesterRegistration: {
            id: semesterRegistration.id,
          },
          isConfirmed: true,
        },
      });
    for (const studentRegistration of studentSemesterRegistrations) {
      await (async studentRegistration => {
        const studentSemesterRegistrationCourses =
          await prisma.studentSemesterRegistrationCourse.findMany({
            where: {
              semesterRegistration: {
                id: semesterRegistration.id,
              },
              student: {
                id: studentRegistration.studentId,
              },
            },
            include: {
              offeredCourse: {
                include: {
                  course: true,
                },
              },
            },
          });
        for (const RegistrationCourse of studentSemesterRegistrationCourses) {
          await (async (
            RegistrationCourse: StudentSemesterRegistrationCourse & {
              offeredCourse: OfferedCourse & { course: Course };
            }
          ) => {
            const enrolledCourseData = {
              studentId: RegistrationCourse.studentId,
              courseId: RegistrationCourse.offeredCourse.courseId,
              academicSemesterId: semesterRegistration.academicSemesterId,
            };

            const isExist = await prisma.studentEnrolledCourse.findFirst({
              where: {
                studentId: RegistrationCourse.studentId,
                courseId: RegistrationCourse.offeredCourse.courseId,
                academicSemesterId: semesterRegistration.academicSemesterId,
              },
            });

            if (!isExist) {
              await prisma.studentEnrolledCourse.create({
                data: enrolledCourseData,
              });
            }
          })(RegistrationCourse);
        }
      })(studentRegistration);
    }
  });

  return {
    message: 'semester started successfully',
  };
};

export const semesterRegistrationService = {
  createSemesterRegistration,
  withDrawFromCourseService,
  getSingleCreatedSemester,
  enrollIntoCourseService,
  getAllCreatedSemesters,
  deleteSingleSemester,
  updateSingleSemester,
  startMyRegistration,
  confirmRegistration,
  getMyRegistration,
  startNewSemester,
};
