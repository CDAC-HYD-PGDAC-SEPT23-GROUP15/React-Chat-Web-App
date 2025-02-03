//chatRoutes.js
const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
  deleteChat,
  blockChat,
  unblockChat,
  getBlockedChats,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);
router.route("/:id").delete(protect, deleteChat);
router.route("/block/:id").put(protect, blockChat);
router.route("/:id/unblock").put(protect, unblockChat);
router.route("/blocked").get(protect, getBlockedChats);
module.exports = router;
