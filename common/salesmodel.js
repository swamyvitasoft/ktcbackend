import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    sno: {
      type: Number,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mobileno: {
      type: String,
      required: true,
    },
    particulars: {
      type: String,
      required: true,
    },
    itemId: {
      type: ObjectId,
      required: true,
    },
    imei: {
      type: String,
      required: true,
    },
    estimatedamount: {
      type: Number,
      required: true,
    },
    advanceamount: {
      type: Number,
      required: true,
    },
    balaceamount: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Salemodel = mongoose.model("sale", saleSchema);

export default Salemodel;
