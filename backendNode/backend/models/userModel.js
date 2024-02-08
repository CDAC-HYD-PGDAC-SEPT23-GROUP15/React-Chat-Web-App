// userModel.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures email uniqueness
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String, // Assuming pic is stored as a URL
      default:
        "https://cdn.vox-cdn.com/thumbor/LW8D1LdoptQEV-hgVmND-BlFYOk=/0x0:1920x1080/1220x813/filters:focal(1140x381:1446x687):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/67236826/batman_standalone_film_starring_and_directed_by_be_7xv2.0.jpg", // Default profile picture URL
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
