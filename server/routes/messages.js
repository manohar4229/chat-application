const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const auth = require('../middleware/auth');

// All routes are protected
router.use(auth);

// Get messages with a specific user
router.get('/:userId', messageController.getMessages);

// Send a new message
router.post('/', messageController.sendMessage);

// Update message status
router.patch('/:messageId/status', messageController.updateMessageStatus);

module.exports = router; 