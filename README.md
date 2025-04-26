# MediCheck - Smart Health Monitoring System

MediCheck is a comprehensive healthcare management platform that connects patients with healthcare providers while enabling real-time health monitoring through smartwatch integration.

## Features

### For Patients

- **Real-time Health Monitoring**

  - Heart rate tracking
  - Blood pressure monitoring
  - Oxygen level measurement
  - Step counting
  - Sleep tracking
  - Smart device integration with various wearables (Apple Watch, Samsung Galaxy Watch, Fitbit, etc.)

- **Appointment Management**

  - Schedule appointments with specialists
  - Real-time booking confirmation
  - Multiple specialties supported (Cardiology, Dermatology, ENT, etc.)
  - View and manage upcoming appointments
  - Appointment history tracking

- **Health Dashboard**
  - Personalized health metrics display
  - Health goals tracking and management
  - Medical history records
  - Medication management
  - AI-powered health insights

### For Hospitals

- **Patient Management**

  - Real-time patient monitoring
  - Patient records management
  - Status tracking (Critical, Stable, Under Observation, etc.)
  - Medical history documentation

- **Facility Management**

  - Track bed availability
  - Monitor ICU occupancy
  - Emergency response system
  - Resource allocation tracking

- **Appointment System**
  - Accept/reject appointment requests
  - View daily schedules
  - Manage doctor availability
  - Automated time slot management

## Technology Stack

### Frontend

- React.js
- Tailwind CSS
- Framer Motion
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Project Structure

```
MediCheck/
├── Client/                 # Frontend application
│   ├── src/
│   │   ├── assets/        # Static assets
│   │   ├── Components/    # Reusable components
│   │   ├── context/       # Context providers
│   │   ├── hooks/         # Custom hooks
│   │   ├── Pages/        # Page components
│   │   └── utils/        # Utility functions
│   └── public/           # Public assets
│
└── Server/               # Backend application
    ├── controllers/     # Request handlers
    ├── models/         # Database models
    ├── routes/         # API routes
    ├── services/       # Business logic
    └── middleware/     # Custom middleware
```

## Live Demo

👉 [Access MediCheck Live](https://your-demo-link.com)

**Hospital Demo Login Credentials**

- **Email:** hospital_demo@medicheck.com
- **Password:** Hospital@123

## Features in Detail

### Health Monitoring

- Bluetooth connectivity for real-time health data
- Customizable health goals
- Progress tracking and visualization
- Automated health reports generation

### Medical Records

- Secure storage of medical history
- Digital prescription management
- Test results tracking
- Document upload functionality

### Hospital Dashboard

- Real-time statistics
- Patient monitoring system
- Resource management
- Emergency response coordination

## Getting Started

1. Clone the repository
2. Install dependencies for both client and server:
   ```bash
   cd Client && npm install
   cd ../Server && npm install
   ```
3. Set up environment variables
4. Start the development servers:

   ```bash
   # In Client directory
   npm run dev

   # In Server directory
   npm run dev
   ```

## Security

- End-to-end encryption for sensitive data
- HIPAA compliance measures
- Secure authentication system
- Role-based access control
