# Innobrains Backend

Welcome to the backend of **Innobrains**, a dynamic and scalable backend application built with **Node.js**, **Express.js**, and **MongoDB**.

---

## 🚀 Project Features

- Fully dynamic CRUD operations (Create, Read, Update, Delete)
- Admin panel with middleware-based protection
- Direct route-based logic (no separate controllers)
- Image upload functionality using **Multer** (Separate folders for each type: blogs, services, teams, growth images, etc.)
- Blogs editor functionality (rich text formatting experience)
- All sections dynamically manageable via form submissions
- MongoDB database integration
- Environment variables (`.env`) secured and hidden from public
- Clean and modular project structure

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose ODM)
- **Multer** (File uploads)
- **Dotenv** (Environment management)

---

## 🗂️ Project Structure Overview

innobrains-backend/ ├── config/ ├── images/ │ ├── blogImages/ │ ├── serviceImages/ │ ├── teamImages/ │ ├── growthImages/ ├── models/ ├── routes/ ├── uploads/ ├── .env (secured) ├── .gitignore ├── package.json ├── README.md ├── server.js