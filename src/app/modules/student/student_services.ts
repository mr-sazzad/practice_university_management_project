import { Student } from '@prisma/client';
import prisma from '../../../libs/prismadb';

const createStudent = async (data: Student): Promise<Student> => {
  const createdUser = await prisma.student.create({
    data,
  });

  return createdUser;
};

const getAllUsers = async () => {
  const users = await prisma.student.findMany({});

  return users;
};

const getSingleUser = async (studentId: string): Promise<Student | null> => {
  const user = await prisma.student.findUnique({
    where: {
      studentId,
    },
  });

  return user;
};

export const studentServices = {
  createStudent,
  getAllUsers,
  getSingleUser,
};
