const Response = require('../models/Response');
const Form = require('../models/Form');
const XLSX = require('xlsx');

// Прикупљање одговора
exports.submitResponse = async (req, res) => {
  try {
    const { formId, answers } = req.body;
    const response = new Response({ formId, userId: req.user?.id, answers });
    await response.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Преглед свих одговора за формулар
exports.getResponses = async (req, res) => {
  try {
    const { formId } = req.params;
    const responses = await Response.find({ formId });
    res.json(responses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Извоз одговора у XLSX
exports.exportResponses = async (req, res) => {
  try {
    const { formId } = req.params;
    const responses = await Response.find({ formId });

    const workbook = XLSX.utils.book_new();
    const sheetData = responses.map((response) => ({
      userId: response.userId || 'Guest',
      submittedAt: response.submittedAt,
      ...response.answers.reduce((acc, curr) => {
        acc[`Question_${curr.questionId}`] = curr.answer;
        return acc;
      }, {}),
    }));

    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Responses');

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    res.setHeader('Content-Disposition', `attachment; filename="responses_${formId}.xlsx"`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
