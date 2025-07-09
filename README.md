# 🏥 VitalPulse - Hospital Management System (Backend)

This is the **backend API** for the **VitalPulse Hospital Management System**, a robust and scalable healthcare platform designed to manage patients, doctors, appointments, and admin functionalities.

The backend is built with **Node.js**, **Express**, and **MongoDB**, using secure authentication (JWT) and file uploads via **Cloudinary**.

---

## 🔧 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt
- **File Uploads**: Cloudinary
- **Environment Management**: dotenv
- **CORS, Cookie Management**: cors, cookie-parser
## 🚀 Features

### 👨‍⚕️ Doctors
- Register/Login
- View assigned appointments
- Update appointment status
- Manage availability

### 🧑‍💼 Admin
- Manage doctors & patients
- View system-wide appointments
- Role-based access control

### 🧑 Patients
- Register/Login
- Book appointments
- View appointment history
- Profile management

### 🔐 Authentication
- JWT token-based secure authentication
- Password encryption with bcrypt
- Role-based authorization

---

## 🔐 API Routes

### Auth Routes
POST /api/v1/auth/register # Register patient
POST /api/v1/auth/login # Login
GET /api/v1/user/patient/me # Get current patient info
GET /api/v1/user/doctor/me # Get current doctor info
GET /api/v1/user/admin/me # Get current admin info


### Appointment Routes
POST /api/v1/appointment/book # Book new appointment
GET /api/v1/appointment/mine # Patient: view own appointments
GET /api/v1/appointment/doctor # Doctor: view assigned appointments
PATCH /api/v1/appointment/:id # Update appointment status


### Admin Routes
POST /api/v1/admin/doctor # Add new doctor
GET /api/v1/admin/doctors # Get all doctors
GET /api/v1/admin/patients # Get all patients
DELETE /api/v1/admin/user/:id # Delete user

