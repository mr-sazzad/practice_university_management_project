import { RequestHandler } from 'express';
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
    const result = await departmentServices.getAllDepartments();

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

export const getSingleDepartment: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await departmentServices.getSingleDepartment(id);

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
