# Akoma Apparel

A full-stack e-commerce web application built with:

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TypeScript, MongoDB (Mongoose)
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (frontend), Render/Fly.io (backend)

---

## 🚀 Features

- ✅ Product listing and details
- ✅ Shopping cart with live updates
- ✅ User registration & login (JWT Auth)
- ✅ Checkout and order placement
- ✅ Admin dashboard for managing products/orders
- ✅ Fully responsive layout

---

## 🧱 Project Structure

/my-store
├── client/                     # React + TypeScript + Tailwind frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Static files (images, icons)
│   │   ├── components/         # Reusable UI components (Navbar, ProductCard, etc.)
│   │   ├── pages/              # Pages (Home, Product, Checkout, etc.)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── types/              # TypeScript interfaces/types
│   │   ├── utils/              # Helper functions
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── tsconfig.json
│   └── package.json
│
├── server/                     # Express + TypeScript + MongoDB backend
│   ├── src/
│   │   ├── controllers/        # Request handlers (e.g., productController.ts)
│   │   ├── models/             # Mongoose models (e.g., Product.ts, User.ts)
│   │   ├── routes/             # Express route definitions
│   │   ├── middleware/         # Custom middleware (auth, error handling)
│   │   ├── utils/              # Utility functions (e.g., token generation)
│   │   └── index.ts            # Entry point for server
│   ├── .env                    # Environment variables
│   ├── tsconfig.json
│   ├── package.json
│   └── nodemon.json (optional)
│
├── .gitignore
└── README.md

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/makauj/akoma_apparel.git
cd akoma_apparel
```

### 2. Setup the client

```bash
cd client
npm install
npm run dev
```

### 3. Setup the server

```bash
cd server
npm install
npm run dev
```

> ⚠️ Be sure to create `.env` files in both `client/` and `server/`.

---

## 🔐 Environment Variables

### Server `.env`

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 📦 Tech Stack

| Layer      | Tech                                    |
| ---------- | --------------------------------------- |
| Frontend   | React, TypeScript, Tailwind CSS, Vite   |
| Backend    | Node.js, Express, TypeScript            |
| Database   | MongoDB (via Mongoose)                  |
| Deployment | Vercel (client), Render/Fly.io (server) |

---

## 🪪 License

This project is licensed under the MIT License.
See [`LICENSE`](./LICENSE) for more information.

---

## 🙋‍♂️ Contributors

Built by [John Makau](https://github.com/makauj)
Built by [Your Name](https://github.com/github-name)
Built by [Your Name](https://github.com/github-name)
Built by [Your Name](https://github.com/github-name)

