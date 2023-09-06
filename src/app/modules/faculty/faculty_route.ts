import { Router } from 'express';
import {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
} from './faculty_controller';

const router = Router();

router.post('/create-faculty', createFaculty);

router.get('/', getAllFaculty);

router.get('/:id', getSingleFaculty);

export const facultyRoutes = router;
