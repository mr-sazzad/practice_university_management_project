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

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Academic Semesters retrieved successfully !',
      meta: result.meta,
      data: result.data,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleAcademicSemester: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    const result = await academicSemester.getSingleAcademicSemester(id);

    res.status(200).json({
      statusCode: result ? 200 : 404,
      success: result ? true : false,
      message: result
        ? 'Academic Semester retrieved successfully !'
        : 'NOT FOUND',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateSingleAcademicSemester: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const result = await academicSemester.updateSingleAcademicSemester(
      id,
      payload
    );
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Academic Semester updated successfully!',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteSingleAcademicSemester: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    const result = await academicSemester.deleteSingleAcademicSemester(id);
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Academic Semester deleted successfully!',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
