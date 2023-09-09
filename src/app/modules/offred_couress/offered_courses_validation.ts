import { z } from 'zod';

export const create = z.object({
  body: z.object({
    courseIds: z.array(
      z.string({ required_error: 'courseId not provided !' }),
      { required_error: 'courseIds not provided !' }
    ),
    academicDepartmentId: z.string({
      required_error: 'Academic Department ID not provided !',
    }),
    semesterRegistration: z.string({
      required_error: ' Semester Registration ID not provided !',
    }),
  }),
});
