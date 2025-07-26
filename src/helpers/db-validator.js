import User from "../user/user.model.js";

export const emailExists = async(email) =>{
    const exist = await User.findOne({email});
    if(exist){
        throw new Error(`El correo ${email} ya está registrado`)
    }
}