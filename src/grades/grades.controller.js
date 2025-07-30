import Grades from "./grades.model.js";
import {Student} from "../user/user.model.js";

export const createGrade = async(req,res) =>{
    try{
        const data = req.body;

        const grade = await Grades.create(data);

        await Student.findByIdAndUpdate(data.student, {$addToSet: {grades: grade._id}}, {new: true})

        return res.status(201).json({
            success: true,
            message: "Nota creada correctamente",
            grade
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error creando la calificación",
            error: err.message
        })
    }
}

export const getGradesByStudent = async(req,res) =>{
    try{
        const {uid} = req.params;
        const query = {student:uid}

        const [total, grades] = await Promise.all([
            Grades.countDocuments(query),
            Grades.find(query).populate("course", "courseName")
            .populate("student", "name lastName")
        ])

        return res.status(200).json({
            success: true,
            total,
            grades
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const getGradesByCourse = async(req,res) =>{
    try{
        const {uid} = req.params;
        const query = {course:uid}

        const [total, grades] = await Promise.all([
            Grades.countDocuments(query),
            Grades.find(query).populate("course", "courseName")
            .populate("student", "name lastName")
        ])

        return res.status(200).json({
            success: true,
            total,
            grades
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const getGradesByCourseTop10 = async(req,res) =>{
    try{
        const {uid} = req.params;
        const query = {course:uid}

        const [total, grades] = await Promise.all([
            Grades.countDocuments(query),
            Grades.find(query)
                .populate("course", "courseName")
                .populate("student", "name lastName")
                .sort({ score: -1 })
                .limit(10)
        ])

        return res.status(200).json({
            success: true,
            total,
            topGrades: grades,
            message: `Top 10 mejores calificaciones del curso`
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener el top 10 de calificaciones"
        })
    }
}

export const updateGrade = async(req,res) =>{
    try{
        const {uid} = req.params; 
        const data = req.body;

        const grade = await Grades.findByIdAndUpdate(uid, data, {new: true})

        return res.status(200).json({
            success: true,
            message: "Nota actualizada con éxito",
            grade
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la calificación"
        })
    }
}