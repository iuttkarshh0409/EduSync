# EduSync 📚📅  
**A Mobile Application for Lecture Schedule Updates**  

## 📖 About  
EduSync is a **React Native** mobile application designed to help students stay updated with their lecture schedules effortlessly. The app provides real-time schedule updates, ensuring users never miss a class.  

## 🚀 Features  
✅ **User Authentication** – Secure login and registration.  
✅ **Lecture Timetable** – View upcoming and past lectures in an organized format.  
✅ **Notifications** – Get reminders for upcoming classes.  
✅ **Course Management** – Add, update, and remove courses.  
✅ **Offline Access** – View schedules even without an internet connection.  

## 🛠️ Tech Stack  
- **Frontend**: React Native  
- **Backend**: Node.js (Express.js)  
- **Database**: MySQL  

## 🏗️ Installation & Setup  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/iuttkarshh0409/EduSync.git
cd EduSync
2️⃣ Install Dependencies
Frontend (React Native)
sh

Collapse

Wrap

Copy
cd EduSync-frontend
npm install
Backend (Node.js & Express.js)
sh

Collapse

Wrap

Copy
cd EduSync-backend
npm install
3️⃣ Configure the Database
Set up a MySQL database.
Update the database credentials in the .env file inside the backend directory (EduSync-backend/).
env

Collapse

Wrap

Copy
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Raam@12345
DB_NAME=edusync
JWT_SECRET=Jtrpd2937J@Pan
Update DB_PASSWORD and JWT_SECRET with secure values.
Run the following SQL to create the users table:
sql

Collapse

Wrap

Copy
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'professor') NOT NULL
);
4️⃣ Run the Application
Start Backend
sh

Collapse

Wrap

Copy
cd EduSync-backend
npm start
The server will run on http://localhost:5000. Use a tool like Postman or curl to test the APIs (see below).
Start Frontend
sh

Collapse

Wrap

Copy
cd EduSync-frontend
npx react-native run-android   # For Android  
npx react-native run-ios       # For iOS (Mac only)  
📜 API Documentation
Base URL
http://localhost:5000

Endpoints
1. Register a New User
Method: POST
URL: /api/auth/signup
Body:
json

Collapse

Wrap

Copy
{
  "name": "TestUser",
  "email": "test@example.com",
  "password": "123456",
  "role": "student"
}
Response (Success - 201):
json

Collapse

Wrap

Copy
{
  "message": "User registered successfully",
  "token": "<jwt_token>"
}
Response (Error - 400):
json

Collapse

Wrap

Copy
{
  "errors": [{ "msg": "Invalid input" }]
}
2. User Login
Method: POST
URL: /api/auth/login
Body:
json

Collapse

Wrap

Copy
{
  "email": "test@example.com",
  "password": "123456"
}
Response (Success - 200):
json

Collapse

Wrap

Copy
{
  "message": "Login successful",
  "token": "<jwt_token>"
}
Response (Error - 400):
json

Collapse

Wrap

Copy
{
  "error": "Invalid credentials"
}
3. Student Dashboard
Method: GET
URL: /api/auth/student-dashboard
Headers:
Authorization: Bearer <jwt_token>
Response (Success - 200):
json

Collapse

Wrap

Copy
{
  "message": "Welcome Student TestUser!"
}
Response (Error - 403):
json

Collapse

Wrap

Copy
{
  "message": "Access denied: Only students allowed"
}
4. Professor Dashboard
Method: GET
URL: /api/auth/professor-dashboard
Headers:
Authorization: Bearer <jwt_token>
Response (Success - 200):
json

Collapse

Wrap

Copy
{
  "message": "Welcome Professor TestUser!"
}
Response (Error - 403):
json

Collapse

Wrap

Copy
{
  "message": "Access denied: Only professors allowed"
}
5. Update User Details
Method: PUT
URL: /api/auth/update-user
Headers:
Authorization: Bearer <jwt_token>
Body: (At least one field must be provided)
json

Collapse

Wrap

Copy
{
  "name": "UpdatedUser",
  "email": "updated@example.com",
  "password": "newpassword123"
}
Response (Success - 200):
json

Collapse

Wrap

Copy
{
  "message": "User updated successfully"
}
Response (Error - 400):
json

Collapse

Wrap

Copy
{
  "errors": [{ "msg": "Valid email is required" }]
}
Response (Error - 401):
json

Collapse

Wrap

Copy
{
  "message": "Invalid token"
}
6. Delete User Account
Method: DELETE
URL: /api/auth/delete-user
Headers:
Authorization: Bearer <jwt_token>
Body: None
Response (Success - 200):
json

Collapse

Wrap

Copy
{
  "message": "User deleted successfully"
}
Response (Error - 401):
json

Collapse

Wrap

Copy
{
  "message": "Invalid token"
}
7. Health Check
Method: GET
URL: /
Response (Success - 200):
text

Collapse

Wrap

Copy
EduSync Backend is Running!
🎨 Screenshots
_______________________*

🤝 Contributing
We welcome contributions! To contribute:

Fork the repo
Create a new branch (feature-xyz)
Commit changes
Push to your fork
Open a Pull Request
📝 License
This project is licensed under the MIT License.

📩 Contact
For any queries, feel free to reach out:

📧 Email: dubeyutkarsh101@gmail.com

🔗 GitHub: Utkarsh's a/c
