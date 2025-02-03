// blockedChatModel.js
const mongoose = require("mongoose");

const blockedChatSchema = mongoose.Schema(
  {
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamps: true }
);

const BlockedChat = mongoose.model("BlockedChat", blockedChatSchema);

module.exports = BlockedChat;
