import { Router } from "express";
import { createCourse, getCourse, getCoursesById, updateCourse, deleteCourse, enrollStudent } from "./courses.controller.js";
import { createCourseValidator, getCourseByIdValidator, updateCourseValidator, deleteCourseValidator } from "../middlewares/course-validators.js";

const router = Router();

/**
 * @swagger
 * /createCourse:
 *   post:
 *     tags:
 *       - Courses
 *     summary: Crear un nuevo curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseCreate'
 *     responses:
 *       201:
 *         description: Curso creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Error de validación
 */
router.post(
    "/createCourse",
    createCourseValidator,
    createCourse
);

/**
 * @swagger
 * /getCourse:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Obtener todos los cursos
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.get(
    "/getCourse",
    getCourse
);

/**
 * @swagger
 * /getCourseById/{uid}:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Obtener curso por ID
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del curso
 *     responses:
 *       200:
 *         description: Curso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Curso no encontrado
 */
router.get(
    "/getCourseById/:uid",
    getCourseByIdValidator,
    getCoursesById
);

/**
 * @swagger
 * /updateCourse/{uid}:
 *   patch:
 *     tags:
 *       - Courses
 *     summary: Actualizar información de un curso
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseUpdate'
 *     responses:
 *       200:
 *         description: Curso actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Curso no encontrado
 */
router.patch(
    "/updateCourse/:uid",
    updateCourseValidator,
    updateCourse
);

/**
 * @swagger
 * /deleteCourse/{uid}:
 *   patch:
 *     tags:
 *       - Courses
 *     summary: Eliminar (deshabilitar) un curso por ID
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del curso
 *     responses:
 *       200:
 *         description: Curso eliminado
 *       404:
 *         description: Curso no encontrado
 */
router.patch(
    "/deleteCourse/:uid",
    deleteCourseValidator,
    deleteCourse
);

/**
 * @swagger
 * /enrollStudent:
 *   post:
 *     tags:
 *       - Courses
 *     summary: Inscribir un estudiante en un curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EnrollStudent'
 *     responses:
 *       200:
 *         description: Estudiante inscrito exitosamente
 *       400:
 *         description: Error de validación
 */
router.post(
    "/enrollStudent",
    enrollStudent
);


export default router;
