const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Form' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  answers: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      answer: mongoose.Schema.Types.Mixed,
    },
  ],
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Response', ResponseSchema);
