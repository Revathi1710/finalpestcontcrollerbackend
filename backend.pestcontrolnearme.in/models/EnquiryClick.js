// models/EnquiryClick.js
const mongoose = require("mongoose");

const EnquiryClickSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserInfo", // replace with your actual user model name
    required: true,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor", // replace with your actual vendor model name
    required: true,
  },
  clickedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("EnquiryClick", EnquiryClickSchema);