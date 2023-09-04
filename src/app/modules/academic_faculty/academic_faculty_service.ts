import { AcademicFaculty, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IFilters, IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../libs/prismadb';

const createAcademicFaculty = async (data: AcademicFaculty) => {
  const result = await prisma?.academicFaculty.create({
    data,
  });
  return result;
};

const getAllAcademicFaculty = async (
  pagination: IPaginationOptions,
  filters: IFilters
): Promise<IGenericResponse<AcademicFaculty[]>> => {
  const { page, pageSize, skip } =
    paginationHelpers.calculatePagination(pagination);

  const { searchTerm } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      OR: ['title'].map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.AcademicFacultyWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.academicFaculty.findMany({
    where: whereConditions,
    take: pageSize,
    skip,
    orderBy:
      pagination.sortBy && pagination.sortOrder
        ? {
            [pagination.sortBy]: pagination.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.academicFaculty.count();

  return {
    meta: {
      page,
      pageSize,
      total,
    },
    data: result,
  };
};

const getSingleAcademicFaculty = async (
  id: string
): Promise<AcademicFaculty | null> => {
  const isExist = await prisma.academicFaculty.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(404, 'Record Not Found !');
  }

  const result = await prisma.academicFaculty.findUnique({
    where: {
      id,
    },
  });

  return result;
};

export const academicFaculty = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
};
