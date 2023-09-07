import { IGenericErrorMessage } from './error';

export type IGenericResponse<T> = {
  meta: {
    page: number;
    pageSize: number;
    total: number;
  };
  data: T;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type ICourse = {
  title: string;
  code: string;
  credits: number;
  preRequisiteCourses: {
    courseId: string;
  }[];
};
