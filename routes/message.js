const express = require("express");
const router = express.Router();

const {
  getAllConversations,
  getMessagesOfConversation,
} = require("../controllers/messageController");

router.get("/all-conversations/:userId", getAllConversations);
router.get("/all-messages/:conversationId", getMessagesOfConversation);

module.exports = router;
