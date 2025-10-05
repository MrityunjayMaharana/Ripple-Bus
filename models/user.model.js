import mongoose from "mongoose";
import { type } from "os";

const userProfile = new mongoose.Schema({
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "other",
    trim: true,
  },
  dob: {
    type: Date,
    default: null
  },
  address: { type: String, trim: true },
  emergencyContact: { type: String, trim: true },
  emergencyContactPhone: { type: String, trim: true },
  avatar: { type: String, trim: true },
});

const conductorDetails = new mongoose.Schema({
  experience: { type: Number, default: 0 },
  licenseNumber: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  assignedBus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
  },
  rating: { type: Number, default: 0, min: 0, max: 5 },
});



const adminDetails = new mongoose.Schema({
  department: {
    type: String,
    enum: ["manager", "supervisor"],
    default: "manager",
    trim: true,
  }
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\d{10}$/, "Phone must be 10 digits"],
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["passenger", "conductor", "admin"],
      default: "passenger",
    },
    profile: userProfile,
    conductor: conductorDetails,
    admin: adminDetails,
    isActive: { type: Boolean, default: true },
    emailOtp: { type: String, trim: true },
    emailOtpExpiry: { type: Date },
    phoneOtp: { type: String, trim: true },
    phoneOtpExpiry: { type: Date },
    isVerified: { type: Boolean, default: false },
    lastLogin: {
        type: Date,
        default: Date.now()
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User
