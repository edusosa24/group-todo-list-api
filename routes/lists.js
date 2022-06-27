const express = require('express');
const router = express.Router();

const {
  getLists,
  getList,
  createList,
  updateList,
  deleteList,
} = require('../controllers/lists');

router.route('/').get(getLists).post(createList);

router.route('/:id').get(getList).put(updateList).delete(deleteList);

module.exports = router;
