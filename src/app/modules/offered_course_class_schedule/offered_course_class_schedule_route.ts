import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createOfferedCourseClassSchedule,
  deleteSingeOfferedCourseClassSchedule,
  getAllOfferedCourseClassSchedule,
  getSingleOfferedCourseClassSchedule,
  updateOfferedCourseClassSchedule,
} from './offered_course_class_schedule_controller';
import { create } from './offered_course_class_schedule_validation';

const router = Router();

router.post(
  '/create-offered-course-schedule',
  validateRequest(create),
  createOfferedCourseClassSchedule
);

router.get('/', getAllOfferedCourseClassSchedule);

router.get('/:id', getSingleOfferedCourseClassSchedule);

router.patch('/:id', updateOfferedCourseClassSchedule);

router.delete('/:id', deleteSingeOfferedCourseClassSchedule);

export const OfferedCourseClassSchedule = router;
