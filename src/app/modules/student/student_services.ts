import { Prisma, Student } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IFilters, IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../libs/prismadb';

const createStudent = async (data: Student): Promise<Student> => {
  console.log(data);
  const createdStudent = await prisma.student.create({
    data,
  });

  return createdStudent;
};

const getAllUsers = async (filters: IFilters, options: IPaginationOptions) => {
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

  const whereConditions: Prisma.StudentWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const data = await prisma.student.findMany({
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

  const total = await prisma.student.count();

  const response: IGenericResponse<Student[]> = {
    meta: {
      total,
      page,
      pageSize,
    },
    data,
  };

  return response;
};

const getSingleStudent = async (id: string): Promise<Student | null> => {
  const student = await prisma.student.findUnique({
    where: {
      id,
    },
  });

  return student;
};

const updateSingleUser = async (
  id: string,
  data: Partial<Student>
): Promise<Student> => {
  const updatedUser = prisma.student.update({
    where: {
      id,
    },
    data,
    include: {
      academicSemester: true,
      academicDepartment: true,
      academicFaculty: true,
    },
  });

  return updatedUser;
};

const deleteSingleUser = async (id: string): Promise<Student | null> => {
  const deletedUser = prisma.student.delete({
    where: {
      id,
    },
    include: {
      academicSemester: true,
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  return deletedUser;
};

export const studentServices = {
  createStudent,
  getAllUsers,
  getSingleStudent,
  updateSingleUser,
  deleteSingleUser,
};
