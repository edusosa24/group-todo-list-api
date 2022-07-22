const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {getTask, createTask, updateTask ,deleteTask  } = require('../controllers/tasks');

router.route('/').post(protect, createTask);

router
  .route('/:id')
  .get(protect, getTask)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
