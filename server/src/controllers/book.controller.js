import Book from "../models/Book.model.js";

/**
 * @desc    Get all books (USER)
 * @route   GET /api/books
 */
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books" });
  }
};

/**
 * @desc    Get single book by id (USER)
 * @route   GET /api/books/:id
 */
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch book" });
  }
};

/**
 * @desc    Add new book (ADMIN)
 * @route   POST /api/books
 */
export const addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: "Failed to add book" });
  }
};

/**
 * @desc    Update book (ADMIN)
 * @route   PUT /api/books/:id
 */
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(400).json({ message: "Failed to update book" });
  }
};

/**
 * @desc    Delete book (ADMIN)
 * @route   DELETE /api/books/:id
 */
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete book" });
  }
};
