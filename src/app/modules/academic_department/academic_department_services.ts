import { AcademicDepartment } from '@prisma/client';
import prisma from '../../../libs/prismadb';

const createAcademicDepartment = async (
  data: AcademicDepartment
): Promise<AcademicDepartment> => {
  const createdDepartment = await prisma.academicDepartment.create({
    data,
  });

  return createdDepartment;
};

const getAllDepartments = async (): Promise<AcademicDepartment[]> => {
  const departments = await prisma.academicDepartment.findMany({});

  return departments;
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

export const departmentServices = {
  createAcademicDepartment,
  getAllDepartments,
  getSingleDepartment,
};
