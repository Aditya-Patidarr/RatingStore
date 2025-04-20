# RatingStore

A full-stack web application that allows users to rate stores, view analytics, and manage roles based on access levels.

## 📌 Tech Stack

- **Backend:** Express.js  
- **Database:** MySQL  
- **Frontend:** React.js, Material UI 

---

## 🚀 Features

### ✅ Common Features
- Secure single login system with role-based access
- Role-based dashboards and functionalities
- Proper form validations and responsive design

---

## 👥 User Roles & Functionalities

### 🔒 System Administrator
- Add new stores, normal users, and admin users
- Dashboard with:
  - Total users
  - Total stores
  - Total submitted ratings
- User management:
  - Add users (Name, Email, Address, Password)
  - View user list with filters (Name, Email, Address, Role)
  - View all user details
    - If Store Owner: Show rating
- Store management:
  - View list with store details (Name, Email, Address, Rating)
- Logout functionality

---

### 👤 Normal User
- Signup & Login
- Signup form:
  - Name
  - Email
  - Address
  - Password
- Post-login:
  - Update password
  - View & search store listings (by Name, Address)
  - Submit and edit ratings (1 to 5)
  - View:
    - Store name
    - Address
    - Overall rating
    - Their own submitted rating
- Logout functionality

---

### 🧑‍💼 Store Owner
- Login & password update
- Dashboard with:
  - List of users who rated their store
  - Average store rating
- Logout functionality

---

## 🛠️ Form Validations

| Field     | Rules |
|-----------|-------|
| **Name**      | Minimum 20 characters, Maximum 60 characters |
| **Address**   | Maximum 400 characters |
| **Password**  | 8–16 characters, must include 1 uppercase & 1 special character |
| **Email**     | Valid email format |

---

## 📊 Additional Features
- All tables support sorting (ascending/descending) for key fields (Name, Email, etc.)
- Clean database schema following best practices
- Structured, modular code following full-stack development standards

---

## 📦 How to Run the Project

1. **Clone the repo:**

   ```bash
   git clone https://github.com/Aditya-Patidarr/RatingStore.git
