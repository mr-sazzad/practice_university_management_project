import { RequestHandler } from 'express';
import { studentEnrollCourseMarkService } from './student_enroll_course_mark_service';

export const updateStudentMark: RequestHandler = async (req, res, next) => {
  try {
    const result = await studentEnrollCourseMarkService.updateStudentMark(
      req.body
    );
    res.status(200).json({
      status: 200,
      success: true,
      message: 'Student Mark updated successfully',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateFinalMarks: RequestHandler = async (req, res, next) => {
  try {
    const result = await studentEnrollCourseMarkService.updateFinalMarks(
      req.body
    );
    res.status(200).json({
      status: 200,
      success: true,
      message: 'Student Final marks updated successfully',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
