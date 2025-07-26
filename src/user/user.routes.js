import { Router } from "express";
import { getUser, getUserById, updateUser, deleteUser } from "./user.controller.js";
import { getUserByIdValidator, updateUserValidator, deleteUserValidator } from "../middlewares/user-validator.js";
import { validateJWT } from "../middlewares/validate-token.js";
import { hasRoles } from "../middlewares/validate-role.js";

const router = Router();

router.get(
    "/",
    validateJWT,
    hasRoles("ADMIN"),
    getUser
);

router.get(
    "/getUserById/:uid",
    getUserByIdValidator,
    getUserById
)

router.patch(
    "/updateUser/:uid",
    updateUserValidator,
    updateUser
)

router.patch(
    "/deleteUser/:uid",
    deleteUserValidator,
    deleteUser
)

export default router