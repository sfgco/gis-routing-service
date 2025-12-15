import mongoose, { Schema } from "mongoose";

type Location = mongoose.Document & {
  name_ar: string;
  name_en: string;
  active: boolean;
  type: string;
  parent: mongoose.Types.ObjectId | null;
};

const LocationSchema = new Schema(
  {
    name_ar: {
      type: String,
      required: true,
    },
    name_en: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["region", "city"],
    },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
  },
  { timestamps: true }
);
export const LocationModel = mongoose.model<Location>(
  "Location",
  LocationSchema
);
