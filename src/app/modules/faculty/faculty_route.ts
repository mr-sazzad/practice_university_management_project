import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  assignedCourses,
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  removeCourses,
} from './faculty_controller';
import { create } from './faculty_validation';

const router = Router();

router.post('/create-faculty', validateRequest(create), createFaculty);

router.get('/', getAllFaculty);

router.get('/:id', getSingleFaculty);

router.post('/:id/assign-courses', assignedCourses);

router.delete('/:id/remove-courses', removeCourses);

export const facultyRoutes = router;
