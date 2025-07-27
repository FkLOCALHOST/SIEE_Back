import { Schema, model } from "mongoose";

const coursesSchema = new Schema({
    courseName:{
        type: String,
        required: [true, "El nombre del curso es obligatorio"]
    },
    courseDescription: {
        type: String,
        required: [true, "La descripción del curso es obligatoria"]
    },
    participants:[{
        type: Schema.Types.ObjectId,
        ref: "User",
        default: []
    }],
    score:{
        type: Number,
        default: 0
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    timestamps: true,
    versionKey: false
})

coursesSchema.methods.toJSON = function () {
    const { __v, _id, ...course } = this.toObject()
    course.uid = _id;
    return course;
}

export default model("Course", coursesSchema)