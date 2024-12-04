const express = require('express');
const {
  createForm,
  getForms,
  updateForm,
  deleteForm,
} = require('../controllers/formController');
const router = express.Router();

router.post('/', createForm); // Креирање формулара
router.get('/', getForms); // Преглед свих формулара креатора
router.put('/:id', updateForm); // Измена формулара
router.delete('/:id', deleteForm); // Брисање формулара

module.exports = router;
