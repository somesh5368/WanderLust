🧭 WanderLust – Travel Stay Platform (Airbnb Clone)
Connect. Discover. Stay. WanderLust is a full‑stack travel accommodation platform inspired by Airbnb, where users can browse, list, and manage stays across the globe.

🟢 All features are live, stable, and deployed in production.

🌐 Live Application
Service	URL	Status
🏡 Main App	https://wanderlustproject.onrender.com	✅ Live
📦 API Server	https://wanderlustproject.onrender.com (same Express backend)	✅ Live
⚠️ Note: Backend is hosted on Render free tier – first request may take 30–60 seconds cold‑start time.

👨‍💻 Developer
Member	Responsibility	Status
Somesh Pandey	Full‑stack Development & Deployment	✅ Complete
📍 Location: Lucknow, Uttar Pradesh, India

🎓 Education: Apna College Delta Batch (MERN Stack)

📦 Project Overview
WanderLust is a MERN‑based travel listing application that lets users:

Browse and search stays by category, price, and location

View detailed listing pages with photos, maps, and reviews

Create, edit, and delete their own listings

Add reviews and manage favorites

Securely authenticate and manage accounts

🎨 Frontend
Stack: EJS, Bootstrap 5, Vanilla JS, Mapbox, Font Awesome

Purpose: Clean, responsive UI inspired by Airbnb, optimized for mobile and desktop.

Key UI Features
Fully responsive navbar with search, filters, and mobile drawer menu

Category filters with horizontal scroll (mobile friendly)

Listing cards with price, image, and favorite (heart) support

Detailed listing pages with map, reviews, and host info

Auth pages (Login/Signup) with modern card design and validation

Flash messages for success/error states

⚙️ Backend
Stack: Node.js, Express, MongoDB, Mongoose, Passport / JWT (as per your implementation), Cloudinary, Mapbox

Purpose: Secure RESTful API + server‑side rendered pages.

Key Backend Features
User authentication (register, login, logout)

Protected routes for creating/editing/deleting listings

Review system (create/delete reviews)

Favorites system with toggle API

Cloudinary integration for image upload

Mapbox for geocoding and interactive maps

Robust validation and error handling

🚀 Quick Start (Local Setup)
Prerequisites
Node.js 16+

MongoDB (local or Atlas)

Cloudinary account

Mapbox account

1️⃣ Clone Repository
bash
git clone https://github.com/<your-username>/WanderLust.git
cd WanderLust
2️⃣ Install Dependencies
bash
npm install
(If you separated frontend assets via another build step, add that here.)

3️⃣ Environment Variables
Create a .env file in the project root:

text
PORT=8080
ATLASDB_URL=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

MAPBOX_TOKEN=your_mapbox_token
SESSION_SECRET=your_session_secret
🔒 Security: Never commit .env files. Configure environment variables directly on Render.

4️⃣ Run the App
bash
npm start
# or if you use nodemon:
# nodemon app.js
Local URL: http://localhost:8080

🔧 Tech Stack
Layer	Technology
Frontend	EJS, Bootstrap 5, Vanilla JS, Mapbox GL JS
Backend	Node.js, Express.js
Database	MongoDB Atlas (Mongoose ODM)
Auth	Passport / JWT (username‑password with hashing)
Storage	Cloudinary (listing images)
Deployment	Render (full Express app)
Utilities	Joi, Multer, dotenv, connect‑flash, express‑session, method‑override, etc.
(List exactly those packages you’re using.)

🔌 Main Features
Authentication & Users
Register, login, logout

Password hashing and secure sessions

Flash messages for login/signup errors

Listings
Create, edit, delete listings

Upload images to Cloudinary

Category‑based filtering (Trending, Rooms, Mountains, etc.)

Price display with optional show GST toggle

Favorites & Reviews
Heart‑icon favorites per user

Favorites page with quick listing access

Add/delete reviews on listings

Maps & Location
Mapbox map on listing show page

Geocoding of location to coordinates

📁 Project Structure (Example)
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
└── .env (local only)
🌳 Git Workflow (Suggested)
main → Production branch (deployed to Render)

feature/* → New features and enhancements

Commit prefixes:

feat: new feature

fix: bug fix

style: UI / CSS only

refactor: code improvements

docs: README / documentation

🔒 Security Highlights
Password hashing (e.g., bcrypt)

Input validation with Joi / custom validation

Session security and cookie configuration

File upload type and size validation (for images)

Environment variables for secrets and keys

📞 Contact & Support
Somesh Pandey

📧 Email: sp5368@gmail.com

💼 GitHub: @somesh5368

📍 Lucknow, Uttar Pradesh, India

Project Repository: https://github.com/<your-username>/WanderLust
Live App: https://wanderlustproject.onrender.com

📝 License
This project is for educational and portfolio purposes.
Academic Project | 2026

<div align="center"> Built with ❤️ by Somesh Pandey <br/> ⭐ Star this repo if you find it helpful! </div>
