# Full-Stack Auth System with Google reCAPTCHA

This is a full-stack authentication system built using **Node.js**, **Express**, **EJS**, and **PostgreSQL**. It supports user registration, login with **Google reCAPTCHA**, JWT-based session management, protected profile access, and logout.

---

## 🔧 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL (raw SQL queries)  
- **Templating Engine:** EJS  
- **Security:** bcrypt, JWT, Google reCAPTCHA v2  
- **Validation:** Client-side and Server-side  
- **Environment Management:** dotenv  

---

## ✨ Features

- ✅ User registration with input validation  
- ✅ Passwords hashed using bcrypt  
- ✅ Login with Google reCAPTCHA (v2 Checkbox)  
- ✅ JWT token authentication (15-minute expiry)  
- ✅ Protected Profile route  
- ✅ Logout with token invalidation  
- ✅ Minimal EJS-based frontend  

---

## 🗂️ Project Structure

auth-system/
├── server.js
├── .env
├── package.json
├── views/
│ ├── login.ejs
│ ├── register.ejs
│ └── profile.ejs
└── src/
├── config/
│ └── db.js
├── controllers/
│ └── authController.js
├── middleware/
│ └── auth.js
├── models/
│ └── user.js
└── routes/
└── authRoutes.js

## Getting Started
1. Clone the repository
2. Install Dependencies
3. Add the .env file attached in the mail
4. Start the server using the command "npm run start"
5. Visit http://localhost:3000 to start using the app.
