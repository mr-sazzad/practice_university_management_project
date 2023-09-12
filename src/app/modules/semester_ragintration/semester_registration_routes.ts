import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import {
  confirmMyRegistration,
  createSemesterRegistration,
  deleteSingleSemester,
  enrollIntoCourse,
  getAllCreatedSemesters,
  getMyRegistration,
  getSingleCreatedSemester,
  startMyRegistration,
  updateSingleSemester,
  withDrawFromCourse,
} from './semester_registration_controller';
import { CourseValidationEnrollOrWithdraw } from './semester_registration_validation';

const router = Router();
router.get(
  '/get-my-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  getMyRegistration
);

router.post('/start-registration', startMyRegistration);

router.post('/registration', createSemesterRegistration);

router.get('/', getAllCreatedSemesters);

router.get('/:id', getSingleCreatedSemester);

router.patch('/:id', updateSingleSemester);

router.delete('/:id', deleteSingleSemester);

router.post(
  '/enroll-into-course',
  validateRequest(CourseValidationEnrollOrWithdraw),
  auth(ENUM_USER_ROLE.STUDENT),
  enrollIntoCourse
);

router.post(
  '/withdraw-from-course',
  validateRequest(CourseValidationEnrollOrWithdraw),
  auth(ENUM_USER_ROLE.STUDENT),
  withDrawFromCourse
);

router.post(
  '/confirm-my-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  confirmMyRegistration
);

export const semesterRegistrationRoutes = router;
