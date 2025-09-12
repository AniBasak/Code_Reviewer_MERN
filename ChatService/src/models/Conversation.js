const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['active', 'closed', 'waiting'], 
    default: 'active' 
  },
  assignedAgent: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  lastMessageAt: { type: Date, default: Date.now },
  metadata: {
    userInfo: { type: Object, default: {} },
    tags: [String],
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' }
  }
});

module.exports = mongoose.model('Conversation', conversationSchema);