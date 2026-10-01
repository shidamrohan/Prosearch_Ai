# ProSearch 🛍️

ProSearch is an advanced, smart product search and comparison web application. It allows users to find the best deals for any product across the web by analyzing top e-commerce platforms. ProSearch intelligently ranks items based on a proprietary value algorithm (price vs. rating) to ensure you always find the highest quality products at the lowest prices.

## Features ✨
- **Text Search:** Quickly search for any product name or keyword.
- **Image/Camera Search:** Snap a photo or upload an image to find products visually *(simulated via API)*.
- **Link Parsing:** Paste a product URL from anywhere (TikTok, Instagram) to find alternative sellers.
- **Value Ranking Engine:** Automatically sorts products to prioritize the best balance of high reviews and low prices.
- **User Authentication:** Secure JWT-based Login and Registration.
- **Premium UI:** A stunning, modern glass-morphism interface built with Tailwind CSS.

## Tech Stack 🛠️
- **Frontend:** React, Vite, Tailwind CSS v4, React Router, Lucide Icons.
- **Backend:** Node.js, Express.js.
- **Database:** PostgreSQL (with `pg` pooling).
- **Security:** `bcryptjs` for password hashing, `jsonwebtoken` for secure session management.

---

## 🚀 Quick Start (Windows)

The easiest way to start the application is by using the provided batch launcher.

1. Ensure **Node.js** and **PostgreSQL** are installed and running on your machine.
2. Open the `backend/.env` file and add your local PostgreSQL credentials (see Environment Setup below).
3. Open your terminal in the `backend` folder and run `npm run init-db` to generate the database tables.
4. **Double-click `run.bat`** in the root directory. 
   - *This will automatically install any missing dependencies and start both the frontend and backend servers in new windows!*

---

## 💻 Manual Installation

If you prefer to start the servers manually, follow these steps:

### 1. Database & Environment Setup
Navigate to the `backend` directory and configure your environment variables:
```bash
cd backend
cp .env.example .env
```
Edit the `.env` file with your PostgreSQL details:
```env
PORT=5000
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=prosearch_db
JWT_SECRET=your_secure_random_string
```
Make sure you have created a database named `prosearch_db` in pgAdmin. Then, initialize the tables:
```bash
npm run init-db
```

### 2. Start the Backend
```bash
npm install
npm run dev
```
*The backend will run on `http://localhost:5000`*

### 3. Start the Frontend
In a new terminal window, navigate to the frontend folder:
```bash
cd frontend
npm install
npm run dev
```
*The frontend will run on `http://localhost:5173`*

---

## 📝 Future Roadmap
- [ ] Connect Live Product APIs (e.g., Rainforest API, BestBuy API).
- [ ] Integrate Google Cloud Vision for live camera object detection.
- [ ] Implement User Dashboard for saving favorite items and viewing search history.


