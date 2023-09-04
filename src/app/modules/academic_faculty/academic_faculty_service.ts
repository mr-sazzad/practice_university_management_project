import { AcademicFaculty } from '@prisma/client';
import prisma from '../../../libs/prismadb';

const createAcademicFaculty = async (data: AcademicFaculty) => {
  const result = await prisma?.academicFaculty.create({
    data,
  });
  return result;
};

export const academicFaculty = {
  createAcademicFaculty,
};
