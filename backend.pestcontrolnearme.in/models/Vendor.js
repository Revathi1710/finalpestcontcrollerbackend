const mongoose = require('mongoose');
const slugify = require('slugify');

const VendorSchema = new mongoose.Schema({
  businessName: String,
  address: String,
  pincode: String,
  sinceFrom: String,
  specialistIn: String,
  contactPerson: String,
  contactNumber: { type: String, unique: true },
  email: { type: String, unique: true },
  businessSlug: { type: String, unique: true },
  pesticideLicence: String,
  gstNumber: String,
  membership: String,
  branchDetails: String,
  technicalQualification: String,
  password: String,
  logo: String,
  image: [{ type: String }],
  approved: { type: Boolean },
  aboutUs: String,
  businessType: String,
  website: String,
  expiryDays: String,
  startDate: Date,
  expiryDate: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,

  // ✅ Correctly define location with coordinates
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
     
    }
  }
}, { timestamps: true });

// ✅ Add 2dsphere index for geospatial queries
VendorSchema.index({ location: '2dsphere' });


// ✅ Slug generation
VendorSchema.pre('save', async function (next) {
  if (this.isModified('businessName') || this.isNew) {
    this.businessSlug = slugify(this.businessName, { lower: true, strict: true });

    let existingVendor = await mongoose.model('Vendor').findOne({ businessSlug: this.businessSlug });
    let slugModifier = 1;

    while (existingVendor && existingVendor._id.toString() !== this._id.toString()) {
      this.businessSlug = slugify(this.businessName, { lower: true, strict: true }) + '-' + slugModifier;
      slugModifier++;
      existingVendor = await mongoose.model('Vendor').findOne({ businessSlug: this.businessSlug });
    }
  }
  next();
});

module.exports = mongoose.model('Vendor', VendorSchema);
