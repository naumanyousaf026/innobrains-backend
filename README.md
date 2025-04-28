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

---

## 🛡️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/naumanyousaf026/innobrains-backend.git
cd innobrains-backend


2. Install Dependencies
npm install

3. Environment Variables
Create a .env file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string

4. Run the Server
npm start

📸 Image Uploads
Multer is used to upload images dynamically.

Images are stored inside separate categorized folders like:

blogImages/

serviceImages/

teamImages/

growthImages/

Easy to manage and scalable image structure.

✍️ Blog Writing Feature
Integrated a rich-text editor-like experience for blog creation.

Write blogs easily with real-time formatting and saving.

⚡ Important Points
.env file is NOT public (secured by .gitignore).

Code is modular and dynamic.

CRUD operations make it easy to update any section via Admin forms.

📄 License
This project currently does not have a license.
You can add an open-source license like MIT if needed in the future.


