# MediCheck

MediCheck is a modern, full-stack healthcare management platform designed to streamline hospital operations and enhance patient care. The project features a robust backend API and a responsive frontend, enabling seamless interaction between hospitals, patients, and administrators.

## Features

### For Patients
- **User Registration & Login:** Secure authentication and easy onboarding.
- **Dashboard:** View health data, appointments, and medication schedules.
- **Bluetooth Health Device Integration:** Connect and sync health data from supported devices.
- **Appointment Booking:** Schedule, view, and manage appointments with hospitals.
- **Notifications:** Receive reminders for appointments and medications.

### For Hospitals
- **Hospital Dashboard:** Manage appointments, view patient data, and monitor statistics.
- **Profile Management:** Update hospital information and facilities.
- **Patient Management:** Access and update patient records securely.

### For Admins
- **Admin Panel:** Manage users, hospitals, and oversee platform activity.

## Tech Stack

- **Frontend:** React, Vite, Framer Motion, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT-based authentication
- **Bluetooth Integration:** Web Bluetooth API (for health data sync)

## Project Structure

```
MediCheck/
├── Client/           # Frontend React app
│   ├── src/
│   │   ├── Components/      # Reusable UI components
│   │   ├── Pages/           # App pages (User, Hospital, Landing, etc.)
│   │   ├── context/         # React context for global state
│   │   ├── hooks/           # Custom React hooks
│   │   └── utils/           # Utility functions
│   └── public/              # Static assets
├── Server/           # Backend Node.js API
│   ├── controllers/         # Route controllers
│   ├── db/                  # Database connection
│   ├── middleware/          # Express middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   └── services/            # Business logic
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Setup

#### 1. Clone the repository
```sh
git clone https://github.com/yourusername/MediCheck.git
cd MediCheck
```

#### 2. Install dependencies
- **Backend:**
  ```sh
  cd Server
  npm install
  ```
- **Frontend:**
  ```sh
  cd ../Client
  npm install
  ```

#### 3. Configure Environment Variables
- Create a `.env` file in the `Server` directory with your MongoDB URI and JWT secret:
  ```env
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  ```
- In `Client`, set the API URL in `.env`:
  ```env
  VITE_API_URL=http://localhost:5000
  ```

#### 4. Run the Application
- **Backend:**
  ```sh
  cd Server
  npm start
  ```
- **Frontend:**
  ```sh
  cd Client
  npm run dev
  ```

Visit `http://localhost:5173` to access the frontend.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.

---

**MediCheck** – Empowering healthcare with technology.
