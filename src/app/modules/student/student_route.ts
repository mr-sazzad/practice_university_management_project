import { Router } from 'express';
import {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateSingleUser,
} from './student_controller';

const router = Router();

router.post('/create-student', createStudent);

router.get('/', getAllStudents);

router.get('/:id', getSingleStudent);

router.patch('/:id', updateSingleUser);

export const studentRoutes = router;
