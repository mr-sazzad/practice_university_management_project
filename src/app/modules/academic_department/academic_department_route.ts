import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createAcademicDepartment,
  deleteSingleDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateSingleDepartment,
} from './academic_department_controller';
import { create } from './academic_department_validation';

const router = Router();

router.post(
  '/create-department',
  validateRequest(create),
  createAcademicDepartment
);

router.get('/', getAllDepartments);

router.get('/:id', getSingleDepartment);

router.patch('/:id', updateSingleDepartment);

router.delete('/:id', deleteSingleDepartment);

export const academicDepartmentRoutes = router;
