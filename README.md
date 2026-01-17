🧭 WanderLust – Travel Stay Platform (Airbnb Clone)
Connect. Discover. Stay.
WanderLust is a modern full‑stack travel accommodation platform inspired by Airbnb, where users can browse, list, and manage stays worldwide with a smooth, responsive UI.

🟢 All core features are live, stable, and running in production.

🌐 Live Application
Service	URL	Status
🏡 Main App	https://wanderlustproject.onrender.com	✅ Live
📦 API Server	https://wanderlustproject.onrender.com (same Express backend)	✅ Live
⚠️ Note: Backend is hosted on Render free tier – the first request may take 30–60 seconds due to cold‑start.

👨‍💻 Developer
Member	Responsibility	Status
Somesh Pandey	Full‑stack Development & Deployment	✅ Complete
📍 Location: Lucknow, Uttar Pradesh, India

🎓 Education: Apna College – Delta Batch (MERN Stack)

📦 Project Overview
WanderLust is a MERN‑based travel listing application that allows users to:

🔍 Browse and search stays by category, price, and location

🏠 View detailed listing pages with photos, maps, and reviews

✏️ Create, edit, and delete their own listings

⭐ Add reviews and manage favorites

🔐 Securely authenticate and manage user accounts

🎨 Frontend
Stack: EJS, Bootstrap 5, Vanilla JS, Mapbox, Font Awesome

Goal: A clean, Airbnb‑inspired UI that works beautifully on both mobile and desktop.

UI Highlights
✅ Fully responsive navbar with search, filters, and mobile drawer‑style menu

✅ Category filters with smooth horizontal scroll on mobile

✅ Listing cards with image, price, and heart‑icon favorites

✅ Detailed listing pages with map, reviews, and host/location details

✅ Modern Login/Signup pages with card layout & client‑side validation

✅ Global flash messages for success and error states

⚙️ Backend
Stack: Node.js, Express, MongoDB, Mongoose, Passport / JWT, Cloudinary, Mapbox

Goal: Secure, scalable backend powering server‑side rendered pages and REST APIs.

Backend Features
🔐 User auth: register, login, logout, protected routes

🏠 Listing management: create, update, delete listings (only by owner)

📝 Review system: add/delete reviews per listing

❤️ Favorites system: per‑user favorites with toggle API

☁️ Cloudinary integration: secure image upload & storage

🗺️ Mapbox integration: geocoding + interactive maps on listing pages

🧯 Strong validation & error handling throughout the stack

🚀 Quick Start (Local Setup)
✅ Prerequisites
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
# agar frontend build step alag hai, yahan mention karein
3️⃣ Environment Variables
Project root mein .env file banayein:

text
PORT=8080
ATLASDB_URL=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

MAPBOX_TOKEN=your_mapbox_token
SESSION_SECRET=your_session_secret
🔒 Security Tip: .env file kabhi commit na karein. Render / deployment platform par env vars configure karein.

4️⃣ Run the App
bash
npm start
# ya
# nodemon app.js
Local dev URL: http://localhost:8080

🔧 Tech Stack
Layer	Technology
Frontend	EJS, Bootstrap 5, Vanilla JS, Mapbox GL JS
Backend	Node.js, Express.js
Database	MongoDB Atlas (Mongoose ODM)
Auth	Passport / JWT (username‑password with hashing)
Storage	Cloudinary (listing images)
Deploy	Render (Express app + static assets)
Utilities	Joi, Multer, dotenv, connect‑flash, express‑session, method‑override, etc.
(Is table me sirf wahi packages rakho jo tum actually use kar rahe ho.)

🔌 Main Features
👤 Authentication & Users
Register, login, logout

Password hashing and secure session handling

Helpful flash messages for login/signup errors

🏠 Listings
Create, edit, delete listings (owner‑only operations)

Upload listing images via Cloudinary

Category‑based filters (Trending, Rooms, Mountains, Castles, etc.)

Optional “show GST” toggle to display price with tax

❤️ Favorites & Reviews
Per‑user heart‑icon favorites

Dedicated favorites page for quick access

Add/delete reviews on listing detail page

🗺️ Maps & Location
Interactive Mapbox map on listing show page

Geocoding from location string → coordinates

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
└── .env           # local only
🌳 Git Workflow (Suggested)
main → Production branch (deployed to Render)

feature/* → Feature branches

Commit conventions:

feat: new feature

fix: bug fix

style: UI / CSS / formatting

refactor: internal code changes

docs: README / docs updates

🔒 Security Highlights
🔑 Password hashing (e.g. bcrypt)

✅ Input validation (Joi / custom middlewares)

🔐 Secure sessions & cookie config

🖼️ File upload type & size validation (images only)

🧾 Sensitive values stored in environment variables, not in code

📞 Contact & Support
Somesh Pandey

📧 Email: spandey5368@gmail.com

💼 GitHub: @somesh5368

📍 Lucknow, Uttar Pradesh, India

🗂️ Project Repository: https://github.com/somesh5368/WanderLust

🌐 Live App: https://wanderlustproject.onrender.com
