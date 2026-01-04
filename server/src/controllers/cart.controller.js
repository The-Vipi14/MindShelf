import Cart from "../models/cart.model.js";

/**
 * @desc    Get logged-in user's cart
 * @route   GET /api/cart
 */
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.book", "title price image");

    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

/**
 * @desc    Add item to cart
 * @route   POST /api/cart
 */
export const addToCart = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ book: bookId, quantity }]
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.book.toString() === bookId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ book: bookId, quantity });
      }

      await cart.save();
    }

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

/**
 * @desc    Update quantity
 * @route   PUT /api/cart
 */
export const updateCartItem = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.book.toString() === bookId
    );

    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to update cart" });
  }
};

/**
 * @desc    Remove item from cart
 * @route   DELETE /api/cart/:bookId
 */
export const removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.book.toString() !== req.params.bookId
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item" });
  }
};

/**
 * @desc    Clear cart (after order)
 */
export const clearCart = async (userId) => {
  await Cart.findOneAndDelete({ user: userId });
};
