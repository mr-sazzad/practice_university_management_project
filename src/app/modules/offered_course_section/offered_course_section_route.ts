import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  CreateOfferedCourseSection,
  deleteSingleOfferedCourseSection,
  getAllOfferedCourseSections,
  getSingleOfferedCourseSection,
  updateSingleOfferedCourseSection,
} from './offered_course_section_controller';
import { insert, update } from './offered_course_section_validation';

const router = Router();

router.post(
  '/create-section',
  validateRequest(insert),
  CreateOfferedCourseSection
);

router.get('/', getAllOfferedCourseSections);

router.get('/:id', getSingleOfferedCourseSection);

router.patch('/:id', validateRequest(update), updateSingleOfferedCourseSection);

router.delete('/:id', deleteSingleOfferedCourseSection);

export const OfferedCourseSectionRoutes = router;
