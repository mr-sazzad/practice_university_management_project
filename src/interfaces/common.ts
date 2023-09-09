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
  preRequisiteCourses?: {
    courseId: string;
    isAcceptDeletion?: boolean;
  }[];
};

export type IOfferedCourse = {
  academicDepartmentId: string;
  semesterRegistrationId: string;
  courseIds: string[];
};

export type IOfferedCourseClassScheduleFilterRequest = {
  searchTerm?: string | null;
  offeredCourseSectionId?: string | null;
  roomId?: string | null;
  facultyId?: string | null;
};
