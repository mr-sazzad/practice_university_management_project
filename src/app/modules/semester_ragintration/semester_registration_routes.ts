import { Router } from 'express';
import {
  createSemesterRegistration,
  deleteSingleSemester,
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

export const semesterRegistrationRoutes = router;
