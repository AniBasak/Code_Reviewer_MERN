require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/database');
const chatRoutes = require('./routes/chat');
const admin = require('./config/firebase');
const Conversation = require('./models/Conversation');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Configure this properly for production
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/chat', chatRoutes);

// Socket authentication middleware
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error'));
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    socket.user = decodedToken;
    next();
  } catch (error) {
    next(new Error('Authentication error'));
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.user.uid}`);

  // Join user to their conversations
  socket.on('join-conversation', async (conversationId) => {
    try {
      const conversation = await Conversation.findById(conversationId);
      if (conversation && conversation.userId === socket.user.uid) {
        socket.join(conversationId);
        socket.emit('joined-conversation', conversationId);
      }
    } catch (error) {
      socket.emit('error', 'Failed to join conversation');
    }
  });

  // Handle new messages
  socket.on('send-message', async (data) => {
    try {
      const { conversationId, content, messageType = 'text' } = data;

      // Verify user owns this conversation
      const conversation = await Conversation.findById(conversationId);
      if (!conversation || conversation.userId !== socket.user.uid) {
        socket.emit('error', 'Unauthorized');
        return;
      }

      // Create message
      const message = new Message({
        conversationId,
        senderId: socket.user.uid,
        senderType: 'user',
        content,
        messageType
      });

      await message.save();

      // Update conversation last message time
      conversation.lastMessageAt = new Date();
      await conversation.save();

      // Emit message to conversation room
      io.to(conversationId).emit('new-message', message);

      // TODO: Notify agents about new message

    } catch (error) {
      socket.emit('error', 'Failed to send message');
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.user.uid}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Chat microservice running on port ${PORT}`);
});