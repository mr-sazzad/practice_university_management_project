import { RequestHandler } from 'express';
import { IFilters, IPaginationOptions } from '../../../interfaces/pagination';
import pick from '../../../shared/pick';
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
    next(err);
  }
};

export const getAllAcademicFaculty: RequestHandler = async (req, res, next) => {
  try {
    const pagination: IPaginationOptions = pick(req.query, [
      'page',
      'pageSize',
      'sortBy',
      'sortOrder',
    ]);
    const filters: IFilters = pick(req.query, ['searchTerm']);
    const result = await academicFaculty.getAllAcademicFaculty(
      pagination,
      filters
    );

    res.status(201).json({
      statusCode: 201,
      success: true,
      message: 'Academic Faculties Retrieved successfully !',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleAcademicFaculty: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id;
    const result = await academicFaculty.getSingleAcademicFaculty(id);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Academic Faculty Retrieved successfully !',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
