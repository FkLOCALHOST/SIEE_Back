import { check } from "express-validator";
import { validationsFields } from "./validations-fields.js";
import { validateJWT } from "./validate-token.js";
import { hasRoles } from "./validate-role.js";

const types = [
    "TRABAJO_EN_EQUIPO",
    "LIDERAZGO",
    "COMUNICACIÓN",
    "RESOLUCIÓN_DE_CONFLICTOS",
    "TOMA_DE_DECISIONES",
    "INTELIGENCIA_EMOCIONAL",
    "ADAPTABILIDAD",
    "PENSAMIENTO_CRÍTICO",
    "GESTIÓN_DEL_TIEMPO",
    "CREATIVIDAD",
    "ORGANIZACIÓN",
    "EMPATÍA",
    "RESILIENCIA",
    "NEGOCIACIÓN",
    "AUTODISCIPLINA",
    "MOTIVACIÓN",
    "COLABORACIÓN",
    "COMUNICACIÓN_ASERTIVA",
    "GESTIÓN_DEL_ESTRÉS",
    "PENSAMIENTO_ANALÍTICO"
];

export const addPsychValidator = [
    check("name").notEmpty().isIn([...types]).withMessage("El nombre es obligatorio"),
    check("percentage").isFloat({ min: 0, max: 100 }).withMessage("El porcentaje debe ser un número entre 0 y 100"),
    check("student").isMongoId().withMessage("El ID del estudiante es obligatorio y debe ser un ID válido de MongoDB"),
    validationsFields,
    validateJWT,
    hasRoles("ADMIN", "MENTOR")
]

export const getPsychByIdValidator = [
    check("uid").isMongoId().withMessage("El ID no es válido"),
    validationsFields,
    validateJWT,
    hasRoles("ADMIN", "MENTOR")
]

export const updatePsychValidator = [
    check("uid").isMongoId().withMessage("El ID no es válido"),
    check("percentage").optional().isFloat({ min: 0, max: 100 }).withMessage("El porcentaje debe ser un número entre 0 y 100"),
    validationsFields,
    validateJWT,
    hasRoles("ADMIN", "MENTOR")
]

export const deletePsychValidator = [
    check("uid").isMongoId().withMessage("El ID no es válido"),
    validationsFields,
    validateJWT,
    hasRoles("ADMIN", "MENTOR")
]