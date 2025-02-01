
# 🚀 Course Selling Website - Backend  

A **Node.js** backend for a course-selling platform with **JWT-based authentication**, built using **Express.js** and **MongoDB**. This API provides separate endpoints for **users** and **admins**, ensuring secure access control.  

## 🌟 Features  
✅ **User & Admin Authentication** (JWT-based)  
✅ **Course Management** (Create, Read, Update, Delete)  
✅ **Role-Based Access Control** (Admins can manage courses)  
✅ **Secure API Endpoints**  
✅ **MongoDB Integration**  

## 🛠️ Tech Stack  
- **Node.js**  
- **Express.js**  
- **MongoDB (Mongoose)**  
- **JWT (JSON Web Tokens)**  

## 📌 API Endpoints  

### **Auth Routes**  
🔹 `POST /api/auth/register` - Register a new user  
🔹 `POST /api/auth/login` - Login and get JWT token  

### **User Routes**  
🔹 `GET /api/courses` - View available courses  
🔹 `POST /api/courses/enroll/:id` - Enroll in a course  

### **Admin Routes** (Requires Admin Token)  
🔹 `POST /api/admin/courses` - Add a new course  
🔹 `PUT /api/admin/courses/:id` - Update course details  
🔹 `DELETE /api/admin/courses/:id` - Delete a course  

## 🔧 Setup Instructions  

1️⃣ Clone this repository  
```bash
git clone https://github.com/your-username/course-selling-backend.git
cd course-selling-backend
```  

2️⃣ Install dependencies  
```bash
npm install
```  


4️⃣ Start the server  
```bash
npm start
```  

## 🔐 Authentication Flow  
1️⃣ Users & admins **register** and **log in** to get a JWT.  
2️⃣ The JWT is used for **protected routes** (passed in headers).  
3️⃣ Admins can **manage courses**, while users can **enroll** in courses.  

## 📌 Future Improvements  
🔹 Implement payment integration  
🔹 Add user profile management  
🔹 Enhance security with refresh tokens  

---
