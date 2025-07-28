import Courses from "./courses.model.js";
import User from "../user/user.model.js";

export const createCourse = async (req, res) => {
    try {
        const data = req.body

        const course = await Courses.create(data);

        return res.status(201).json({
            success: true,
            message: "Curso creado correctamente",
            course
        })
    } catch (err) {
        return res.status(500).json({
            succes: false,
            message: "Creación del curso fallida",
            error: err.message
        })
    }
}

export const getCourse = async (req, res) => {
    try {
        const query = { status: true }

        const [total, course] = await Promise.all([
            Courses.countDocuments(query),
            Courses.find(query)
        ])

        return res.status(200).json({
            success: true,
            message: "Cursos listados correctamente",
            total,
            course
        })

    } catch (err) {
        return res.status(500).json({
            message: "Error al obtener los Cursos",
            error: err.message
        })
    }
}

export const getCoursesById = async (req, res) => {
    try {
        const { uid } = req.params;
        const course = await Courses.findById(uid)

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Curso no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            course
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el curso",
            error: err.message
        })
    }
}

export const deleteCourse = async (req, res) => {
    try {
        const { uid } = req.params

        const course = await Courses.findByIdAndUpdate(uid, { status: false }, { new: true })

        return res.status(200).json({
            success: true,
            message: "Curso eliminado",
            course
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el curso",
            error: err.message
        })
    }
}

export const updateCourse = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const course = await Courses.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Curso Actualizado',
            course,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar curso',
            error: err.message
        });
    }
}

export const enrollStudent = async (req, res) => {
    try {
        const data = req.body;

        await Promise.all([
            Courses.findByIdAndUpdate(data.course, { $addToSet: { participants: data.student } }, { new: true }),
            User.findByIdAndUpdate(data.student, { $addToSet: { courses: data.course } }, { new: true })
        ])

        return res.status(200).json({
            success: true,
            message: "Estudiante inscrito al curso correctamente"
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al inscribir al estudiante",
            error: err.message
        })
    }
}