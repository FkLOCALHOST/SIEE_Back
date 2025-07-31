import { Router } from "express";
import {register, login } from "./auth.controller.js";
import { loginValidator, registerValidator } from "../middlewares/user-validator.js";
import { uploadProductImage, handleUploadErrors } from "../middlewares/cloudinary.js";

const router = Router();

/**
 * @swagger
 * /sieeSystem/v1/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Registrar un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Error de validación o subida de imagen
 */
router.post(
    "/register",
    uploadProductImage,
    handleUploadErrors,
    registerValidator,
    register
)

/**
 * @swagger
 * /sieeSystem/v1/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Iniciar sesión de usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Credenciales inválidas
 */
router.post(
    "/login",
    loginValidator,
    login
)

export default router