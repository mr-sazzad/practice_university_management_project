import { RequestHandler } from 'express';
import pick from '../../../shared/pick';
import { OfferedCourseClassScheduleService } from './offered_course_class_schedule_service';

export const createOfferedCourseClassSchedule: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await OfferedCourseClassScheduleService.createOfferedCourseClassSchedule(
        req.body
      );

    return res.status(201).json({
      status: 201,
      success: true,
      message: 'Offered Course Class Schedule Created Successfully',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllOfferedCourseClassSchedule: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const options = pick(req.query, [
      'page',
      'pageSize',
      'sortBy',
      'sortOrder',
    ]);
    const filters = pick(req.query, [
      'searchTerm',
      'dayOfWeek',
      'offeredCourseSectionId',
      'semesterRegistrationId',
      'roomId',
      'facultyId',
    ]);
    const result =
      await OfferedCourseClassScheduleService.getAllOfferedCourseClassSchedule(
        options,
        filters
      );
    return res.status(200).json({
      status: 200,
      success: true,
      message: 'Offered Course Class Schedule Retrieved Successfully',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleOfferedCourseClassSchedule: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await OfferedCourseClassScheduleService.getSingleOfferedCourseClassSchedule(
        req.params.id
      );
    return res.status(200).json({
      status: 200,
      success: true,
      message: 'Offered Course Class Schedule Retrieved Successfully',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateOfferedCourseClassSchedule: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const result =
      await OfferedCourseClassScheduleService.updateSingleCourseClassSchedule(
        id,
        data
      );
    return res.status(200).json({
      status: 200,
      success: true,
      message: 'Offered Course Class Schedule Updated Successfully',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteSingeOfferedCourseClassSchedule: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id;
    const result =
      await OfferedCourseClassScheduleService.deleteSingeOfferedCourseClassSchedule(
        id
      );
    return res.status(200).json({
      status: 200,
      success: true,
      message: 'Offered Course Class Schedule Deleted Successfully',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
