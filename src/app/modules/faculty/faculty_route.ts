import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import {
  assignedCourses,
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  myCourses,
  removeCourses,
} from './faculty_controller';
import { assignOrRemove, create } from './faculty_validation';

const router = Router();

router.post('/create-faculty', validateRequest(create), createFaculty);

router.get('/my-courses', auth(ENUM_USER_ROLE.FACULTY), myCourses);

router.get('/', getAllFaculty);

router.get('/:id', getSingleFaculty);

router.post(
  '/:id/assign-courses',
  validateRequest(assignOrRemove),
  assignedCourses
);

router.delete(
  '/:id/remove-courses',
  validateRequest(assignOrRemove),
  removeCourses
);

export const facultyRoutes = router;
