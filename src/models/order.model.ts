import mongoose, { Schema } from "mongoose";

interface IMessage {
  text: string;
  user: mongoose.Types.ObjectId;
}

const status = [
  "order.client.send",
  "order.client.deleted",
  "order.driver.confirmed",
  "order.driver.on_the_way",
  "order.driver.complete",
  "order.driver.cancel",
];

export type Order = mongoose.Document & {
  client: mongoose.Types.ObjectId;
  driver: mongoose.Types.ObjectId;
  city: mongoose.Types.ObjectId;
  region: mongoose.Types.ObjectId;
  location: { type: string; coordinates: number[] };
  status: string;
};

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const OrderSchema = new Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    location: pointSchema,
    status: {
      type: String,
      enum: status,
      default: "order.client.send",
    },
    city: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
    region: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
  },
  { timestamps: true }
);
export const OrderModel = mongoose.model<Order>("Order", OrderSchema);
