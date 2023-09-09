import { OfferedCourseClassSchedule, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import {
  IGenericResponse,
  IOfferedCourseClassScheduleFilterRequest,
} from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../libs/prismadb';
import { checkRoomAvailability } from '../../../shared/checkRoomAvailability';
import {
  offeredCourseClassScheduleRelationalFields,
  offeredCourseClassScheduleRelationalFieldsMapper,
  offeredCourseClassScheduleSearchAbleFields,
} from './offered_coures_class_schedule_constants';

const createOfferedCourseClassSchedule = async (
  data: OfferedCourseClassSchedule
): Promise<OfferedCourseClassSchedule> => {
  await checkRoomAvailability(data);

  const result = await prisma.offeredCourseClassSchedule.create({
    data,
    include: {
      semesterRegistration: true,
      offeredCourseSection: true,
      room: true,
      faculty: true,
    },
  });

  return result;
};

const getAllOfferedCourseClassSchedule = async (
  filters: IOfferedCourseClassScheduleFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<OfferedCourseClassSchedule[]>> => {
  const { pageSize, page, skip } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: offeredCourseClassScheduleSearchAbleFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (offeredCourseClassScheduleRelationalFields.includes(key)) {
          return {
            [offeredCourseClassScheduleRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.OfferedCourseClassScheduleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.offeredCourseClassSchedule.findMany({
    include: {
      faculty: true,
      semesterRegistration: true,
      room: true,
      offeredCourseSection: true,
    },
    where: whereConditions,
    skip,
    take: pageSize,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.offeredCourseClassSchedule.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      pageSize,
    },
    data: result,
  };
};

const getSingleOfferedCourseClassSchedule = async (
  id: string
): Promise<OfferedCourseClassSchedule | null> => {
  const result = await prisma.offeredCourseClassSchedule.findUnique({
    where: {
      id,
    },
    include: {
      faculty: true,
      semesterRegistration: true,
      room: true,
      offeredCourseSection: true,
    },
  });
  return result;
};

const updateSingleCourseClassSchedule = async (
  id: string,
  data: Partial<OfferedCourseClassSchedule>
): Promise<OfferedCourseClassSchedule> => {
  const result = await prisma.offeredCourseClassSchedule.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteSingeOfferedCourseClassSchedule = async (
  id: string
): Promise<OfferedCourseClassSchedule> => {
  const result = await prisma.offeredCourseClassSchedule.delete({
    where: {
      id,
    },
  });
  return result;
};

export const OfferedCourseClassScheduleService = {
  deleteSingeOfferedCourseClassSchedule,
  getSingleOfferedCourseClassSchedule,
  getAllOfferedCourseClassSchedule,
  createOfferedCourseClassSchedule,
  updateSingleCourseClassSchedule,
};
