import { RequestHandler } from 'express';
import pick from '../../../shared/pick';
import { academicSemester } from './academic_semester_service';

export const createAcademicSemester: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const payload = req.body;

    const result = await academicSemester.createAcademicSemester(payload);

    res.status(201).json({
      statusCode: 201,
      success: true,
      message: 'Academic Semester created successfully !',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllSemesters: RequestHandler = async (req, res, next) => {
  try {
    const filters = pick(req.query, [
      'searchTerm',
      'code',
      'startMonth',
      'endMonth',
      'title',
    ]);

    const options = pick(req.query, [
      'page',
      'pageSize',
      'sortBy',
      'sortOrder',
    ]);

    const result = await academicSemester.getAllSemesters(filters, options);

    res.status(201).json({
      statusCode: 201,
      success: true,
      message: 'Academic Semester created successfully !',
      meta: result.meta,
      data: result.data,
    });
  } catch (err: any) {
    next(err);
  }
};
