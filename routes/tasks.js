const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// const {} = require('../controllers/tasks');

router.route('/').post(protect, createTask);

router
  .route('/:id')
  .get(protect, getTask)
  .put(protect, updateTaks)
  .delete(protect, deleteTask);

module.exports = router;
