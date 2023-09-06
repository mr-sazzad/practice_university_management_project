import { RequestHandler } from 'express';
import pick from '../../../shared/pick';
import { facultyServices } from './faculty_sevices';

export const createFaculty: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await facultyServices.createFaculty(data);

    res.status(201).json({
      statusCode: 201,
      success: true,
      message: 'Student Created successfully !',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllFaculty: RequestHandler = async (req, res, next) => {
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
    const result = await facultyServices.getAllFaculty(filters, options);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'students retrieved successfully !',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleFaculty: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await facultyServices.getSingleFaculty(id);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'student retrieved successfully !',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
