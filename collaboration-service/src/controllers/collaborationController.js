const Collaborator = require('../models/Collaborator');

// Додавање сарадника
exports.addCollaborator = async (req, res) => {
  try {
    const { formId, userId, role } = req.body;
    const collaborator = new Collaborator({ formId, userId, role });
    await collaborator.save();
    res.status(201).json(collaborator);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Преглед сарадника на формулару
exports.getCollaborators = async (req, res) => {
  try {
    const { formId } = req.params;
    const collaborators = await Collaborator.find({ formId }).populate('userId', 'username email');
    res.json(collaborators);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Уклањање сарадника
exports.removeCollaborator = async (req, res) => {
  try {
    const { id } = req.params;
    await Collaborator.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
