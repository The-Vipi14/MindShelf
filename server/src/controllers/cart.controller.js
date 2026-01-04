// import Cart from "../models/Cart.model.js";

// /**
//  * GET cart
//  */
// export const getCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user._id })
//       .populate("items.book", "title price image");

//     res.json(cart || { items: [] });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch cart" });
//   }
// };

// /**
//  * ADD to cart (creates cart if not exists)
//  */
// export const addToCart = async (req, res) => {
//   try {
//     const { bookId, quantity } = req.body;

//     let cart = await Cart.findOne({ user: req.user._id });

//     if (!cart) {
//       cart = await Cart.create({
//         user: req.user._id,
//         items: [{ book: bookId, quantity }]
//       });
//     } else {
//       const index = cart.items.findIndex(
//         (i) => i.book.toString() === bookId
//       );

//       if (index > -1) {
//         cart.items[index].quantity += quantity;
//       } else {
//         cart.items.push({ book: bookId, quantity });
//       }

//       await cart.save();
//     }

//     res.status(201).json(cart);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to add to cart" });
//   }
// };

// /**
//  * UPDATE quantity
//  */
// export const updateCartItem = async (req, res) => {
//   try {
//     const { bookId, quantity } = req.body;

//     const cart = await Cart.findOne({ user: req.user._id });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     const item = cart.items.find(
//       (i) => i.book.toString() === bookId
//     );

//     if (!item) return res.status(404).json({ message: "Item not found" });

//     item.quantity = quantity;
//     await cart.save();

//     res.json(cart);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update cart" });
//   }
// };

// /**
//  * REMOVE item
//  */
// export const removeCartItem = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user._id });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     cart.items = cart.items.filter(
//       (i) => i.book.toString() !== req.params.bookId
//     );

//     await cart.save();
//     res.json(cart);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to remove item" });
//   }
// };

// /**
//  * CLEAR cart (used after order)
//  */
// export const clearCart = async (userId) => {
//   await Cart.findOneAndDelete({ user: userId });
// };


// import Cart from "../models/Cart.model.js";

// /**
//  * GET CART
//  */
// export const getCart = async (req, res) => {
//   try {
//     console.log("GET CART USER:", req.user._id.toString());

//     const cart = await Cart.findOne({ user: req.user._id })
//       .populate("items.book", "title price image");

//     console.log("GET CART RESULT:", cart);

//     res.json(cart || { items: [] });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch cart" });
//   }
// };

// /**
//  * ADD TO CART
//  */
// export const addToCart = async (req, res) => {
//   try {
//     const { bookId, quantity } = req.body;

//     let cart = await Cart.findOne({ user: req.user._id });

//     if (!cart) {
//       cart = await Cart.create({
//         user: req.user._id,
//         items: [{ book: bookId, quantity }]
//       });
//     } else {
//       const index = cart.items.findIndex(
//         (i) => i.book.toString() === bookId
//       );

//       if (index > -1) {
//         cart.items[index].quantity += quantity;
//       } else {
//         cart.items.push({ book: bookId, quantity });
//       }

//       await cart.save();
//     }

//     res.status(201).json(cart);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to add to cart" });
//   }
// };

// /**
//  * UPDATE CART ITEM
//  */
// export const updateCartItem = async (req, res) => {
//   try {
//     const { bookId, quantity } = req.body;

//     const cart = await Cart.findOne({ user: req.user._id });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     const item = cart.items.find(
//       (i) => i.book.toString() === bookId
//     );

//     if (!item) return res.status(404).json({ message: "Item not found" });

//     item.quantity = quantity;
//     await cart.save();

//     res.json(cart);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update cart" });
//   }
// };

// /**
//  * REMOVE CART ITEM
//  */
// export const removeCartItem = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user._id });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     cart.items = cart.items.filter(
//       (i) => i.book.toString() !== req.params.bookId
//     );

//     await cart.save();
//     res.json(cart);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to remove item" });
//   }
// };

// /**
//  * CLEAR CART (used after order)
//  */
// export const clearCart = async (userId) => {
//   await Cart.findOneAndDelete({ user: userId });
// };



import Cart from "../models/Cart.model.js";
import { addToCartSchema, updateCartSchema } from "../validators/cart.validator.js";

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
    .populate("items.book", "title price image");

  res.json(cart || { items: [] });
};

export const addToCart = async (req, res) => {
  try {
    const parsed = addToCartSchema.parse(req.body);

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ book: parsed.bookId, quantity: parsed.quantity }]
      });
    } else {
      const index = cart.items.findIndex(
        i => i.book.toString() === parsed.bookId
      );

      if (index > -1) {
        cart.items[index].quantity += parsed.quantity;
      } else {
        cart.items.push({ book: parsed.bookId, quantity: parsed.quantity });
      }

      await cart.save();
    }

    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.errors?.[0]?.message || "Invalid input" });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const parsed = updateCartSchema.parse(req.body);

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      i => i.book.toString() === parsed.bookId
    );

    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = parsed.quantity;
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(400).json({ message: err.errors?.[0]?.message || "Invalid input" });
  }
};

export const removeCartItem = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(
    i => i.book.toString() !== req.params.bookId
  );

  await cart.save();
  res.json(cart);
};

export const clearCart = async (userId) => {
  await Cart.findOneAndDelete({ user: userId });
};
