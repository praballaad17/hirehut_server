const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  converstion: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
  },
});

const ConversationSchema = new Schema({
  jobseeker: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  employer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["archived", "active"],
    default: "active",
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: "Job",
  },
});

const Conversation = mongoose.model("Conversation", ConversationSchema);
const Message = mongoose.model("Message", MessageSchema);

module.exports = { Conversation, Message };
