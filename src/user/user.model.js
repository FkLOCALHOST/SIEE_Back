import mongoose from "mongoose";

const { Schema, model } = mongoose;

const options = { discriminatorKey: 'role', timestamps: true, versionKey: false };

const userSchema = new Schema({
    name: { 
        type: String, 
        required: true },
    lastName: { 
        type: String, 
        required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true },
    password: { 
        type: String, 
        required: true },
    phone: { 
        type: String, 
        required: true, 
        unique: true },
    profilePicture: String,
    status: { 
        type: Boolean, 
        default: true 
    },
}, options);

const User = model("User", userSchema);

const studentSchema = new Schema({
    courses: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Course" }],
    grades: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Grades" }],
    psychologicalState: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Psych" }],
});

const Student = User.discriminator("STUDENT", studentSchema);

const professorSchema = new Schema({
    courses: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Course" }],
});

const MentorSchema = new Schema({
    students: [{ 
        type: Schema.Types.ObjectId, 
        ref: "User" }],
});
const Mentor = User.discriminator("MENTOR", MentorSchema);

const Professor = User.discriminator("PROFESSOR", professorSchema);

const parentSchema = new Schema({
    dependents: [{ 
        type: Schema.Types.ObjectId, 
        ref: "User" 
    }],
});

const adminSchema = new Schema({  });
const Admin = User.discriminator("ADMIN", adminSchema);


const Parent = User.discriminator("PARENT", parentSchema);

export { User, Student, Professor, Parent, Admin };

export default User;