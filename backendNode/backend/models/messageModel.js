// messageModel.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId, // Assuming sender is a user ID
    ref: "User", // Reference to the 'User' collection
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  chat: {
    type: Schema.Types.ObjectId,
    ref: "Chat", // Reference to the 'Chat' collection
    required: true,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
