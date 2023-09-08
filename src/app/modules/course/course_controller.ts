import { RequestHandler } from 'express';
import pick from '../../../shared/pick';
import { courseServices } from './course_services';

export const createCourse: RequestHandler = async (req, res, next) => {
  try {
    const course = req.body;
    const createdCourse = await courseServices.createCourse(course);

    res.status(201).json({
      statusCode: 201,
      success: true,
      message: 'Course created successfully',
      data: createdCourse,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllCourses: RequestHandler = async (req, res, next) => {
  try {
    const filters = pick(req.query, ['title', 'code', 'credits']);

    const pagination = pick(req.query, [
      'page',
      'pageSize',
      'skip',
      'sortBy',
      'sortOrder',
    ]);

    const courses = await courseServices.getAllCourses(filters, pagination);
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Courses fetched successfully',
      data: courses,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateSingleCourse: RequestHandler = async (req, res, next) => {
  try {
    const course = req.body;
    const id = req.params.id;
    const updatedCourse = await courseServices.updateSingleCourse(id, course);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Course updated successfully',
      data: updatedCourse,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleCourse: RequestHandler = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const course = await courseServices.getSingleCourse(courseId);
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Course retrieved successfully',
      data: course,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteSingleCourse: RequestHandler = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;

    await courseServices.deleteSingleCourse(courseId);
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (err: any) {
    next(err);
  }
};
