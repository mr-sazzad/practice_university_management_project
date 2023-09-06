import { Router } from 'express';
import {
  createAcademicDepartment,
  getAllDepartments,
  getSingleDepartment,
} from './academic_department_controller';

const router = Router();

router.post('/create-student', createAcademicDepartment);

router.get('/', getAllDepartments);

router.get('/:id', getSingleDepartment);

export const studentRoutes = router;
