import express from "express";
import {
  createAnnouncement,
  getActiveAnnouncements,
  updateAnnouncement,
  deleteAnnouncement
} from "../announcements/announcement.controller.js";

import {
    createAnnouncementValidator,
    getActiveAnnouncementsValidator,
    updateAnnouncementValidator,
    deleteAnnouncementValidator
} from "../middlewares/announcement-validator.js"

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Announcements
 *   description: API para gestionar anuncios
 */

/**
 * @swagger
 * /announcements/create:
 *   post:
 *     summary: Crear un nuevo anuncio
 *     tags: [Announcements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Anuncio creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post("/create", createAnnouncementValidator ,createAnnouncement);

/**
 * @swagger
 * /announcements/get:
 *   get:
 *     summary: Obtener anuncios activos
 *     tags: [Announcements]
 *     responses:
 *       200:
 *         description: Lista de anuncios activos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   active:
 *                     type: boolean
 */
router.get("/get", getActiveAnnouncementsValidator ,getActiveAnnouncements);

/**
 * @swagger
 * /announcements/update/{id}:
 *   put:
 *     summary: Actualizar un anuncio por ID
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del anuncio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Anuncio actualizado exitosamente
 *       404:
 *         description: Anuncio no encontrado
 */
router.put("/update/:id", updateAnnouncementValidator ,updateAnnouncement);

/**
 * @swagger
 * /announcements/delete/{id}:
 *   patch:
 *     summary: Eliminar (desactivar) un anuncio por ID
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del anuncio
 *     responses:
 *       200:
 *         description: Anuncio eliminado/desactivado exitosamente
 *       404:
 *         description: Anuncio no encontrado
 */
router.patch("/delete/:id", deleteAnnouncementValidator ,deleteAnnouncement);

export default router;