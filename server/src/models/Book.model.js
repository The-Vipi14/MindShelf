import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    pages: Number,
    isbn: String,
    language: {
      type: String,
      default: "English",
    },

    publisher: String,
    publishedYear: String,
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
