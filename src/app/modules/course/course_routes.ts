import { Router } from 'express';
import {
  createCourse,
  deleteSingleCourse,
  getAllCourses,
  getSingleCourse,
  updateSingleCourse,
} from './course_controller';

const router = Router();

router.post('/create-course', createCourse);

router.get('/', getAllCourses);

router.patch('/:id', updateSingleCourse);

router.get('/:id', getSingleCourse);

router.delete('/:id', deleteSingleCourse);

export const courseRoutes = router;
