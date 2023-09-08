import { Router } from 'express';
import {
  assignFaculties,
  createCourse,
  deleteSingleCourse,
  getAllCourses,
  getSingleCourse,
  removeFaculties,
  updateSingleCourse,
} from './course_controller';

const router = Router();

router.post('/create-course', createCourse);

router.get('/', getAllCourses);

router.patch('/:id', updateSingleCourse);

router.get('/:id', getSingleCourse);

router.delete('/:id', deleteSingleCourse);

router.post('/:id/assign-faculties', assignFaculties);

router.delete('/:id/remove-faculties', removeFaculties);

export const courseRoutes = router;
