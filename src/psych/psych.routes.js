import { Router } from "express";
import { createPsych, getPsych, getPsychById, deletePsych, updatePsych, getPsychByStudent } from "./psych.controller.js";
import { addPsychValidator, getPsychByIdValidator, deletePsychValidator, updatePsychValidator } from "../middlewares/psych-validator.js";

const router = Router();

router.post(
    "/addPsych",
    addPsychValidator,
    createPsych
);

router.get(
    "/",
    getPsych
);

router.get(
    "/getPsych/:uid",
    getPsychByIdValidator,
    getPsychById
);

router.patch(
    "/deletePsych/:uid",
    deletePsychValidator,
    deletePsych
);

router.patch(
    "/updatePsych/:uid",
    updatePsychValidator,
    updatePsych
);

router.get(
    "/getPsychByStudent/:uid",
    getPsychByStudent
);

export default router;
