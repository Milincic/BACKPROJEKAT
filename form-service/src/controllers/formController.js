const Form = require('../models/Form');

// Креирање формулара
exports.createForm = async (req, res) => {
  try {
    const { name, description, questions } = req.body;
    const form = new Form({
      name,
      description,
      questions,
      creator: req.user.id, // ID креатора (извучен из JWT токена)
    });
    await form.save();
    res.status(201).json(form);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Преглед формулара
exports.getForms = async (req, res) => {
  try {
    const forms = await Form.find({ creator: req.user.id });
    res.json(forms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Измена формулара
exports.updateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedForm = await Form.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedForm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Брисање формулара
exports.deleteForm = async (req, res) => {
  try {
    const { id } = req.params;
    await Form.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
