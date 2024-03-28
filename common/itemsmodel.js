import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    itemname: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Itemmodel = mongoose.model("item", itemSchema);

export default Itemmodel;