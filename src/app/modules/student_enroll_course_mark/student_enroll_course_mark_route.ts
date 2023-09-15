import { Router } from 'express';
import {
  updateFinalMarks,
  updateStudentMark,
} from './student_enroll_course_mark_controller';

const router = Router();

router.patch('/update-mark', updateStudentMark);

router.patch('/update-final-marks', updateFinalMarks);

export const studentEnrollCourseMarkRoutes = router;
