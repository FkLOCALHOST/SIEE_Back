import User from "./user.model.js";

export const getUser = async(req,res) =>{
    try{
        const query = {status: true}

        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
        ])

        return res.status(200).json({
            success: true,
            message: "Usuarios listados correctamente",
            total,
            users
        })

    }catch(err){
        return res.status(500).json({
            message: "Error al obtener a los usuarios",
            error: err.message
        })
    }
}

export const getUserById = async (req, res) => {
    try{
        const { uid } = req.params;
        const user = await User.findById(uid)

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            user
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            error: err.message
        })
    }
}

export const deleteUser = async (req, res) => {
    try{
        const { uid } = req.params
        
        if(uid.role === "ADMIN_ROLE"){
            res.status(400).json({
                success: false,
                msg: 'No se puede eliminar a administradores'
            });
        }

        const user = await User.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado",
            user
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const  data  = req.body;

        if(uid.role === "ADMIN_ROLE"){
            res.status(400).json({
                success: false,
                msg: 'No se puede actualizar a administradores'
            });
        }

        const user = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Usuario Actualizado',
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar usuario',
            error: err.message
        });
    }
}