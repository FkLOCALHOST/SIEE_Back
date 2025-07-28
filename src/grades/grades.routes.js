import { Router } from "express";
import { createGrade, getGradesByStudent, getGradesByCourse, updateGrade } from "./grades.controller.js";
import { createGradeValidator, getGradesByCourseValidator, getGradesByStudentValidator, updateGradeValidator } from "../middlewares/grade-validator.js";

const router = Router()

router.post(
    "/createGrade",
    createGradeValidator,
    createGrade
)

router.get(
    "/getGradesByStudent/:uid",
    getGradesByStudentValidator,
    getGradesByStudent
)

router.get(
    "/getGradesByCourse/:uid",
    getGradesByCourseValidator,
    getGradesByCourse   
)

router.patch(
    "/updateGrade/:uid",
    updateGradeValidator,
    updateGrade
)

export default router;
