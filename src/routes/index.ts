import express from 'express';
import { academicDepartmentRoutes } from '../app/modules/academic_department/academic_department_route';
import { academicFacultyRouter } from '../app/modules/academic_faculty/academic_faculty_routes';
import academicSemesterRoutes from '../app/modules/academic_semester/academic_semester_route';
import { buildingRoutes } from '../app/modules/bulding/building_route';
import { facultyRoutes } from '../app/modules/faculty/faculty_route';
import { roomRoutes } from '../app/modules/room/room_route';
import { studentRoutes } from '../app/modules/student/student_route';

const router = express.Router();

router.use('/academic-semester', academicSemesterRoutes);

router.use('/academic-faculties', academicFacultyRouter);

router.use('/students', studentRoutes);

router.use('/faculties', facultyRoutes);

router.use('/academic-departments', academicDepartmentRoutes);

router.use('/buildings', buildingRoutes);

router.use('/rooms', roomRoutes);

router.use('/semesters');

export default router;
