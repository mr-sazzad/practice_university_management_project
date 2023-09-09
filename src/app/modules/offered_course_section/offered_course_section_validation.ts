import { z } from 'zod';

export const insert = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title not provided !' }),
    maxCapacity: z.number({ required_error: ' Maximum capacity exceeded ' }),
    currentlyEnrolledStudent: z.number(),
    offeredCourseId: z.string({
      required_error: ' Offered Course ID not provided',
    }),
  }),
});

export const update = z.object({
  body: z.object({
    title: z.string().optional(),
    maxCapacity: z.number().optional(),
    currentlyEnrolledStudent: z.number().optional(),
    offeredCourseId: z.string().optional(),
  }),
});
