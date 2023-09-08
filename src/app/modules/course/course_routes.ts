import { Router } from 'express';
import {
  assignFaculties,
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

router.post('/:id/assign-faculties', assignFaculties);

export const courseRoutes = router;
