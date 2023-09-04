import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
} from './academic_faculty_controller';
import { create } from './academic_faculty_validation';

const router = Router();

router.post('/create', validateRequest(create), createAcademicFaculty);

router.get('/', getAllAcademicFaculty);

router.get('/:id', getSingleAcademicFaculty);

export const academicFacultyRouter = router;
