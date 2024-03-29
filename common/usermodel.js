import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    mobileno: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Usermodel = mongoose.model("User", userSchema);

export default Usermodel;
