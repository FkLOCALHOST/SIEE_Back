import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,

    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    phone: {
        type: String,
        required: [true, "Pone number is required"],
        unique: true
    },
    courses: [{
        type: Schema.Types.ObjectId,
        ref: "Course",
        default: []
    }],
    grades:[{
        type: Schema.Types.ObjectId,
        ref: "Grades",
        default: []
    }],
    psychologicalState: {
        type: Schema.Types.ObjectId,
        ref: "PsychologicalState",
        default: null
    },
    role: {
        type: String,
        enum: ["ADMIN", "STUDENT", "PROFESSOR", "PARENT", "MENTOR"],
        default: "STUDENT",
        required: [true, "User type is required"]
    },
    profilePicture: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true

});

userSchema.methods.toJSON = function () {
    const { _v, password, _id, ...user } = this.toObject()
    user.uid = _id;
    return user;
}

export default model("User", userSchema)