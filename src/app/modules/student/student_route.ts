import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createStudent,
  deleteSingleUser,
  getAllStudents,
  getSingleStudent,
  myCourses,
  updateSingleUser,
} from './student_controller';
import { create, update } from './student_validation';

const router = Router();

router.get('/my-courses', myCourses);

router.post('/create-student', validateRequest(create), createStudent);

router.get('/:id', getSingleStudent);

router.patch('/:id', validateRequest(update), updateSingleUser);

router.delete('/:id', deleteSingleUser);

router.get('/', getAllStudents);

export const studentRoutes = router;
