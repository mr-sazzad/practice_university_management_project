import { RequestHandler } from 'express';
import { OfferedCoursesService } from './offered_courses_service';

export const createOfferedCourse: RequestHandler = async (req, res, next) => {
  try {
    const result = await OfferedCoursesService.createOfferedCourse(req.body);
    res.status(201).json({
      status: 201,
      success: true,
      message: 'Offered course created successfully',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
