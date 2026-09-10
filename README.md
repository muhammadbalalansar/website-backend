
**MERN Stack AI Chatbot**

use for every website

**By Muhammad Balal Ansar (Cyber Security Expert)**


A secure and intelligent chatbot application inspired by ChatGPT. This project is built using the MERN stack (MongoDB, Express.js, React, Node.js) and integrates with the OpenAI API to provide conversational experiences.

Features
Persistent Conversations: User messages are stored in the database, allowing for retrieval and deletion of chat history.

Secure Authentication: Implements robust security practices including:

JWT (JSON Web Tokens) for authentication.

HTTP-Only and Signed Cookies to prevent XSS and CSRF attacks.

Password encryption.

Middleware chains for request validation.

AI Integration: Powered by OpenAI for intelligent responses.

Responsive UI: Designed for a smooth user interface.

Tech Stack
Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB (with Mongoose)

Authentication: JWT, Bcrypt, Cookie-Parser

AI Engine: OpenAI API

Getting Started
Prerequisites
Node.js (v18+)

MongoDB instance

OpenAI API Key

Installation
Clone the repository:

Bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
Install Dependencies:

Bash
cd backend
npm install

cd ../frontend
npm install
Environment Variables:
Create a .env file in the backend folder and add:

Code snippet
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
COOKIE_SECRET=your_cookie_secret
Run the Application:

Bash
cd backend
npm run dev

cd ../frontend
npm start
Contributing
Contributions are welcome. Please open an issue or submit a pull request if you have suggestions for improvement.

Security Note
This project utilizes signed cookies and protected middleware chains to ensure that user data remains private and secure.
prepared by Chaudhary Bilal
