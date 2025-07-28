import { check, param } from "express-validator";
import { validationsFields } from "./validations-fields.js";
import { validateJWT } from "./validate-token.js";
import { hasRoles } from "./validate-role.js";

export const createGradeValidator = [
    check("student").isMongoId().withMessage("El ID del estudiante debe de ser un ID Válido"),
    check("course").isMongoId().withMessage("El ID del curso debe de ser un ID Válido"),
    check("score").isFloat({min: 0, max: 100}).withMessage("La calificación debe ser un número entre 0 y 100"),
    validationsFields,
    validateJWT,
    hasRoles("PROFESSOR", "ADMIN")
]

export const getGradesByStudentValidator = [
    param("uid").isMongoId().withMessage("El ID del estudiante debe de ser un ID Válido"),
    validationsFields,
    validateJWT
]

export const getGradesByCourseValidator = [
    param("uid").isMongoId().withMessage("El ID del curso debe de ser un ID Válido"),
    validationsFields,
    validateJWT
]

export const updateGradeValidator = [
    param("uid").isMongoId().withMessage("El ID de la calificación debe de ser un ID Válido"),
    check("score").isFloat({min: 0, max: 100}).withMessage("La calificación debe ser un número entre 0 y 100"),
    validationsFields,
    validateJWT,
    hasRoles("PROFESSOR", "ADMIN")
]