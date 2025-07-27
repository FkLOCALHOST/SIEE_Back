import { Schema, model } from "mongoose";

export const gradesSchema = new Schema({
    student:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "El estudiante es obligatorio"]
    },
    course:{
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: [true, "El curso es obligatorio"]
    },
    score:{
        type: Number,
        required: [true, "La calificación es obligatoria"]
    }
},{
    versionKey: false,
    timestamps: true
})