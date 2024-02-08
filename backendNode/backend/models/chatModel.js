//file name for node version chatModel.js

//chatName
//isGroupChat
//users
//latestMessage
//groupAdmin

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  chatName: {
    type: String,
    required: true,
  },
  isGroupChat: {
    type: Boolean,
    required: true,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User", // Assuming 'User' is the name of the collection you want to reference
    },
  ],
  latestMessage: {
    type: String,
  },
  groupAdmin: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the 'User' collection
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
