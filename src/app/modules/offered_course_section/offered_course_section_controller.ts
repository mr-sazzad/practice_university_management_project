import { RequestHandler } from 'express';
import pick from '../../../shared/pick';
import { offeredCoursesSectionService } from './offered_course_section_service';

export const CreateOfferedCourseSection: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await offeredCoursesSectionService.createOfferedCourseSection(req.body);
    res.status(201).json({
      status: 201,
      success: true,
      message: 'Offered course section created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllOfferedCourseSections: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const options = pick(req.query, [
      'page',
      'pageSize',
      'sortOrder',
      'sortBy',
    ]);
    const filters = pick(req.query, ['searchTerm', 'title']);
    const result =
      await offeredCoursesSectionService.getAllOfferedCourseSections(
        options,
        filters
      );
    res.status(200).json({
      status: 200,
      success: true,
      message: 'Offered course sections fetched successfully',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleOfferedCourseSection: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id;
    const result =
      await offeredCoursesSectionService.getSingleOfferedCourseSection(id);
    res.status(200).json({
      status: 200,
      success: true,
      message: 'Offered course section fetched successfully',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateSingleOfferedCourseSection: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result =
      await offeredCoursesSectionService.updateSingleOfferedCourseSection(
        id,
        data
      );
    res.status(200).json({
      status: 200,
      success: true,
      message: 'Offered course section updated successfully',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteSingleOfferedCourseSection: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id;
    const result =
      await offeredCoursesSectionService.deleteSingleOfferedCourseSection(id);
    res.status(200).json({
      status: 200,
      success: true,
      message: 'Offered course section deleted successfully',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
