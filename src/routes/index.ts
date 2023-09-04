import express from 'express';
import academicSemesterRoutes from '../app/modules/academic_semester/academic_semester_route';

const router = express.Router();

router.use('/academic-semester', academicSemesterRoutes);

export default router;
