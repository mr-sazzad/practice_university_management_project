import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import {
  createSemesterRegistration,
  deleteSingleSemester,
  enrollIntoCourse,
  getAllCreatedSemesters,
  getSingleCreatedSemester,
  startMyRegistration,
  updateSingleSemester,
} from './semester_registration_controller';

const router = Router();

router.post('/start-registration', startMyRegistration);

router.post('/registration', createSemesterRegistration);

router.get('/', getAllCreatedSemesters);

router.get('/:id', getSingleCreatedSemester);

router.patch('/:id', updateSingleSemester);

router.delete('/:id', deleteSingleSemester);

router.post(
  '/enroll-into-course',
  auth(ENUM_USER_ROLE.STUDENT),
  enrollIntoCourse
);

export const semesterRegistrationRoutes = router;
