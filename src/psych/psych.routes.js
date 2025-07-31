import { Router } from "express";
import { createPsych, getPsych, getPsychById, deletePsych, updatePsych, getPsychByStudent } from "./psych.controller.js";
import { addPsychValidator, getPsychByIdValidator, deletePsychValidator, updatePsychValidator } from "../middlewares/psych-validator.js";

const router = Router();

/**
 * @swagger
 * /sieeSystem/v1/psych/addPsych:
 *   post:
 *     tags:
 *       - Psychology
 *     summary: Crear un nuevo registro psicológico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PsychCreate'
 *     responses:
 *       201:
 *         description: Registro psicológico creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Psych'
 *       400:
 *         description: Error de validación
 */
router.post(
    "/addPsych",
    addPsychValidator,
    createPsych
);

/**
 * @swagger
 * /sieeSystem/v1/psych/:
 *   get:
 *     tags:
 *       - Psychology
 *     summary: Obtener todos los registros psicológicos
 *     responses:
 *       200:
 *         description: Lista de registros psicológicos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Psych'
 */
router.get(
    "/",
    getPsych
);

/**
 * @swagger
 * /sieeSystem/v1/psych/getPsych/{uid}:
 *   get:
 *     tags:
 *       - Psychology
 *     summary: Obtener registro psicológico por ID
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del registro psicológico
 *     responses:
 *       200:
 *         description: Registro psicológico encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Psych'
 *       404:
 *         description: Registro psicológico no encontrado
 */
router.get(
    "/getPsych/:uid",
    getPsychByIdValidator,
    getPsychById
);

/**
 * @swagger
 * /sieeSystem/v1/psych/deletePsych/{uid}:
 *   patch:
 *     tags:
 *       - Psychology
 *     summary: Eliminar (deshabilitar) un registro psicológico por ID
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del registro psicológico
 *     responses:
 *       200:
 *         description: Registro psicológico eliminado
 *       404:
 *         description: Registro psicológico no encontrado
 */
router.patch(
    "/deletePsych/:uid",
    deletePsychValidator,
    deletePsych
);

/**
 * @swagger
 * /sieeSystem/v1/psych/updatePsych/{uid}:
 *   patch:
 *     tags:
 *       - Psychology
 *     summary: Actualizar un registro psicológico
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del registro psicológico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PsychUpdate'
 *     responses:
 *       200:
 *         description: Registro psicológico actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Psych'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Registro psicológico no encontrado
 */
router.patch(
    "/updatePsych/:uid",
    updatePsychValidator,
    updatePsych
);

/**
 * @swagger
 * /sieeSystem/v1/psych/getPsychByStudent/{uid}:
 *   get:
 *     tags:
 *       - Psychology
 *     summary: Obtener registros psicológicos por estudiante
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del estudiante
 *     responses:
 *       200:
 *         description: Lista de registros psicológicos del estudiante
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Psych'
 *       404:
 *         description: Estudiante no encontrado
 */
router.get(
    "/getPsychByStudent/:uid",
    getPsychByStudent
);

export default router;
