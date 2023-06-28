const { Conversation, Message } = require("../models/message");
const { io } = require("../index");
const jwt = require("jwt-simple");

module.exports = function () {
  io.on("connection", (socket) => {
    const token = socket.handshake.query.jwt;
    const user = jwt.decode(token, process.env.JWT_SECRET);
    socket.join(user.id);
    console.log("A user connected.", user.id);
    // Handle socket events (e.g., new messages, user actions, etc.)
    // You can define custom event handlers and emit events to clients as needed.

    socket.on("disconnect", () => {
      console.log("A user disconnected.");
    });

    socket.on("send-message", ({ message, conversationId, receiver }) => {
      createMessage(user.id, message, conversationId);

      io.to(receiver).emit("message", {
        conversationId,
        message,
        sender: user.id,
      });
    });
  });
};

async function createMessage(sender, message, conversationId) {
  try {
    const newmessage = new Message({
      sender,
      converstion: conversationId,
      content: message,
    });

    const conversation = await Conversation.findOne({ _id: conversationId });

    if (conversation.jobseeker == sender) {
      newmessage.receiver = conversation.employer;
    } else {
      newmessage.receiver = conversation.jobseeker;
    }

    await newmessage.save();
  } catch (error) {
    console.log(error);
  }
  return;
}

module.exports.getAllConversations = async (req, res) => {
  const { userId } = req.params;

  try {
    const conversations = await Conversation.find({
      $or: [{ jobseeker: userId }, { employer: userId }],
    })
      .populate("employer")
      .populate("jobseeker")
      .populate({
        path: "jobseeker",
        select: "-password",
        populate: {
          path: "profileId",
          select: "name",
        },
      })
      .populate({
        path: "employer",
        select: "-password",
        populate: {
          path: "profileId",
          select: "name",
        },
      });

    return res.status(200).send(conversations);
  } catch (error) {
    return res.status(404).send("error to fetch ");
  }
};

module.exports.getMessagesOfConversation = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await Message.find({
      converstion: conversationId,
    });

    if (!messages.length) {
      return res.status(204).send("no messages found!");
    }

    return res.status(200).send(messages);
  } catch (error) {
    return res.status(404).send("error to fetch ");
  }
};
