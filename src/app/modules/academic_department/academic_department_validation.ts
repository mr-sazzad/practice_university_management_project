import { z } from 'zod';

export const create = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is Required !' }),
    academicFacultyId: z.string({
      required_error: 'Academic Faculty ID is Required !',
    }),
  }),
});
