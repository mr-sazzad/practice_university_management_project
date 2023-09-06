import { Faculty } from '@prisma/client';
import prisma from '../../../libs/prismadb';

const createFaculty = async (data: Faculty): Promise<Faculty> => {
  const createdFaculty = await prisma.faculty.create({
    data,
  });

  return createdFaculty;
};

const getAllFaculty = async () => {
  const faculties = await prisma.faculty.findMany({});

  return faculties;
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
