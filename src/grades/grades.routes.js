import { Router } from "express";
import { createGrade,getGradesByCourseTop10, getGradesByStudent, getGradesByCourse, updateGrade } from "./grades.controller.js";
import { createGradeValidator, getGradesByCourseValidator, getGradesByStudentValidator, updateGradeValidator } from "../middlewares/grade-validator.js";

const router = Router();

/**
 * @swagger
 * /createGrade:
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
 * /getGradesByStudent/{uid}:
 *   get:
 *     tags:
 *       - Grades
 *     summary: Obtener todas las calificaciones de un estudiante
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del estudiante
 *     responses:
 *       200:
 *         description: Lista de calificaciones del estudiante
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grade'
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
 * /getGradesByCourse/{uid}:
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
 * /updateGrade/{uid}:
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

router.get(
    "/getGradesByCourseTop10/:uid",
    getGradesByCourseValidator,
    getGradesByCourseTop10
);

export default router;
