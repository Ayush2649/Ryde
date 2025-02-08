# 🚖 Ryde - Uber-Like Ride Booking System

## 📌 Overview
Ryde is a fully functional Uber-like ride booking system built using the **MERN (MongoDB, Express.js, React.js, Node.js) stack**, featuring web services, microservices, and **Google Maps API** for real-time location tracking. The system enables users to book rides, track drivers, and make payments, providing a seamless experience similar to Uber.

## ✨ Features
- **User Authentication** (JWT-based login/signup for passengers & drivers)
- **Real-time Ride Booking** (Book, accept, and track rides)
- **Google Maps Integration** (Live tracking and route optimization)
- **Microservices Architecture** (Decoupled services for scalability)
- **WebSocket for Real-time Updates** (Driver availability, ride status, notifications)
- **MongoDB Database** (Efficient data storage & retrieval)
- **Payment Gateway Integration** (For seamless transactions)
- **Admin Dashboard** (Monitor rides, users, and earnings)

## 🛠️ Tech Stack
- **Frontend:** React.js, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Real-time Communication:** WebSocket (Socket.io)
- **APIs:** Google Maps API (for geolocation & route optimization)
- **Authentication:** JSON Web Token (JWT)
- **Microservices:** Separate services for user management, rides, payments

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (Latest LTS)
- **MongoDB** (Locally or Cloud-based)
- **Google Maps API Key**

### Installation
1. **Clone the Repository**
   ```sh
   git clone https://github.com/Ayush2649/Ryde.git
   cd Ryde
   ```

2. **Backend Setup**
   ```sh
   cd backend
   npm install
   cp .env.example .env  # Configure environment variables
   npm start
   ```

3. **Frontend Setup**
   ```sh
   cd ../frontend
   npm install
   npm start
   ```

4. **Run MongoDB**
   ```sh
   mongod
   ```

5. **Access the Application**
   Open `http://localhost:3000` in your browser.

## 📷 Screenshots
![Screenshot (140)](https://github.com/user-attachments/assets/b84fb4f1-a622-4e4f-8e73-9fc94c971239)
![Screenshot (141)](https://github.com/user-attachments/assets/89128ae0-9c5e-43f0-8227-21d50c255130)
![Screenshot (142)](https://github.com/user-attachments/assets/97ea8477-7516-4e63-a18c-19f3770fde73)
![Screenshot (143)](https://github.com/user-attachments/assets/94e93f5b-4fb8-4871-a611-3706e670faf3)

## 📌 API Endpoints
| Method | Endpoint | Description |
|--------|-------------|-------------|
| POST | `/api/auth/register` | Register new users |
| POST | `/api/auth/login` | Login users |
| POST | `/api/rides/book` | Book a ride |
| GET | `/api/rides/:id` | Get ride details |
| POST | `/api/payments` | Process payment |

*(Include a more detailed API reference if needed)*

## 🔗 Contributing
Contributions are welcome! If you find a bug or have an enhancement request, feel free to open an issue or submit a pull request.

---

**🚀 Made with ❤️ by [Ayush Sahu](https://github.com/Ayush2649)**
