# A full-stack mock e-commerce shopping cart built using the MERN stack (MongoDB, Express, React, Node.js).
# It allows users to browse products, add/remove items from the cart, view totals, and perform a mock checkout, showcasing smooth frontend-backend integration.

# 🚀 Tech Stack

Frontend: React + Vite + Tailwind CSS + Axios + React Router + React Toastify
Backend: Node.js + Express.js + Mongoose (MongoDB)
Database: MongoDB Atlas
API Communication: RESTful API using JSON
State Management: React Context API

# ⚙️ Features

✅ Product listing fetched from MongoDB
✅ Add / Remove items from cart
✅ View total amount dynamically
✅ Responsive and modern UI using Tailwind CSS
✅ Toast notifications for user feedback

# Project Structure
mock-ecom-cart/
│
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── models/Product.js
│   │   ├── routes/
│   │   │   ├── products.js
│   │   │   ├── cart.js
│   │   │   └── checkout.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── Checkout.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── package.json
│   └── .env

# Database (MongoDB + Mongoose)
mongoose.connect(process.env.MONGO_URI);
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});


# 💾 Installation & Setup
1️⃣ Clone the Repository
git clone "https://github.com/your-username/mock-ecom-cart.git"
cd mock-ecom-cart

# 2️⃣ Setup Backend
cd backend
npm install


# Create .env file:
MONGO_URI="your_mongodb_atlas_connection_string"
PORT=4000


# Start backend server:
npm run dev
(Default: http://localhost:4000
)

# 3️⃣ Setup Frontend
cd ../frontend
npm install

Create .env file:
VITE_API_BASE=http://localhost:4000/api


# Run the frontend:
npm run dev
