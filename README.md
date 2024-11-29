# assignment

## **Description**

This assignment implements core functionalities including user authentication, password reset, and role-based access control. The project is built using Node.js, Express.js, and MongoDB.

## **Features**

-Users can register and log in with secure authentication
-Role-based access control for Admins,Moderators and User

#### Admin Routes:

- **getalluserlist-admin-only**
- **getuniqueuserbyid**
- **update-user-role-admin-only**
- **deleteuseronlybyadmin**

#### User Routes:

- **Get user profile-user-only**
- **Update user profile-user-only (name and password)**

#### Moderator Routes:

- **moderators can reset password of any user**

## **Technologies Used**

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## **Installation Instructions**

- Clone the repository: git clone https://github.com/nadeemahmed12/assignment.git

- Navigate to the project directory:
  -cd assignment

- Install dependencies
  -npm install

- Start The Server
  -npx nodemon server.js

## **Environment variable**

PORT=3000
MONGO_URL = mongodb://localhost:27017/assignment
JWT_SECRET=mysecretvalue
