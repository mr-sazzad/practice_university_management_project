import { Router } from 'express';
import {
  createStudent,
  getAllStudents,
  getSingleStudent,
} from './student_controller';

const router = Router();

router.post('/create-student', createStudent);

router.get('/', getAllStudents);

router.get('/:id', getSingleStudent);

export const studentRoutes = router;
