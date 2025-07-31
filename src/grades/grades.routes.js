import { Router } from "express";
import { createGrade,getGradesByCourseTop10, getGradesByStudent, getGradesByCourse, updateGrade } from "./grades.controller.js";
import { createGradeValidator, getGradesByCourseValidator, getGradesByStudentValidator, updateGradeValidator } from "../middlewares/grade-validator.js";

const router = Router();

/**
 * @swagger
 * /sieeSystem/v1/grades/createGrade:
 *   post:
 *     tags:
 *       - Grades
 *     summary: Crear una nueva calificación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GradeCreate'
 *     responses:
 *       201:
 *         description: Calificación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade'
 *       400:
 *         description: Error de validación
 */
router.post(
    "/createGrade",
    createGradeValidator,
    createGrade
);

/**
 * @swagger
 * /sieeSystem/v1/grades/getGradesByStudent/{uid}:
 *   get:
 *     tags:
 *       - Grades
 *     summary: Obtener todas las calificaciones de un estudiante con asistencia de ciclo
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del estudiante
 *     responses:
 *       200:
 *         description: Lista de calificaciones del estudiante con información de asistencia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 total:
 *                   type: number
 *                 grades:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Grade'
 *                 cycleAttendance:
 *                   type: number
 *                   description: Promedio de asistencia de todos los cursos
 *                 coursesWithAttendance:
 *                   type: number
 *                 attendancesByCourse:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Estudiante no encontrado
 */
router.get(
    "/getGradesByStudent/:uid",
    getGradesByStudentValidator,
    getGradesByStudent
);

/**
 * @swagger
 * /sieeSystem/v1/grades/getGradesByCourse/{uid}:
 *   get:
 *     tags:
 *       - Grades
 *     summary: Obtener todas las calificaciones de un curso
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del curso
 *     responses:
 *       200:
 *         description: Lista de calificaciones del curso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grade'
 *       404:
 *         description: Curso no encontrado
 */
router.get(
    "/getGradesByCourse/:uid",
    getGradesByCourseValidator,
    getGradesByCourse   
);

/**
 * @swagger
 * /sieeSystem/v1/grades/updateGrade/{uid}:
 *   patch:
 *     tags:
 *       - Grades
 *     summary: Actualizar una calificación
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único de la calificación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GradeUpdate'
 *     responses:
 *       200:
 *         description: Calificación actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Calificación no encontrada
 */
router.patch(
    "/updateGrade/:uid",
    updateGradeValidator,
    updateGrade
);

/**
 * @swagger
 * /sieeSystem/v1/grades/getGradesByCourseTop10/{uid}:
 *   get:
 *     tags:
 *       - Grades
 *     summary: Obtener las 10 mejores calificaciones de un curso
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del curso
 *     responses:
 *       200:
 *         description: Lista de las 10 mejores calificaciones del curso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grade'
 *       404:
 *         description: Curso no encontrado
 */
router.get(
    "/getGradesByCourseTop10/:uid",
    getGradesByCourseValidator,
    getGradesByCourseTop10
);

export default router;
