import { RequestHandler } from 'express';
import pick from '../../../shared/pick';
import { departmentServices } from './academic_department_services';

export const createAcademicDepartment: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const data = req.body;
    const result = await departmentServices.createAcademicDepartment(data);

    res.status(201).json({
      statusCode: 201,
      success: true,
      message: 'Academic Department Created successfully !',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllDepartments: RequestHandler = async (req, res, next) => {
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

    const result = await departmentServices.getAllDepartments(filters, options);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Academic Departments retrieved successfully !',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleDepartment: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await departmentServices.getSingleDepartment(id);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Academic Department retrieved successfully !',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateSingleDepartment: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await departmentServices.updateSingleDepartment(id, data);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Academic Department Updated successfully !',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteSingleDepartment: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id;
    const result = await departmentServices.deleteSingleDepartment(id);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Academic Department Deleted successfully !',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
