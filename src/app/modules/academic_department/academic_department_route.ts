import { Router } from 'express';
import {
  createAcademicDepartment,
  deleteSingleDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateSingleDepartment,
} from './academic_department_controller';

const router = Router();

router.post('/create-department', createAcademicDepartment);

router.get('/', getAllDepartments);

router.get('/:id', getSingleDepartment);

router.patch('/:id', updateSingleDepartment);

router.delete('/:id', deleteSingleDepartment);

export const academicDepartmentRoutes = router;
