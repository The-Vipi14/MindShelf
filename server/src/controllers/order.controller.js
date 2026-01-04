// import Order from "../models/Order.model.js";
// import Cart from "../models/Cart.model.js";
// import { clearCart } from "./cart.controller.js";

// /**
//  * CREATE ORDER DIRECTLY (without cart)
//  */
// export const createOrder = async (req, res) => {
//   try {
//     const { items } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "No items provided" });
//     }

//     const totalAmount = items.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     const order = await Order.create({
//       user: req.user._id,
//       items,
//       totalAmount
//     });

//     res.status(201).json(order);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to create order" });
//   }
// };

// /**
//  * CREATE ORDER FROM CART
//  */
// export const createOrderFromCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user._id })
//       .populate("items.book", "price");

//     if (!cart || cart.items.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     const items = cart.items.map(item => ({
//       book: item.book._id,
//       quantity: item.quantity,
//       price: item.book.price
//     }));

//     const totalAmount = items.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     const order = await Order.create({
//       user: req.user._id,
//       items,
//       totalAmount
//     });

//     await clearCart(req.user._id);

//     res.status(201).json(order);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to place order" });
//   }
// };

// /**
//  * USER ORDERS
//  */
// export const getMyOrders = async (req, res) => {
//   const orders = await Order.find({ user: req.user._id })
//     .populate("items.book", "title price");
//   res.json(orders);
// };

// /**
//  * ADMIN ORDERS
//  */
// export const getAllOrders = async (req, res) => {
//   const orders = await Order.find()
//     .populate("user", "name email")
//     .populate("items.book", "title price");
//   res.json(orders);
// };

// /**
//  * UPDATE ORDER STATUS
//  */
// export const updateOrderStatus = async (req, res) => {
//   const order = await Order.findById(req.params.id);
//   if (!order) return res.status(404).json({ message: "Order not found" });

//   order.status = req.body.status;
//   await order.save();

//   res.json(order);
// };


import Order from "../models/Order.model.js";
import Cart from "../models/Cart.model.js";
import { clearCart } from "./cart.controller.js";
import { orderStatusSchema } from "../validators/order.validator.js";

export const createOrderFromCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
    .populate("items.book", "price");

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const items = cart.items.map(item => ({
    book: item.book._id,
    quantity: item.quantity,
    price: item.book.price
  }));

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await Order.create({
    user: req.user._id,
    items,
    totalAmount
  });

  await clearCart(req.user._id);

  res.status(201).json(order);
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  try {
    const parsed = orderStatusSchema.parse(req.body);

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = parsed.status;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.errors?.[0]?.message || "Invalid status" });
  }
};
