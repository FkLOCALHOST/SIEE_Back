import { Router } from "express";
import { createCourse, getCourse, getCoursesById, updateCourse, deleteCourse, enrollStudent } from "./courses.controller.js";
import { createCourseValidator, getCourseByIdValidator, updateCourseValidator, deleteCourseValidator } from "../middlewares/course-validators.js";

const router = Router()

router.post(
    "/createCourse",
    createCourseValidator,
    createCourse
)

router.get(
    "/getCourse",
    getCourse
)

router.get(
    "/getCourseById/:uid",
    getCourseByIdValidator,
    getCoursesById
)

router.patch(
    "/updateCourse/:uid",
    updateCourseValidator,
    updateCourse
)

router.patch(
    "/deleteCourse/:uid",
    deleteCourseValidator,
    deleteCourse
)

router.post(
    "/enrollStudent",
    enrollStudent
)

export default router;