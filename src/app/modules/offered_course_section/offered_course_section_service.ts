import { OfferedCourse, OfferedCourseSection, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IFilters, IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../libs/prismadb';

const createOfferedCourseSection = async (
  data: any
): Promise<OfferedCourseSection> => {
  const isOfferedCourseExist = await prisma.offeredCourse.findFirst({
    where: {
      id: data.offeredCourseId,
    },
  });

  if (!isOfferedCourseExist) {
    throw new ApiError(401, 'Offered course does not exist');
  }
  // add semester registration
  data.semesterRegistrationId = isOfferedCourseExist?.semesterRegistrationId;
  const result = await prisma.offeredCourseSection.create({
    data,
  });
  return result;
};

const getAllOfferedCourseSections = async (
  options: IPaginationOptions,
  filters: IFilters
): Promise<IGenericResponse<OfferedCourseSection[]>> => {
  const { page, pageSize, skip } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...others } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: ['title', 'maxCapacity', 'currentlyEnrolledStudent'].map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(others).length > 0) {
    andConditions.push({
      AND: Object.keys(others).map(field => ({
        [field]: {
          equals: (others as any)[field],
        },
      })),
    });
  }

  const whereConditions: Prisma.OfferedCourseSectionWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.offeredCourseSection.findMany({
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

  const total = await prisma.offeredCourseSection.count();

  return {
    meta: {
      page,
      pageSize,
      total,
    },
    data: result,
  };
};

const getSingleOfferedCourseSection = async (id: string) => {
  const result = await prisma.offeredCourseSection.findUnique({
    where: {
      id,
    },
    include: {
      offeredCourse: true,
    },
  });
  return result;
};

const updateSingleOfferedCourseSection = async (
  id: string,
  data: Partial<OfferedCourse>
) => {
  const result = await prisma.offeredCourseSection.update({
    where: { id },
    data,
  });
  return result;
};

const deleteSingleOfferedCourseSection = async (id: string) => {
  const result = await prisma.offeredCourseSection.delete({
    where: { id },
  });
  return result;
};

export const offeredCoursesSectionService = {
  createOfferedCourseSection,
  getAllOfferedCourseSections,
  getSingleOfferedCourseSection,
  updateSingleOfferedCourseSection,
  deleteSingleOfferedCourseSection,
};
