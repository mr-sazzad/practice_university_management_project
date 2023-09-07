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
