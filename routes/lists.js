const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const {
  getList,
  createList,
  updateList,
  deleteList,
} = require('../controllers/lists');

router.route('/').post(protect, createList);

router
  .route('/:id')
  .get(protect, getList)
  .put(protect, updateList)
  .delete(protect, deleteList);

module.exports = router;
