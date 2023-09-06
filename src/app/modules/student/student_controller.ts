import { RequestHandler } from 'express';
import { studentServices } from './student_services';

export const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await studentServices.createStudent(data);

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

export const getAllStudents: RequestHandler = async (req, res, next) => {
  try {
    const result = await studentServices.getAllUsers();

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

export const getSingleStudent: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await studentServices.getSingleUser(id);

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
