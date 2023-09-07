import { Building } from '@prisma/client';
import prisma from '../../../libs/prismadb';

const createBuilding = async (data: Building): Promise<Building> => {
  const createdBuilding = await prisma.building.create({
    data,
  });

  return createdBuilding;
};

export const buildingServices = {
  createBuilding,
};
