// @desc    Gets all groups
// @route   GET /api/v1/groups
// @access  Private
exports.getGroups = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all groups' });
};

// @desc    Gets a single group
// @route   GET /api/v1/groups/:id
// @access  Private
exports.getGroup = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Show group ${req.params.id}` });
};

// @desc    Create new group
// @route   Post /api/v1/groups
// @access  Private
exports.createGroup = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new group' });
};

// @desc    Updates group
// @route   PUT /api/v1/groups/:id
// @access  Private
exports.updateGroup = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update group ${req.params.id}` });
};

// @desc    Deletes group
// @route   DELETE /api/v1/groups/:id
// @access  Private
exports.deleteGroup = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete group ${req.params.id}` });
};
