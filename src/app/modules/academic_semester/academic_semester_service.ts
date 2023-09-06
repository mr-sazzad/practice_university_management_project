import { AcademicSemester, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IFilters, IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../libs/prismadb';

const createAcademicSemester = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data,
  });

  return result;
};

const getAllSemesters = async (
  filters: IFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
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

  const whereConditions: Prisma.AcademicSemesterWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const data = await prisma.academicSemester.findMany({
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

  const response: IGenericResponse<AcademicSemester[]> = {
    meta: {
      total,
      page,
      pageSize,
    },
    data,
  };

  return response;
};

const getSingleAcademicSemester = async (
  id: string
): Promise<AcademicSemester | null> => {
  const isExist = await prisma.academicSemester.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(404, 'Record Not Found !');
  }

  const result = await prisma.academicSemester.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateSingleAcademicSemester = async (
  id: string,
  data: Partial<AcademicSemester>
): Promise<AcademicSemester> => {
  const updatedAcademicSemester = prisma.academicSemester.update({
    where: {
      id,
    },
    data,
  });

  return updatedAcademicSemester;
};

const deleteSingleAcademicSemester = async (
  id: string
): Promise<AcademicSemester | null> => {
  const deletedAcademicSemester = prisma.academicSemester.delete({
    where: {
      id,
    },
  });
  return deletedAcademicSemester;
};

export const academicSemester = {
  createAcademicSemester,
  getAllSemesters,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
  deleteSingleAcademicSemester,
};
