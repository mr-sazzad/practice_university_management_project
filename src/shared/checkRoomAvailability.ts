import { OfferedCourseClassSchedule } from '@prisma/client';
import ApiError from '../errors/ApiError';
import prisma from '../libs/prismadb';
import { hasTimeConflict } from './hasTimeConflict';

export const checkRoomAvailability = async (
  data: OfferedCourseClassSchedule
) => {
  const MatchedEntries = await prisma.offeredCourseClassSchedule.findMany({
    where: {
      dayOfWeek: data.dayOfWeek,
      room: {
        id: data.roomId,
      },
    },
  });

  const existingSlots = MatchedEntries.map(match => ({
    startTime: match.startTime,
    endTime: match.endTime,
    dayOfWeek: match.dayOfWeek,
  }));

  const newSlot = {
    startTime: data.startTime,
    endTime: data.endTime,
    dayOfWeek: data.dayOfWeek,
  };

  if (hasTimeConflict(newSlot, existingSlots)) {
    throw new ApiError(409, 'Room Is Already Booked');
  }
};

export const checkFacultyAvailability = async (
  data: OfferedCourseClassSchedule
) => {
  const MatchedEntries = await prisma.offeredCourseClassSchedule.findMany({
    where: {
      dayOfWeek: data.dayOfWeek,
      faculty: {
        id: data.facultyId,
      },
    },
  });

  const existingSlots = MatchedEntries.map(match => ({
    startTime: match.startTime,
    endTime: match.endTime,
    dayOfWeek: match.dayOfWeek,
    facultyId: match.facultyId,
  }));

  const newSlot = {
    startTime: data.startTime,
    endTime: data.endTime,
    dayOfWeek: data.dayOfWeek,
    facultyId: data.facultyId,
  };

  if (hasTimeConflict(newSlot, existingSlots)) {
    throw new ApiError(409, 'Faculty Is Already Booked');
  }
};
