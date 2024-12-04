const express = require('express');
const {
  submitResponse,
  getResponses,
  exportResponses,
} = require('../controllers/responseController');
const router = express.Router();

router.post('/', submitResponse); // Прикупљање одговора
router.get('/:formId', getResponses); // Преглед одговора
router.get('/export/:formId', exportResponses); // Извоз у XLSX

module.exports = router;
