# 📌 Firebase Real-Time Chat Application  

A simple **real-time chat app** built with **HTML, CSS, JavaScript, and Firebase**.  
The app allows users to **log in with email & password**, send messages, and see updates instantly thanks to **Firestore’s real-time database**.  

---

## 🚀 Features  
- 🔑 User authentication (Email/Password)  
- 💬 Real-time messaging using Firestore  
- 👤 Different styles for “self” vs “other” messages  
- 📱 Responsive UI (works on mobile & desktop)  
- ☁️ Hosted on Firebase Hosting (free tier)  

---

## 🛠️ Tech Stack  
- **Frontend**: HTML, CSS, JavaScript  
- **Backend (serverless)**: Firebase Firestore  
- **Authentication**: Firebase Auth (Email/Password)  
- **Hosting**: Firebase Hosting  

---

## 📂 Project Structure

chat-app/
├── index.html # Main page (Login + Chat UI)

├── style.css # Styles for login + chat UI

└── app.js # Firebase logic (Auth + Firestore)

---

## ⚙️ Setup Instructions  

## Firebase Setup
1. Go to Firebase Console.
2. Create a new project.
3. Add a Web App → copy your Firebase config.
4. Enable Authentication → Email/Password.
5. Enable Firestore Database → start in test mode.
6. Replace your Firebase config in app.js:
   const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);

## Run Locally

1. Open index.html in your browser.
2. Login using a test user you created in Firebase Console.
3. Start chatting! 🎉

## Deploy to Firebase Hosting

1. Install Firebase CLI:

npm install -g firebase-tools
- firebase login

## Initialize Hosting:

1. firebase init hosting
- Select your Firebase project
- Set public folder to . (current folder)
- Choose No for SPA (unless React)

## Deploy:

firebase deploy

---

## 📸 Screenshots

Login Page

Chat Window
(Add screenshots after running your app)

---

👨‍💻 Author

Developed by Ansari Mohd Taki during internship at Codec Technologies.
