import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createAcademicSemester,
  deleteSingleAcademicSemester,
  getAllSemesters,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
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

router.patch('/:id', updateSingleAcademicSemester);

router.delete('/:id', deleteSingleAcademicSemester);

export default router;
