import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createOfferedCourse } from './offered_courses_controller';
import { create } from './offered_courses_validation';

const router = Router();

router.post(
  '/create-offered-course',
  validateRequest(create),
  createOfferedCourse
);

export const offeredCoursesRoutes = router;
