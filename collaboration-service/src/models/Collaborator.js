const mongoose = require('mongoose');

const CollaboratorSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Form' },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  role: { type: String, enum: ['editor', 'viewer'], required: true },
});

module.exports = mongoose.model('Collaborator', CollaboratorSchema);
