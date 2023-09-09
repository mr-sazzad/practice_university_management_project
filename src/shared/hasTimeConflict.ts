import { weekDays } from '@prisma/client';

type ExistingSlots = {
  startTime: string;
  endTime: string;
  dayOfWeek: weekDays;
}[];

type NewSlot = {
  startTime: string;
  endTime: string;
  dayOfWeek: weekDays;
};

export const hasTimeConflict = (
  newSlot: NewSlot,
  existingSlots: ExistingSlots
) => {
  for (const slot of existingSlots) {
    const existingStart = new Date(`1970-01-01T${slot.startTime}:00`);
    const existingEnd = new Date(`1970-01-01T${slot.endTime}:00`);
    const newStart = new Date(`1970-01-01T${newSlot.startTime}:00`);
    const newEnd = new Date(`1970-01-01T${newSlot.endTime}:00`);

    if (existingStart > newStart && newEnd > existingEnd) {
      return true;
    }
  }
  return false;
};
