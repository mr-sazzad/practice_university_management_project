import express from 'express';
import { academicDepartmentRoutes } from '../app/modules/academic_department/academic_department_route';
import { academicFacultyRouter } from '../app/modules/academic_faculty/academic_faculty_routes';
import academicSemesterRoutes from '../app/modules/academic_semester/academic_semester_route';
import { buildingRoutes } from '../app/modules/bulding/building_route';
import { facultyRoutes } from '../app/modules/faculty/faculty_route';
import { OfferedCourseClassSchedule } from '../app/modules/offered_course_class_schedule/offered_course_class_schedule_route';
import { OfferedCourseSectionRoutes } from '../app/modules/offered_course_section/offered_course_section_route';
import { offeredCoursesRoutes } from '../app/modules/offred_couress/offered_courses_routes';
import { roomRoutes } from '../app/modules/room/room_route';
import { semesterRegistrationRoutes } from '../app/modules/semester_ragintration/semester_registration_routes';
import { studentRoutes } from '../app/modules/student/student_route';

const router = express.Router();

router.use('/academic-semester', academicSemesterRoutes);

router.use('/academic-faculties', academicFacultyRouter);

router.use('/students', studentRoutes);

router.use('/faculties', facultyRoutes);

router.use('/academic-departments', academicDepartmentRoutes);

router.use('/buildings', buildingRoutes);

router.use('/rooms', roomRoutes);

router.use('/semesters', semesterRegistrationRoutes);

router.use('/offered-courses', offeredCoursesRoutes);

router.use('/offered-course-section', OfferedCourseSectionRoutes);

router.use('/class-schedule', OfferedCourseClassSchedule);

export default router;
