// =====================================
// MindShelf Frontend API Helper
// =====================================

const BASE_URL = "http://localhost:5000/api";

// -------------------------------------
// TOKEN HELPERS
// -------------------------------------
export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const clearToken = () => {
  localStorage.removeItem("token");
};

// -------------------------------------
// CORE REQUEST FUNCTION
// -------------------------------------
const request = async (endpoint, options = {}) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
};

// =====================================
// AUTH APIS
// =====================================
export const registerUser = (userData) =>
  request("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });

export const loginUser = (credentials) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

// =====================================
// BOOK APIS
// =====================================
export const getAllBooks = () => request("/books");

export const getBookById = (id) => request(`/books/${id}`);

// =====================================
// CART APIS
// =====================================
export const getCart = () => request("/cart");

export const addToCart = (bookId, quantity = 1) =>
  request("/cart", {
    method: "POST",
    body: JSON.stringify({ bookId, quantity }),
  });

export const updateCartItem = (bookId, quantity) =>
  request("/cart", {
    method: "PUT",
    body: JSON.stringify({ bookId, quantity }),
  });

export const removeFromCart = (bookId) =>
  request(`/cart/${bookId}`, {
    method: "DELETE",
  });

// =====================================
// ORDER APIS
// =====================================
export const placeOrderFromCart = () =>
  request("/orders/from-cart", {
    method: "POST",
  });

// =====================================
// ADMIN APIS (OPTIONAL – FUTURE USE)
// =====================================
export const getAdminOrders = () => request("/admin/orders");

export const updateOrderStatus = (orderId, status) =>
  request(`/admin/orders/${orderId}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
