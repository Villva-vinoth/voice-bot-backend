const mongoose = require('mongoose');

const chatSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    query: {
      type: String,
      required: true,
      trim: true,
    },
    response: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

chatSchema.index({ userId: 1, createdAt: 1 });
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
