const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const {
  getLists,
  getList,
  createList,
  updateList,
  deleteList,
} = require('../controllers/lists');

router.route('/').get(protect, getLists).post(protect, createList);

router
  .route('/:id')
  .get(protect, getList)
  .put(protect, updateList)
  .delete(protect, deleteList);

module.exports = router;
