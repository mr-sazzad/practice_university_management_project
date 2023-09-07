import { Room } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../libs/prismadb';

const createRoom = async (data: Room): Promise<Room> => {
  const createdRoom = await prisma.room.create({
    data,
  });

  return createdRoom;
};

const getAllRooms = async () => {
  const result = await prisma.room.findMany({});

  return result;
};

const getSingleRoom = async (id: string) => {
  if (!id) {
    throw new ApiError(401, 'BAD REQUEST !');
  }

  const result = await prisma.room.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateSingleRoom = async (
  id: string,
  data: Partial<Room>
): Promise<Room> => {
  if (!id) {
    throw new ApiError(401, 'BAD REQUEST !');
  }

  const result = await prisma.room.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteSingleRoom = async (id: string) => {
  if (!id) {
    throw new ApiError(401, 'BAD REQUEST !');
  }

  const result = await prisma.room.delete({
    where: {
      id,
    },
  });

  return result;
};

export const roomServices = {
  createRoom,
  getAllRooms,
  getSingleRoom,
  updateSingleRoom,
  deleteSingleRoom,
};
