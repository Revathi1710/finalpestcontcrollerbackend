const mongoose = require('mongoose');

const PropertyEnquirySchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  customername: String,
  customerIdNumber: String,
  property_id: String,
  ownerId: String, // stored as string – ensure this matches how it's queried
  ownerName: String,
  ownerNumber: String
}, { timestamps: true });

module.exports = mongoose.model('PropertyEnquiry', PropertyEnquirySchema);
