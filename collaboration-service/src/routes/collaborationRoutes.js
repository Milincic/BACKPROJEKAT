const express = require('express');
const {
  addCollaborator,
  getCollaborators,
  removeCollaborator,
} = require('../controllers/collaborationController');
const router = express.Router();

router.post('/', addCollaborator); // Додавање сарадника
router.get('/:formId', getCollaborators); // Преглед сарадника
router.delete('/:id', removeCollaborator); // Уклањање сарадника

module.exports = router;
