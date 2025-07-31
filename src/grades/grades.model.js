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
    },
    courseAttendance:{
        type: Number,
        required: [true, "La asistencia del curso es obligatoria"],
        min: [0, "La asistencia no puede ser menor a 0"],
        max: [100, "La asistencia no puede ser mayor a 100"]
    },
    status:{
        type: Boolean,
        default: true
    }
},{
    versionKey: false,
    timestamps: true
})

gradesSchema.methods.toJSON = function () {
    const { _v, _id, ...grades } = this.toObject()
    grades.uid = _id;
    return grades;
}

export default model("Grades", gradesSchema)