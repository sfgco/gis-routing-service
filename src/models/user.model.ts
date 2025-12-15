import mongoose, { Schema } from "mongoose";

enum UserType {
  CLIENT = "client",
  DRIVER = "driver",
  CARRIER = "carrier",
  ADMIN = "admin",
}
type OTP = {
  code: string;
  expire: Date;
};
type Doc = {
  name: string;
  url: string;
};
type Approval = {
  name: string;
  id: string;
  vehicleType: string;
  plateNumber: string;
  expireDate: Date;
};
export type User = mongoose.Document & {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  fcm?: string;
  otp: OTP;
  password: string;
  type: UserType;
  email_verified: boolean;
  active: boolean;
  city_id: mongoose.Schema.Types.ObjectId;
  region_id: mongoose.Schema.Types.ObjectId;
  carrier: string;
  language: string;
  approval: Approval;
  campaign: Object;
  documents: Doc[];
  session: Date;
  location: { type: string; coordinates: number[] };
};

const DocumentSchema = new Schema({
  contentType: { type: String, require: true },
  url: { type: String, require: true },
});
const ApprovalSchema = new Schema({
  name: { type: String, require: true },
  id: { type: String, require: true },
  vehicleType: { type: String, require: true },
  expireDate: { type: Date, require: true },
  plateNumber: { type: String, require: true },
});
const locationSchema = new mongoose.Schema({
  type: {
    type: String, // Don't do `{ location: { type: String } }`
    enum: ["Point"], // 'location.type' must be 'Point'
    default: "Point",
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});
const OTPSchema = new Schema(
  {
    code: String,
    expire: { type: Date },
  },
  { timestamps: true }
);

const CampaignSchema = new Schema(
  {
    code: String,
    type: {
      type: String,
      enum: ["sms", "email", "wa"],
    },
    result: Object,
  },
  { timestamps: true }
);

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: OTPSchema,
      required: false,
    },
    type: {
      type: String,
      required: true,
      enum: ["client", "driver", "admin"],
    },
    language: {
      type: String,
      default: "ar",
      enum: ["ar", "en"],
    },
    location: locationSchema,
    campaign: CampaignSchema,
    fcm: String,
    session: Date,
    approval: ApprovalSchema,
    region_id: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
    city_id: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
    carrier: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    documents: [DocumentSchema],
  },
  { timestamps: true }
);
export const UserModel = mongoose.model<User>("User", UserSchema);
