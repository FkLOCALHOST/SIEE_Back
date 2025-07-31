import Psych from "./psych.model.js";
import {Student} from "../user/user.model.js";

export const createPsych = async (req, res) => {
    try{
        const data = req.body
        const psych = await Psych.create(data)
        
        await Student.findByIdAndUpdate(data.student, {$addToSet: {psychologicalState: psych._id}}, {new: true})

        return res.status(201).json({
            success: true,
            message: "Psychological assessment created successfully",
            psych
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const getPsych = async(req,res) =>{
    try{
        const query = {status: true}

        const [total, psych] = await Promise.all([
            Psych.countDocuments(query),
            Psych.find(query).populate('student', 'name lastName email')
        ])

        return res.status(200).json({
            success: true,
            message: "Area listada correctamente",
            total,
            psych
        })

    }catch(err){
        return res.status(500).json({
            message: "Error al obtener la información",
            error: err.message
        })
    }
}

export const getPsychById = async (req, res) => {
    try{
        const { uid } = req.params;
        const psych = await Psych.findById(uid)

        if(!psych){
            return res.status(404).json({
                success: false,
                message: "Área no encontrada"
            })
        }

        return res.status(200).json({
            success: true,
            psych
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener el área",
            error: err.message
        })
    }
}

export const deletePsych = async (req, res) => {
    try{
        const { uid } = req.params

        const psych = await Psych.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Área eliminada",
            psych
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el área",
            error: err.message
        })
    }
}

export const updatePsych = async (req, res) => {
    try {
        const { uid } = req.params;
        const  data  = req.body;

        const psych = await Psych.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Área Actualizada',
            psych,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar área',
            error: err.message
        });
    }
}

export const getPsychByStudent = async (req, res) => {
    try{
        const { uid } = req.params;
        const psych = await Psych.find({ student: uid });

        if(!psych){
            return res.status(404).json({
                success: false,
                message: "Estudiante no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            psych
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener el área psicológica del estudiante",
            error: err.message
        })
    }   
}