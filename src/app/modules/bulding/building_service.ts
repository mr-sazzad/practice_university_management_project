import { Building, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IFilters, IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../libs/prismadb';

const createBuilding = async (data: Building): Promise<Building> => {
  const createdBuilding = await prisma.building.create({
    data,
  });

  return createdBuilding;
};

const getAllBuildings = async (
  options: IPaginationOptions,
  filters: IFilters
): Promise<IGenericResponse<Building[]>> => {
  const { page, skip, pageSize } =
    paginationHelpers.calculatePagination(options);

  const { searchTerm } = filters;

  const andCondition = [];

  if (searchTerm && searchTerm.length > 0) {
    andCondition.push({
      OR: ['title'].map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.BuildingWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const data = await prisma.building.findMany({
    where: whereConditions,
    take: pageSize,
    skip,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.building.count();

  return {
    meta: {
      page,
      pageSize,
      total,
    },
    data,
  };
};

const getSingleBuilding = async (id: string) => {
  if (!id) {
    throw new ApiError(401, 'BAD REQUEST !');
  }

  const result = await prisma.building.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateSingleBuilding = async (
  id: string,
  data: Partial<Building>
): Promise<Building> => {
  if (!id) {
    throw new ApiError(401, 'BAD REQUEST !');
  }

  const result = await prisma.building.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteSingleBuilding = async (id: string) => {
  if (!id) {
    throw new ApiError(401, 'BAD REQUEST !');
  }

  const result = await prisma.building.delete({
    where: {
      id,
    },
  });

  return result;
};

export const buildingServices = {
  createBuilding,
  getAllBuildings,
  getSingleBuilding,
  updateSingleBuilding,
  deleteSingleBuilding,
};
