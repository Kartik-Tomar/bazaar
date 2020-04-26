const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  method: {
    type: String,
    enum: ["local", "google"],
    required: true,
  },
  local: {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  google: {
    id: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  city: {
    type: String,
  },
  contactNo: {
    type: Number,
  },
  facebook: {
    type: String,
  },
  youtube: {
    type: String,
  },
  instagram: {
    type: String,
  },
  myProducts: {
    type: [String],
  },
  myWishlist: {
    type: [String],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
