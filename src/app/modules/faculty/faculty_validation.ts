import { z } from 'zod';

export const create = z.object({
  body: z.object({
    firstName: z.string({ required_error: 'First name is Required !' }),
    lastName: z.string({ required_error: 'Last Name is Required !' }),
    meddleName: z.string({ required_error: 'Middle Name is Required !' }),
    profileImage: z.string({ required_error: 'Profile Image Is Required' }),
    email: z.string({ required_error: 'Email is Required !' }),
    contactNo: z.string({ required_error: 'Contact No is Required !' }),
    gender: z.string({ required_error: 'Gender is Required !' }),
    bloodGroup: z.string({ required_error: 'Blood Group is Required !' }),
    designation: z.string({ required_error: 'Designation is Required !' }),
    facultyId: z.string({ required_error: 'Faculty ID is Required !' }),
    departmentId: z.string({ required_error: 'Department Id is Required !' }),
  }),
});

export const update = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    meddleName: z.string().optional(),
    profileImage: z.string().optional(),
    email: z.string().optional(),
    contactNo: z.string().optional(),
    gender: z.string().optional(),
    bloodGroup: z.string().optional(),
    designation: z.string().optional(),
    facultyId: z.string().optional(),
    departmentId: z.string().optional(),
  }),
});

export const assignOrRemove = z.object({
  body: z.object({
    courses: z.array(z.string(), { required_error: 'Courses are Required !' }),
  }),
});
