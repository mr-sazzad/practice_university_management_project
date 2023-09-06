import { z } from 'zod';

export const create = z.object({
  body: z.object({
    studentId: z.string({ required_error: 'student ID is required !' }),
    firstName: z.string({ required_error: 'First Name is Required !' }),
    lastName: z.string({ required_error: 'Last Name is Required !' }),
    middleName: z.string({ required_error: 'MiddleName is Required !' }),
    profileImage: z.string({ required_error: 'Profile Image is Required !' }),
    email: z.string({ required_error: 'Email is Required !' }).email(),
    contactNo: z.string({ required_error: 'Contact No is Required !' }),
    gender: z.string({ required_error: 'Gender is Required !' }),
    bloodGroup: z.string({ required_error: 'Blood Group is Required !' }),
  }),
});

export const update = z.object({
  body: z.object({
    studentId: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    middleName: z.string().optional(),
    profileImage: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    gender: z.string().optional(),
    bloodGroup: z.string().optional(),
  }),
});
