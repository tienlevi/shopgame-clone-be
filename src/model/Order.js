import mongoose from "mongoose";

const orderItem = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  category: { type: String },
  img: { type: String },
});

const Order = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    items: [orderItem],
    userInfo: {
      type: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        tel: { type: String, required: true },
        address: { type: String, required: true },
      },
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true, versionKey: false }
);

const OrderSchema = mongoose.model("Order", Order);
export default OrderSchema;
