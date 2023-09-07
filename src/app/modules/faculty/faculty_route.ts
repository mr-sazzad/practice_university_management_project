import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
} from './faculty_controller';
import { create } from './faculty_validation';

const router = Router();

router.post('/create-faculty', validateRequest(create), createFaculty);

router.get('/', getAllFaculty);

router.get('/:id', getSingleFaculty);

export const facultyRoutes = router;
