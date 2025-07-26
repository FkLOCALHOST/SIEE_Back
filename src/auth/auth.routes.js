import { Router } from "express";
import {register, login } from "./auth.controller.js";
import { loginValidator, registerValidator } from "../middlewares/user-validator.js";
import { uploadProductImage, handleUploadErrors } from "../middlewares/cloudinary.js";

const router = Router();

router.post(
    "/register",
    uploadProductImage,
    handleUploadErrors,
    registerValidator,
    register
)

router.post(
    "/login",
    loginValidator,
    login
)

export default router