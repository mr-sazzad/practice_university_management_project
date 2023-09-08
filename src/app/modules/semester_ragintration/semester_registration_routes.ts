import { Router } from 'express';
import { createSemesterRegistration } from './semester_registration_controller';

const router = Router();

router.post('/registration', createSemesterRegistration);

export const semesterRegistrationRoutes = router;
