import { Schema, model } from "mongoose";

const types = [
    "TRABAJO_EN_EQUIPO",
    "LIDERAZGO",
    "COMUNICACIÓN",
    "RESOLUCIÓN_DE_CONFLICTOS",
    "TOMA_DE_DECISIONES",
    "INTELIGENCIA_EMOCIONAL",
    "ADAPTABILIDAD",
    "PENSAMIENTO_CRÍTICO",
    "GESTIÓN_DEL_TIEMPO",
    "CREATIVIDAD",
    "ORGANIZACIÓN",
    "EMPATÍA",
    "RESILIENCIA",
    "NEGOCIACIÓN",
    "AUTODISCIPLINA",
    "MOTIVACIÓN",
    "COLABORACIÓN",
    "COMUNICACIÓN_ASERTIVA",
    "GESTIÓN_DEL_ESTRÉS",
    "PENSAMIENTO_ANALÍTICO"
];

export const psychSchema = new Schema({
    name: {
        type: String,
        enum: [...types],
        required: [true, "El nombre es obligatorio"]
    },
    percentage: {
        type: Number,
        min: 0,
        max: 100,
        required: [true, "El porcentaje es obligatorio"]
    },
    student:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "El ID del estudiante es obligatorio"]
    },
    status: {
        type: Boolean,
        default: true
    }
},
    {
        versionKey: false,
        timestamps: true
    })

psychSchema.methods.toJSON = function () {
    const { _v, _id, ...psych } = this.toObject()
    psych.uid = _id;
    return psych;
}

export default model("Psych", psychSchema)