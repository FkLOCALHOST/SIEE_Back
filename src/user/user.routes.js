import { Router } from "express";
import { getUser, getUserById, updateUser, deleteUser } from "./user.controller.js";
import { getUserByIdValidator, updateUserValidator, deleteUserValidator } from "../middlewares/user-validator.js";
import { validateJWT } from "../middlewares/validate-token.js";
import { hasRoles } from "../middlewares/validate-role.js";

const router = Router();

/**
 * @swagger
 * /sieeSystem/v1/user/:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener todos los usuarios (solo ADMIN)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado
 */
router.get("/", validateJWT, hasRoles("ADMIN", "PROFESSOR", "MENTOR"), getUser);


/**
 * @swagger
 * /sieeSystem/v1/user/getUserById/{uid}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener usuario por ID
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router.get(
    "/getUserById/:uid",
    getUserByIdValidator,
    getUserById
)

/**
 * @swagger
 * /sieeSystem/v1/user/updateUser/{uid}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Actualizar información de usuario
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Usuario no encontrado
 */
router.patch(
    "/updateUser/:uid",
    updateUserValidator,
    updateUser
)

/**
 * @swagger
 * /sieeSystem/v1/user/deleteUser/{uid}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Eliminar (deshabilitar) un usuario por ID
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 */
router.patch(
    "/deleteUser/:uid",
    deleteUserValidator,
    deleteUser
)

export default router