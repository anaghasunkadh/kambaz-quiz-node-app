import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: String,  // you control _id manually (UUID)
  username: { type: String }, // optional, or keep required if used elsewhere
  loginId: { type: String, required: true, unique: true },  // mark loginId as unique and required
  password: { type: String, required: false },
  firstName: String,
  lastName: String,
  email: String,
  dob: Date,
  role: {
    type: String,
    enum: ["STUDENT", "FACULTY", "ADMIN", "USER"],
    default: "USER",
  },
  section: String,
  lastActivity: Date,
  totalActivity: String,
}, { collection: "users" });

export default userSchema;
