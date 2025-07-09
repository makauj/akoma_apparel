Here's your **API Integration Guide** prepared in Markdown format:

---

```markdown
# 🧩 Akoma Apparel – API Integration Guide (Backend ↔ Frontend)

This guide is for frontend developers integrating with the Akoma Apparel REST API.

---

## 📦 Overview

- **Backend Stack**: Node.js, Express, TypeScript, MongoDB (Mongoose)
- **Features**: Authentication, Cart, Products, Orders, Payments (Stripe), Email, AWS image uploads
- **Base URL**: `http://localhost:5000/api/`

---

## 🔐 Authentication

### ✅ Register

```

POST /api/users/register

````

**Body**
```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "password123"
}
````

**Response**

```json
{
  "_id": "userId",
  "name": "John",
  "email": "john@example.com",
  "token": "JWT_TOKEN"
}
```

---

### ✅ Login

```
POST /api/users/login
```

Same structure as above. Returns token.

---

### ✅ Get User Profile

```
GET /api/users/profile
Authorization: Bearer TOKEN
```

---

## 👕 Products

### ✅ Get Products

```
GET /api/products
```

**Query Parameters**

| Param      | Example           | Description                     |
| ---------- | ----------------- | ------------------------------- |
| `keyword`  | `?keyword=shirt`  | Search product name             |
| `category` | `?category=shoes` | Filter by category              |
| `inStock`  | `?inStock=true`   | Filter by stock                 |
| `sort`     | `?sort=price_asc` | Sort: `price_asc`, `name_desc`  |
| `page`     | `?page=2`         | Pagination                      |
| `currency` | `?currency=USD`   | Convert prices to this currency |

**Sample**

```
GET /api/products?keyword=shirt&page=1&sort=price_desc&currency=USD
```

**Response**

```json
{
  "products": [...],
  "page": 1,
  "pages": 4,
  "hasMore": true,
  "totalProducts": 34
}
```

---

## 🛒 Cart

> All endpoints below require: `Authorization: Bearer TOKEN`

### ✅ Get Cart

```
GET /api/cart
```

### ✅ Add to Cart

```
POST /api/cart/add
```

**Body**

```json
{
  "productId": "xxx",
  "quantity": 2
}
```

### ✅ Update Cart Item

```
PUT /api/cart/update
```

**Body**

```json
{
  "productId": "xxx",
  "quantity": 1
}
```

### ✅ Remove Cart Item

```
DELETE /api/cart/remove/:productId
```

### ✅ Clear Cart

```
DELETE /api/cart/clear
```

---

## 📦 Orders

### ✅ Place Order

```
POST /api/orders
Authorization: Bearer TOKEN
```

**Body**

```json
{
  "items": [
    { "productId": "xxx", "quantity": 2 }
  ],
  "shippingAddress": "...",
  "paymentMethod": "card"
}
```

### ✅ Get My Orders

```
GET /api/orders
Authorization: Bearer TOKEN
```

---

## 💳 Stripe Payments

1. Create Stripe session:

```
POST /api/payments/create-checkout-session
```

**Body**

```json
{
  "items": [
    { "productId": "xxx", "quantity": 1 }
  ]
}
```

**Response**

```json
{
  "url": "https://checkout.stripe.com/..."
}
```

2. Redirect user to `url`.

---

## 📧 Email Routes

| Route                            | Method | Description        |
| -------------------------------- | ------ | ------------------ |
| `/api/users/forgot-password`     | POST   | Request reset code |
| `/api/users/reset-password`      | POST   | Reset with token   |
| `/api/users/verify-email/:token` | GET    | Email verification |

---

## 📁 AWS Image Upload

> Auth required.

```
POST /api/uploads
```

**Headers**:

```
Authorization: Bearer TOKEN
```

**Body**:

* FormData containing file in `image` field

---

## 🔍 Advanced Product Filters

You can **combine** filters:

```
GET /api/products?category=shirts&inStock=true&sort=price_desc&currency=USD&page=2
```

---

## 🧰 Frontend Integration Notes

* Store JWT in localStorage or cookies
* Attach token in headers for protected routes:

  ```
  Authorization: Bearer <token>
  ```
* Use query params for pagination and filtering
* Pay attention to fields:

  * `pages`, `page` → pagination controls
  * `hasMore` → infinite scroll
  * `currency`, `totalProducts` → price formatting, UI stats

---

## 🧪 Developer Tools

| Purpose         | Tools                         |
| --------------- | ----------------------------- |
| API requests    | Axios, Fetch, React Query     |
| Auth handling   | Axios interceptors, Context   |
| Form handling   | React Hook Form + Zod/Joi     |
| Stripe payments | Stripe JS SDK                 |
| Uploads         | FormData, input\[type="file"] |

---

## ✅ Environment Setup (Frontend)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```
