import { z } from 'zod';

const statusEnum = ['UPCOMING', 'ONGOING', 'ENDED'] as const;

export const create = z.object({
  body: z.object({
    startDate: z
      .string({ required_error: 'Start Date is required !' })
      .nonempty(),
    endDate: z.string({ required_error: 'End Date is required !' }).nonempty(),
    status: z.enum(statusEnum, { required_error: 'Status is required !' }),
    minCredit: z.number({ required_error: 'MinCredit is required !' }),
    maxCredit: z.number({ required_error: 'MaxCredit is required !' }),
    academicSemesterId: z.string({
      required_error: 'AcademicSemesterId is required !',
    }),
  }),
});
