const mongoose = require("mongoose");
const autoIncrementId = require("../plugins/autoIncrementId");

const UserSchema = new mongoose.Schema({
  _id: {
    type: Number,
    unique: true,
  },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  secondLastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  license: { type: String },
  registrationDate: { type: Date, default: Date.now },
  profilePicture: { type: String, required: true },
  status: {
    type: String,
    enum: ["Available", "On Trip", "Unavailable", "Disabled"],
    default: "Available",
    required: true,
  },
  role: { type: String, enum: ["admin", "driver"], required: true },
});

UserSchema.pre("save",autoIncrementId('User'));

module.exports = mongoose.model("User", UserSchema, 'user');
