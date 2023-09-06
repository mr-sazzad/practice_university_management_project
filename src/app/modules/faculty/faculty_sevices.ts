import { Faculty, Prisma } from '@prisma/client';
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

export const facultyServices = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
};
