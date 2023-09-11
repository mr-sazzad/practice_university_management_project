import { z } from 'zod';

export const create = z.object({
  body: z.object({
    startTime: z.string({ required_error: 'Start time is required !' }),
    endTime: z.string({ required_error: 'End time is required !' }),
    dayOfWeek: z.string({ required_error: 'Day of week is required !' }),
    offeredCourseSectionId: z.string({
      required_error: 'Offered course section id is required !',
    }),
    semesterRegistrationId: z.string({
      required_error: ' semester registration id is required !',
    }),
    roomId: z.string({ required_error: ' Room id is required !' }),
    facultyId: z.string({ required_error: 'Faculty id is required' }),
  }),
});

export const update = z.object({
  body: z.object({
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    dayOfWeek: z.string().optional(),
    offeredCourseSectionId: z.string().optional(),
    semesterRegistrationId: z.string().optional(),
    roomId: z.string().optional(),
    facultyId: z.string().optional(),
  }),
});
