import { z } from 'zod';

export const create = z.object({
  body: z.object({
    roomNumber: z.string({ required_error: 'Room Number is required !' }),
    floor: z.string({ required_error: 'Floor is Required !' }),
    buildingId: z.string({ required_error: 'Building ID is Required !' }),
  }),
});
