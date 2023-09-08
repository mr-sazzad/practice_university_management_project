import { Prisma } from '@prisma/client';
import { IGenericErrorMessage } from '../interfaces/error';

const PrismaClientKnownRequestError = (
  error: Prisma.PrismaClientKnownRequestError
) => {
  let errors: IGenericErrorMessage[] = [];

  const statusCode = 400;
  let message = '';

  if (error.code === 'p2025') {
    message = (error.meta?.cause as string) || 'Something went wrong !';
    errors = [
      {
        path: '',
        message,
      },
    ];
  }
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default PrismaClientKnownRequestError;
