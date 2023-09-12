import { z } from 'zod';

const statusEnum = ['UPCOMING', 'ONGOING', 'ENDED'] as const;

export const create = z.object({
  body: z.object({
    startDate: z
      .string({ required_error: 'Start Date is required !' })
      .nonempty(),
    endDate: z.string({ required_error: 'End Date is required !' }).nonempty(),
    status: z.enum(statusEnum).optional(),
    minCredit: z.number({ required_error: 'MinCredit is required !' }),
    maxCredit: z.number({ required_error: 'MaxCredit is required !' }),
    academicSemesterId: z.string({
      required_error: 'AcademicSemesterId is required !',
    }),
  }),
});

export const update = z.object({
  body: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    status: z
      .enum(['UPCOMING', 'ONGOING', 'ENDED'] as [string, ...string[]])
      .optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
    academicSemesterId: z.string().optional(),
  }),
});

export const CourseValidationEnrollOrWithdraw = z.object({
  body: z.object({
    offeredCourseId: z.string({
      required_error: 'offeredCourseId is required',
    }),
    offeredCourseSectionId: z.string({
      required_error: 'offeredCourseSectionId is required',
    }),
  }),
});
