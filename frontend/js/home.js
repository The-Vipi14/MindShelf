// // // ================================
// // // Home Page Logic (Books Listing)
// // // ================================

// // import { getAllBooks } from "./api.js";

// // // Container jahan cards already render hote the
// // const booksContainer = document.querySelector(".popular-books-container");

// // // Safety check
// // if (!booksContainer) {
// //   console.error("❌ .popular-books-container not found in DOM");
// // }

// // // Render single book card (UI preserved)
// // const renderBookCard = (book) => {
// //   const card = document.createElement("div");
// //   card.className = "book-card";

// //   card.innerHTML = `
// //     <div class="book-img-box">
// //       <img src="${book.image}" alt="${book.title}" />
// //     </div>

// //     <h3>${book.title}</h3>
// //     <h4>${book.author}</h4>

// //     <p>
// //       <span>₹${book.price}</span>
// //     </p>

// //     <button class="purchase-btn" data-id="${book._id}">
// //       Purchase
// //     </button>
// //   `;

// //   // Purchase → Product Details
// //   card.querySelector(".purchase-btn").addEventListener("click", () => {
// //     window.location.href = `productDetails.html?id=${book._id}`;
// //   });

// //   return card;
// // };

// // // Fetch & render books
// // const loadBooks = async () => {
// //   try {
// //     const books = await getAllBooks();

// //     booksContainer.innerHTML = ""; // clear old UI

// //     if (!books.length) {
// //       booksContainer.innerHTML = "<p>No books available</p>";
// //       return;
// //     }

// //     books.forEach((book) => {
// //       booksContainer.appendChild(renderBookCard(book));
// //     });
// //   } catch (error) {
// //     console.error("❌ Failed to load books:", error.message);
// //     booksContainer.innerHTML = "<p>Failed to load books</p>";
// //   }
// // };

// // // INIT
// // loadBooks();


// // ================================
// // Home Page Logic (Books Listing)
// // ================================

// import { getAllBooks } from "./api.js";

// document.addEventListener("DOMContentLoaded", () => {
//   const booksContainer = document.querySelector(".popular-books-container");

//   // ❌ Agar container hi nahi mila
//   if (!booksContainer) {
//     console.error("❌ .popular-books-container not found in DOM");
//     return;
//   }

//   // Render single book card
//   const renderBookCard = (book) => {
//     const card = document.createElement("div");
//     card.className = "book-card";

//     card.innerHTML = `
//       <div class="book-img-box">
//         <img src="${book.image}" alt="${book.title}" />
//       </div>

//       <h3>${book.title}</h3>
//       <h4>${book.author}</h4>

//       <p>
//         <span>₹${book.price}</span>
//       </p>

//       <button class="purchase-btn" data-id="${book._id}">
//         Purchase
//       </button>
//     `;

//     card.querySelector(".purchase-btn").addEventListener("click", () => {
//       window.location.href = `productDetails.html?id=${book._id}`;
//     });

//     return card;
//   };

//   // Load books from backend
//   const loadBooks = async () => {
//     try {
//       const books = await getAllBooks();

//       booksContainer.innerHTML = "";

//       if (!books || books.length === 0) {
//         booksContainer.innerHTML = "<p>No books available</p>";
//         return;
//       }

//       books.forEach((book) => {
//         booksContainer.appendChild(renderBookCard(book));
//       });
//     } catch (error) {
//       console.error("❌ Failed to load books:", error.message);
//       booksContainer.innerHTML = "<p>Failed to load books</p>";
//     }
//   };

//   loadBooks();
// });


// import { getAllBooks } from "./api.js";

// document.addEventListener("DOMContentLoaded", async () => {
//   console.log("✅ home.js loaded");

//   const container = document.querySelector(".popular-books-container");
//   console.log("📦 container:", container);

//   if (!container) return;

//   try {
//     const books = await getAllBooks();
//     console.log("📚 books from API:", books);

//     container.innerHTML = "";

//     books.forEach((book) => {
//       const card = document.createElement("div");
//       card.className = "book-card";
//       card.innerHTML = `
//         <img src="${book.image}" />
//         <h3>${book.title}</h3>
//         <p>₹${book.price}</p>
//       `;
//       container.appendChild(card);
//     });
//   } catch (e) {
//     console.error("❌ API error:", e.message);
//   }
// });

import { getAllBooks } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".popular-books-container");
  const seeAllBtn = document.getElementById("seeAllBtn");

  if (!container) {
    console.error("popular-books-container not found");
    return;
  }

  let allBooks = [];
  let showingAll = false;

  const renderBooks = (books) => {
    container.innerHTML = "";

    books.forEach((book) => {
      const card = document.createElement("div");
      card.className = "book-card";

      card.innerHTML = `
        <img src="${book.image}" alt="${book.title}" />
        <h3>${book.title}</h3>
        <h4>${book.author}</h4>
        <p>₹${book.price}</p>
        <button class="purchase-btn">Purchase</button>
      `;

      card.querySelector("button").onclick = () => {
        window.location.href = `productDetails.html?id=${book._id}`;
      };

      container.appendChild(card);
    });
  };

  try {
    allBooks = await getAllBooks();

    // 👇 initially only 4 books
    renderBooks(allBooks.slice(0, 4));

    seeAllBtn.addEventListener("click", () => {
      if (!showingAll) {
        renderBooks(allBooks);
        seeAllBtn.textContent = "Show Less";
      } else {
        renderBooks(allBooks.slice(0, 4));
        seeAllBtn.textContent = "See All";
      }
      showingAll = !showingAll;
    });
  } catch (err) {
    container.innerHTML = "<p>Failed to load books</p>";
    console.error(err.message);
  }
});
