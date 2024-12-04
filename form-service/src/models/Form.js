const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ['short', 'long', 'multiple', 'checkbox', 'number', 'date', 'time'], required: true },
  options: [String], // За multiple и checkbox
  required: { type: Boolean, default: false },
});

const FormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  questions: [QuestionSchema],
  creator: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isLocked: { type: Boolean, default: false },
});

module.exports = mongoose.model('Form', FormSchema);
