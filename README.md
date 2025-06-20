# AayanOnTech - Backend API

This is the backend server for the **AayanOnTech Full Stack Portfolio Website**, built using **Node.js, Express, and MongoDB**. It provides a RESTful API for managing all content of the portfolio including projects, services, skills, testimonials, and more via a secure admin panel.

## 📦 Features

- JWT-based Authentication & Authorization
- RESTful APIs for all website sections
- File uploads using Multer
- MongoDB as the database (via Mongoose)
- Admin-only protected routes
- Contact form submissions handling
- Notification API and user message management

## 🧱 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (JSON Web Tokens)
- **File Uploads**: Multer
- **Environment Management**: dotenv

---

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yogesh087/Aayan-server.git
```

2. Install dependencies:

```bash
cd your-folder
npm install
```
3.Add Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=5000
COMPASS_URL=your_mongodb_connection_string_for_compass
ATLAS_URL=your_mongodb_connection_string_for_atlas
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
MAIN_URL=http://localhost:5000
SENDER_EMAIL=your_sender_email_address
SENDER_EMAIL_PASSWORD=your_sender_email_password
ADMIN_EMAIL=admin_email_for_notifications

4. Start the development server:

```bash
npm run dev
```
