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
    ]; //for handling foreign key errors 🦀
  } else if (error.code === 'p2003') {
    if (error.message.includes('delete()` invocation')) {
      message = 'Delete Failed';
      errors = [
        {
          path: '',
          message,
        },
      ];
    }
  }
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default PrismaClientKnownRequestError;
