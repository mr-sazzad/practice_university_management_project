import {
  Prisma,
  SemesterRegistration,
  semesterRegistrationStatus,
} from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IFilters, IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../libs/prismadb';

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
  });
  return result;
};

const updateSingleSemester = async (
  id: string,
  payload: Partial<SemesterRegistration>
): Promise<SemesterRegistration> => {
  const result = await prisma.semesterRegistration.update({
    where: { id },
    data: payload,
  });

  return result;
};

const deleteSingleSemester = async (id: string) => {
  const result = await prisma.semesterRegistration.delete({
    where: { id },
  });
  return result;
};

export const semesterRegistrationService = {
  createSemesterRegistration,
  getAllCreatedSemesters,
  getSingleCreatedSemester,
  updateSingleSemester,
  deleteSingleSemester,
};
