import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  assignFaculties,
  createCourse,
  deleteSingleCourse,
  getAllCourses,
  getSingleCourse,
  removeFaculties,
  updateSingleCourse,
} from './course_controller';
import { assignOrRemove, create } from './course_validation';

const router = Router();

router.post('/create-course', validateRequest(create), createCourse);

router.get('/', getAllCourses);

router.patch('/:id', updateSingleCourse);

router.get('/:id', getSingleCourse);

router.delete('/:id', deleteSingleCourse);

router.post(
  '/:id/assign-faculties',
  validateRequest(assignOrRemove),
  assignFaculties
);

router.delete(
  '/:id/remove-faculties',
  validateRequest(assignOrRemove),
  removeFaculties
);

export const courseRoutes = router;
