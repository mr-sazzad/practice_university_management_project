import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createAcademicSemester,
  getAllSemesters,
  getSingleAcademicSemester,
} from './academic_semester_controller';
import { academicSemesterValidation } from './academic_semester_validation';

const router = Router();

router.post(
  '/create-semester',
  validateRequest(academicSemesterValidation),
  createAcademicSemester
);

router.get('/all-semesters', getAllSemesters);

router.get('/:id', getSingleAcademicSemester);

export default router;
