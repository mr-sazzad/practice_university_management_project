import express from 'express';
import { academicFacultyRouter } from '../app/modules/academic_faculty/academic_faculty_routes';
import academicSemesterRoutes from '../app/modules/academic_semester/academic_semester_route';

const router = express.Router();

router.use('/academic-semester', academicSemesterRoutes);

router.use('/academic-faculties', academicFacultyRouter);

export default router;
