import { RequestHandler } from 'express';
import pick from '../../../shared/pick';
import { semesterRegistrationService } from './semester_registration_service';

export const createSemesterRegistration: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const payload = req.body;
    const result = await semesterRegistrationService.createSemesterRegistration(
      payload
    );

    res.status(201).json({
      status: 201,
      success: true,
      message: 'Registration successfully created',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllCreatedSemesters: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const filters = pick(req.query, ['searchTerm', 'status']);
    const options = pick(req.query, [
      'page',
      'pageSize',
      'sortBy',
      'sortOrder',
    ]);

    const result = await semesterRegistrationService.getAllCreatedSemesters(
      filters,
      options
    );
    res.status(200).json({
      status: 200,
      success: true,
      message: 'Semesters successfully retrieved',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleCreatedSemester: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id;
    const result = await semesterRegistrationService.getSingleCreatedSemester(
      id
    );
    res.status(200).json({
      status: 200,
      success: true,
      message: 'Semester successfully retrieved',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateSingleSemester: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const result = await semesterRegistrationService.updateSingleSemester(
      id,
      payload
    );
    res.status(200).json({
      status: 200,
      success: true,
      message: 'Semester successfully updated',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteSingleSemester: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await semesterRegistrationService.deleteSingleSemester(id);
    res.status(200).json({
      status: 200,
      success: true,
      message: 'Semester successfully deleted',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const startMyRegistration: RequestHandler = async (req, res, next) => {
  try {
    const user = (req as any).user;
    const result = await semesterRegistrationService.startMyRegistration(
      user.userId
    );

    res.status(201).json({
      status: 201,
      success: true,
      message: 'Student Semester Registration started',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
