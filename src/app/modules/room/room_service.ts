import { Room } from '@prisma/client';
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

export const roomServices = {
  createRoom,
  getAllRooms,
};
