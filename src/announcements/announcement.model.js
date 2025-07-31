import mongoose from "mongoose";

const { Schema, model } = mongoose;

const announcementSchema = new Schema({
  content: {
    type: String,
    required: [true, "El contenido es obligatorio"]
  },
  date: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  versionKey: false
});

export default model("Announcement", announcementSchema);