const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const { authenticateUser } = require('../middleware/auth');

// Create new conversation
router.post('/conversations', authenticateUser, async (req, res) => {
  try {
    const conversation = new Conversation({
      userId: req.user.uid,
      metadata: {
        userInfo: {
          email: req.user.email,
          name: req.user.name || 'Anonymous'
        }
      }
    });

    await conversation.save();
    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get conversation messages
router.get('/conversations/:conversationId/messages', authenticateUser, async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    const messages = await Message.find({ conversationId })
      .sort({ timestamp: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.json(messages.reverse());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's conversations
router.get('/conversations', authenticateUser, async (req, res) => {
  try {
    const conversations = await Conversation.find({ userId: req.user.uid })
      .sort({ lastMessageAt: -1 });
    
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;