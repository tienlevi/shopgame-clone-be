import OrderSchema from "../model/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, items, userInfo, totalPrice } = req.body;
    const order = await OrderSchema.create({
      userId,
      items,
      userInfo,
      totalPrice,
    });
    order.save();
    return res.status(200).json({ order });
  } catch (error) {
    console.log(error);
  }
};
