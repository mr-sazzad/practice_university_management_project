import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createStudent,
  deleteSingleUser,
  getAllStudents,
  getSingleStudent,
  updateSingleUser,
} from './student_controller';
import { create, update } from './student_validation';

const router = Router();

router.post('/create-student', validateRequest(create), createStudent);

router.get('/', getAllStudents);

router.get('/:id', getSingleStudent);

router.patch('/:id', validateRequest(update), updateSingleUser);

router.delete('/:id', deleteSingleUser);

export const studentRoutes = router;
