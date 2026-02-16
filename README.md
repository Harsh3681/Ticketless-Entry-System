🎟️ Ticketless Entry System

A full-stack web application that enables secure, ticketless event entry using QR-based verification and real-time validation. Built with React and Firebase, the system eliminates physical tickets and provides seamless digital check-in management.

🚀 Live Demo

🔗 Live URL: (Add your deployed Firebase URL here)
📂 GitHub Repo: (Add repo link here)

📸 Screenshots

(You can add screenshots later like this)

/screenshots/login.png
/screenshots/dashboard.png
/screenshots/scan.png

Example format:

## 📸 Screenshots

### 🔐 Login Page

![Login](./screenshots/login.png)

### 📊 Admin Dashboard

![Dashboard](./screenshots/dashboard.png)
🛠 Tech Stack
Frontend

⚛️ React (Create React App)

🎨 Tailwind CSS

🔄 React Router

🔐 Firebase Authentication

Backend (BaaS)

🔥 Firebase

Firebase Auth

Firestore Database

Cloud Functions

Firebase Hosting

Firebase Storage

🧠 System Architecture
Client (React)
↓
Firebase Auth (User Authentication)
↓
Firestore (Event & Ticket Data)
↓
Cloud Functions (Validation Logic)
↓
Firebase Hosting (Deployment)

Frontend communicates directly with Firestore for real-time updates.

Cloud Functions handle secure validation logic.

Hosting serves optimized production build.

🎯 Core Features

👤 User authentication (Admin / Staff roles)

🎟️ Digital ticket creation & management

📷 QR-based entry verification

⚡ Real-time validation using Firestore

🔒 Secure backend validation via Cloud Functions

📊 Admin dashboard for event monitoring

🌐 Fully serverless architecture

⚙️ Local Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/ticketless-entry-system.git
cd ticketless-entry-system
2️⃣ Install Dependencies
npm install
3️⃣ Setup Environment Variables

Create a .env file:

REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

⚠️ Never commit .env to GitHub.

4️⃣ Run Development Server
npm start
🚀 Deployment

This project is deployed using:

🔥 Firebase Hosting

🔄 GitHub Actions CI/CD via GitHub

Build command:

npm run build
firebase deploy

With CI/CD enabled, deployment happens automatically on push to main.

🔐 Security Considerations

Firestore rules restrict unauthorized access

Role-based authentication enforced

Cloud Functions validate critical operations

Environment variables protected via .env

📂 Project Structure
ticketless-entry-system/
├── public/
├── src/
├── functions/
├── firebase.json
├── firestore.rules
├── firestore.indexes.json
├── package.json
├── tailwind.config.js
└── README.md
🏆 Key Technical Highlights

Serverless full-stack architecture

Real-time database synchronization

Secure cloud-based validation

CI/CD automated deployment

Scalable infrastructure via Firebase

📌 Future Improvements

Multi-event management

Analytics dashboard

Offline scan support

QR generation enhancements

Role-based fine-grained access control

📄 License

MIT License (or specify your preferred license)
