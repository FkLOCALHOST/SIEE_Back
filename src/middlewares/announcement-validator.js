import { check, param } from "express-validator";
import { validationsFields } from "./validations-fields.js";
import { validateJWT } from "./validate-token.js";
import { hasRoles } from "./validate-role.js";

export const createAnnouncementValidator = [
    check("content")
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ max: 500 }),
    validationsFields,
    validateJWT,
    hasRoles("ADMIN")
]

export const getActiveAnnouncementsValidator = [
    validationsFields,
    validateJWT,
    hasRoles("ADMIN", "USER")
]

export const updateAnnouncementValidator = [
    validationsFields
    , validateJWT
    , hasRoles("ADMIN")
]

export const deleteAnnouncementValidator = [
    validationsFields,
    validateJWT,
    hasRoles("ADMIN")   
]