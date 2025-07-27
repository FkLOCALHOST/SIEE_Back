import { check, param } from "express-validator";
import { validationsFields } from "./validations-fields.js";
import { validateJWT } from "./validate-token.js";
import { hasRoles } from "./validate-role.js";

export const createCourseValidator = [
    check("courseName").notEmpty().withMessage("El nombre del curso es obligatorio"),
    check("courseDescription").notEmpty().withMessage("La descripción del curso es obligatoria"),
    validationsFields,
    validateJWT,
    hasRoles("ADMIN")
]

export const getCourseByIdValidator = [
    param("uid").isMongoId().withMessage("El ID del curso debe ser un ID válido de MongoDB"),
    validationsFields,
    validateJWT,
    hasRoles("ADMIN")
]

export const deleteCourseValidator = [
    param("uid").isMongoId().withMessage("El ID del curso debe ser un ID válido de MongoDB"),
    validationsFields,
    validateJWT,
    hasRoles("ADMIN")
]

export const updateCourseValidator = [
    param("uid").isMongoId().withMessage("El ID del curso debe ser un ID válido de MongoDB"),
    validationsFields,
    validateJWT,
    hasRoles("ADMIN")
]
