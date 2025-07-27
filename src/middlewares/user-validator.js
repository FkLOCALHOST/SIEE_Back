import { check, param } from "express-validator";
import { emailExists } from "../helpers/db-validator.js";
import { validationsFields } from "./validations-fields.js";
import { validateJWT } from "./validate-token.js";
import { hasRoles } from "./validate-role.js";

export const registerValidator = [
    check("name").not().isEmpty().withMessage("El nombre es obligatorio"),
    check("email").isEmail().withMessage("El Correo no es válido"),
    check("email").custom(emailExists).withMessage("El correo ya está registrado"),
    check("password").isLength({ min: 6 }).not().isEmpty().withMessage("La contraseña es obligatoria"),
    check("phone").not().isEmpty().withMessage("El número de teléfono es obligatorio"),
    check("type").notEmpty().withMessage("El tipo de usuario es obligatorio"),
    validationsFields
]

export const loginValidator = [
    check("email").isEmail().withMessage("El Correo no es válido"),
    check("password").isLength({ min: 6 }).not().isEmpty().withMessage("La contraseña es obligatoria"),
    validationsFields
]

export const getUserByIdValidator = [
    param("uid").isMongoId().withMessage("El ID del usuario no es válido"),
    validationsFields,
    validateJWT,
    hasRoles("ADMIN")
]

export const updateUserValidator = [
    param("uid").isMongoId().withMessage("El ID del usuario no es válido"),
    validationsFields,
    validateJWT,
]

export const deleteUserValidator = [
    param("uid").isMongoId().withMessage("El ID del usuario no es válido"),
    validationsFields,
    validateJWT,
    hasRoles("ADMIN")
]