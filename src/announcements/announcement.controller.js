import Announcement from "./announcement.model.js";

export const createAnnouncement = async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({
        success: false,
        message: "El contenido es obligatorio"
      });
    }

    const newAnnouncement = new Announcement({
      content
    });

    const savedAnnouncement = await newAnnouncement.save();

    res.status(201).json({
      success: true,
      data: savedAnnouncement
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const getActiveAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({ isActive: true })
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: announcements.length,
      data: announcements
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, isActive } = req.body;

    const announcement = await Announcement.findByIdAndUpdate(
      id,
      { content, isActive },
      { new: true, runValidators: true }
    );

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Anuncio no encontrado"
      });
    }

    res.status(200).json({
      success: true,
      data: announcement
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Anuncio no encontrado"
      });
    }
    if (!announcement.isActive) {
      return res.status(400).json({
        success: false,
        message: "El anuncio ya está inactivo"
      });
    }

    announcement.isActive = false;
    await announcement.save();

    res.status(200).json({
      success: true,
      message: "Anuncio eliminado correctamente",
      data: announcement
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};