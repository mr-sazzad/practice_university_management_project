import { RequestHandler } from 'express';
import { academicFaculty } from './academic_faculty_service';

export const createAcademicFaculty: RequestHandler = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await academicFaculty.createAcademicFaculty(payload);

    res.status(201).json({
      statusCode: 201,
      success: true,
      message: 'Academic Faculty created successfully !',
      data: result,
    });
  } catch (err: any) {
    console.log(err, 'ACADEMIC_FACULTY_CONTROLLER');
    next(err);
  }
};
