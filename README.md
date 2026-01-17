# 🧭 WanderLust – Travel Stay Platform (Airbnb Clone)

**Connect. Discover. Stay.** 🌍

![Status](https://img.shields.io/badge/Status-Live-success)
![Build](https://img.shields.io/badge/Build-Stable-blue)
![License](https://img.shields.io/badge/License-Academic-green)
![Tech Stack](https://img.shields.io/badge/Made%20with-Node.js%20%7C%20Express%20%7C%20MongoDB%20%7C%20EJS-informational)
![Deployment](https://img.shields.io/badge/Deployment-Render-purple)

A modern full‑stack travel accommodation platform inspired by Airbnb, where users can browse, list, review, and favorite stays with a clean, responsive UI.

🟢 **All core features are live, stable, and deployed in production**

---

## 🌐 Live Application

| Service | URL | Status |
|--------|-----|--------|
| 🏡 **Main App** | https://wanderlustproject.onrender.com | ✅ Live |
| 📦 **API Server** | https://wanderlustproject.onrender.com (same Express backend) | ✅ Live |

> ⚠️ **Note**: Backend is hosted on Render free tier – the **first request** may take **30–60s** to spin up.

---

## 👨‍💻 Developer

| Member | Responsibility | Status |
|--------|----------------|--------|
| **Somesh Pandey** | Full‑stack Development & Deployment | ✅ Complete |

📍 **Location**: Lucknow, Uttar Pradesh, India  
🎓 **Education**: Apna College Delta Batch (MERN Stack)

---

## 📦 Project Overview

WanderLust is a MERN‑based travel listing application that lets users:

- 🔍 Browse and search stays by **category, price, and location**
- 🏠 View **detailed listing pages** with images, maps, and reviews
- ✏️ **Create, edit, and delete** their own listings
- ⭐ Add **reviews** and manage **favorites**
- 🔐 Securely **authenticate** and manage user accounts

---

## 🎨 Frontend

![Templating](https://img.shields.io/badge/View-EJS-blue)
![CSS](https://img.shields.io/badge/UI-Bootstrap%205-orange)
![Icons](https://img.shields.io/badge/Icons-Font%20Awesome-lightgrey)
![Maps](https://img.shields.io/badge/Maps-Mapbox-brightgreen)

**Purpose**: Airbnb‑inspired, mobile‑first UI with smooth browsing experience.

**Key UI Features**

- Fully responsive **navbar** with search, filters & mobile‑friendly menu  
- Horizontal scroll **category filters** (Trending, Rooms, Mountains, etc.)  
- Listing **cards** with image, price, and heart‑icon favorites  
- Detailed **listing pages** with map, reviews, and host/location details  
- Modern **Login/Signup** card layouts with validation  
- Global **flash messages** for success and error feedback  

---

## ⚙️ Backend

![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![DB](https://img.shields.io/badge/Database-MongoDB%20Atlas-darkgreen)
![Storage](https://img.shields.io/badge/Storage-Cloudinary-blue)
![Auth](https://img.shields.io/badge/Auth-Passport%20%2F%20JWT-red)

**Purpose**: Secure RESTful backend serving server‑side rendered pages.

**Key Backend Features**

- JWT / Passport‑based **authentication** (register, login, logout)  
- Protected routes for **create/edit/delete listings**  
- **Review system** (add/delete reviews on listings)  
- **Favorites** with toggle API and favorites page  
- **Cloudinary** integration for listing images  
- **Mapbox** geocoding + interactive map on listing pages  
- Robust **validation and error handling**  

---

## 🚀 Quick Start

### ✅ Prerequisites

- Node.js 16+
- MongoDB (local or Atlas)
- Cloudinary account
- Mapbox account

---

### 🔧 Installation

```bash
# Clone repository
git clone https://github.com/<your-username>/WanderLust.git
cd WanderLust

# Install dependencies
npm install
If you have any separate frontend build step (like SCSS/TS), add its commands here.

🛠 Environment Variables
Create a .env file in the project root:

text
PORT=8080
ATLASDB_URL=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

MAPBOX_TOKEN=your_mapbox_token
SESSION_SECRET=your_session_secret
🔒 Security: Never commit .env files. Set these values directly in Render’s environment settings for production.

▶️ Run the App
bash
npm start
# or
# nodemon app.js
Local Dev: http://localhost:8080

🔧 Tech Stack
Layer	Technology
Frontend	EJS, Bootstrap 5, Vanilla JS, Mapbox GL JS
Backend	Node.js, Express.js
Database	MongoDB Atlas (Mongoose ODM)
Auth	Passport / JWT (username‑password with hashing)
Storage	Cloudinary (listing images)
Deployment	Render (full Express app)
Utilities	Joi, Multer, dotenv, connect‑flash, express‑session, method‑override
Update this table to match the exact libraries used in your codebase.

🔌 Main Features
👤 Authentication & Users
Register, login, logout

Password hashing & secure sessions

Flash messages for auth success/error

🏠 Listings
Create, edit, delete listings (owner‑only)

Upload images via Cloudinary

Category‑based filters (Trending, Rooms, Mountains, Castles, etc.)

Optional “Show GST” toggle to display tax‑inclusive pricing

❤️ Favorites & Reviews
Per‑user favorite listings (heart icon)

Dedicated favorites page for quick access

Add/delete reviews for each listing

🗺 Maps & Location
Mapbox map on listing show page

Location string → coordinates via geocoding

📁 Project Structure
text
WanderLust/
├── app.js
├── package.json
├── cloudConfig.js
├── models/
│   ├── listing.js
│   └── review.js
├── routes/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── includes/
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   └── flash.ejs
│   ├── listings/
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── show.ejs
│   │   └── edit.ejs
│   └── users/
│       ├── login.ejs
│       └── signup.ejs
├── public/
│   ├── css/
│   └── js/
└── .env   # local only
🌳 Git Workflow
main → Production (deployed to Render)

feature/* → Feature development branches

Commit Convention

feat: New feature

fix: Bug fix

style: UI / formatting only

refactor: Code restructuring (no behavior change)

docs: Documentation / README updates

🔒 Security Highlights
✅ Password hashing (e.g. bcrypt)

✅ Request validation with Joi / custom validators

✅ Secure session & cookie configuration

✅ File upload type & size checks (images only)

✅ Environment variables for all secrets/keys

📞 Contact & Support
Somesh Pandey

📧 Email: sp5368@gmail.com

💼 GitHub: @somesh5368

📍 Lucknow, Uttar Pradesh, India

📂 Project Repository: https://github.com/<your-username>/WanderLust
🌐 Live App: https://wanderlustproject.onrender.com

📝 License
This project is built for educational and portfolio purposes.
Academic Project · 2026

<div align="center"> Built with ❤️ by <b>Somesh Pandey</b> <br /> ⭐ Star this repo if you find it helpful! </div> ```
