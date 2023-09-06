import { AcademicDepartment, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IFilters, IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../libs/prismadb';

const createAcademicDepartment = async (
  data: AcademicDepartment
): Promise<AcademicDepartment> => {
  const createdDepartment = await prisma.academicDepartment.create({
    data,
  });

  return createdDepartment;
};

const getAllDepartments = async (
  filters: IFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicDepartment[]>> => {
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

  const whereConditions: Prisma.AcademicDepartmentWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const data = await prisma.academicDepartment.findMany({
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

  const response: IGenericResponse<AcademicDepartment[]> = {
    meta: {
      total,
      page,
      pageSize,
    },
    data,
  };

  return response;
};

const getSingleDepartment = async (
  id: string
): Promise<AcademicDepartment | null> => {
  const user = await prisma.academicDepartment.findUnique({
    where: {
      id,
    },
  });

  return user;
};

const updateSingleDepartment = async (
  id: string,
  data: Partial<AcademicDepartment>
): Promise<AcademicDepartment> => {
  const updatedDepartment = prisma.academicDepartment.update({
    where: {
      id,
    },
    data,
    include: {
      academicFaculty: true,
    },
  });

  return updatedDepartment;
};

const deleteSingleDepartment = async (
  id: string
): Promise<AcademicDepartment | null> => {
  const deletedDepartment = prisma.academicDepartment.delete({
    where: {
      id,
    },
    include: {
      academicFaculty: true,
    },
  });
  return deletedDepartment;
};

export const departmentServices = {
  createAcademicDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateSingleDepartment,
  deleteSingleDepartment,
};
