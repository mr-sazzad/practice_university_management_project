import { Router } from 'express';
import { createOfferedCourseClassSchedule } from './offered_course_class_schedule_controller';

const router = Router();

router.post(
  '/create-offered-course-schedule',
  createOfferedCourseClassSchedule
);

export const OfferedCourseClassSchedule = router;
