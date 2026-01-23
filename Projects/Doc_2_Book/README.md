# Doc2Book - Doctor-Patient Appointment System

A full-stack appointment booking system with geospatial distance calculation, featuring a shared Node.js backend, React Native mobile app for patients, and React.js web dashboard for doctors.

## 🏗️ Architecture

### Backend (Node.js + Express + MongoDB)
- RESTful API with Express.js
- MongoDB with Mongoose ODM
- Geospatial queries using 2dsphere indexing
- JWT authentication
- Appointment status state machine

### Patient Mobile App (React Native + Expo)
- Cross-platform (iOS & Android)
- Location-based doctor search
- Real-time distance calculation
- Multi-step registration
- Appointment booking and tracking

### Doctor Web Dashboard (React.js + Vite + Material-UI)
- Responsive web interface
- Appointment queue management
- Patient background information display
- Approve/Reject/Postpone actions
- Status filtering

## 📁 Project Structure

```
Doc_2_Book/
├── backend/                    # Node.js Backend
│   ├── models/                 # Mongoose schemas
│   │   ├── Doctor.js          # Doctor model with geospatial index
│   │   ├── Patient.js         # Patient model
│   │   └── Appointment.js     # Appointment model
│   ├── routes/                # API routes
│   │   ├── authRoutes.js      # Authentication endpoints
│   │   ├── doctorRoutes.js    # Doctor endpoints
│   │   └── appointmentRoutes.js # Appointment endpoints
│   ├── server.js              # Main server file
│   ├── .env                   # Environment variables
│   └── package.json
│
├── patient-app/               # React Native Patient App
│   ├── src/
│   │   ├── api/               # API configuration
│   │   ├── context/           # Auth context
│   │   ├── screens/           # App screens
│   │   │   ├── LoginScreen.js
│   │   │   ├── RegistrationScreen.js
│   │   │   ├── HomeScreen.js
│   │   │   ├── BookingScreen.js
│   │   │   └── MyBookingsScreen.js
│   │   └── components/        # Reusable components
│   ├── App.js
│   ├── app.json               # Expo configuration
│   └── package.json
│
└── doctor-dashboard/          # React.js Doctor Dashboard
    ├── src/
    │   ├── api/               # API configuration
    │   ├── context/           # Auth context
    │   ├── pages/             # Dashboard pages
    │   │   ├── LoginPage.jsx
    │   │   └── DashboardPage.jsx
    │   ├── components/        # Reusable components
    │   │   └── PostponeModal.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- Expo CLI (for mobile app)
- Android Studio / Xcode (for mobile testing)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
MONGODB_URI=mongodb+srv://basha:king@basha.vrlvzbl.mongodb.net/doc2book?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Patient Mobile App Setup

1. Navigate to patient-app directory:
```bash
cd patient-app
```

2. Install dependencies:
```bash
npm install
```

3. Update API URL in `src/api/api.js`:
- For Android emulator: `http://10.0.2.2:5000/api`
- For iOS simulator: `http://localhost:5000/api`
- For physical device: `http://YOUR_COMPUTER_IP:5000/api`

4. Start Expo:
```bash
npx expo start
```

5. Run on device:
- Press `a` for Android
- Press `i` for iOS
- Scan QR code with Expo Go app

### Doctor Dashboard Setup

1. Navigate to doctor-dashboard directory:
```bash
cd doctor-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Dashboard will run on `http://localhost:5173`

## 📱 Features

### Patient App Features
- ✅ Multi-step registration with location capture
- ✅ Find nearby doctors sorted by distance
- ✅ View doctor details (specialization, experience, hospital)
- ✅ Book appointments with calendar and time slot selection
- ✅ Track appointment status (Pending/Approved/Rejected/Postponed)
- ✅ View rescheduled appointments
- ✅ Cancel pending appointments

### Doctor Dashboard Features
- ✅ Login/Authentication
- ✅ View all appointments in data grid
- ✅ See patient background (Age, Education, Work Status)
- ✅ Filter by status (All/Pending/Approved/Postponed/Rejected)
- ✅ Approve appointments
- ✅ Reject appointments with reason
- ✅ Postpone appointments with new date/time
- ✅ Responsive design

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register-doctor` - Register doctor
- `POST /api/auth/register-patient` - Register patient
- `POST /api/auth/login-doctor` - Doctor login
- `POST /api/auth/login-patient` - Patient login

### Doctors
- `GET /api/doctors/nearby?lat={lat}&lon={lon}` - Get nearby doctors
- `GET /api/doctors/:id` - Get doctor details
- `PATCH /api/doctors/:id/slots` - Update available slots

### Appointments
- `POST /api/appointments/book` - Book appointment
- `GET /api/appointments/patient/:id` - Get patient's appointments
- `GET /api/appointments/doctor/:id` - Get doctor's appointments
- `PATCH /api/appointments/:id/status` - Update appointment status
- `DELETE /api/appointments/:id` - Cancel appointment

## 🗺️ Geospatial Features

### Distance Calculation
The system uses MongoDB's geospatial queries to calculate distances:

```javascript
// Backend: $geoNear aggregation
const doctors = await Doctor.aggregate([
  {
    $geoNear: {
      near: { type: "Point", coordinates: [longitude, latitude] },
      distanceField: "distance",
      maxDistance: 50000, // 50km
      spherical: true,
      distanceMultiplier: 0.001 // Convert to kilometers
    }
  }
]);
```

### Location Storage
Locations are stored as GeoJSON Point:
```javascript
location: {
  type: { type: String, default: 'Point' },
  coordinates: [Number] // [longitude, latitude]
}
```

## 🔐 Authentication

- JWT-based authentication
- Tokens stored in:
  - Mobile: AsyncStorage
  - Web: localStorage
- Protected routes with authentication middleware

## 📊 Appointment Status Workflow

```
pending → approved
        → rejected (with reason)
        → postponed (with new date/time)
```

## 🧪 Testing

### Test Doctor Registration
```bash
curl -X POST http://localhost:5000/api/auth/register-doctor \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. John Smith",
    "email": "john@example.com",
    "password": "password123",
    "qualification": "MBBS, MD",
    "experience": 10,
    "specialization": "Cardiology",
    "hospitalName": "City Hospital",
    "hospitalArea": "Downtown",
    "location": {
      "type": "Point",
      "coordinates": [77.5946, 12.9716]
    }
  }'
```

### Test Patient Registration
```bash
curl -X POST http://localhost:5000/api/auth/register-patient \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "password123",
    "age": 30,
    "education": "Bachelor's",
    "workStatus": "Employed",
    "placeFrom": "Bangalore",
    "location": {
      "type": "Point",
      "coordinates": [77.6000, 12.9800]
    }
  }'
```

## 🛠️ Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- bcryptjs
- express-validator

### Patient App
- React Native
- Expo
- React Navigation
- Axios
- Expo Location
- React Native Calendars
- AsyncStorage

### Doctor Dashboard
- React.js
- Vite
- Material-UI (MUI)
- React Router
- Axios
- MUI DataGrid
- date-fns

## 📝 Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
NODE_ENV=development
```

## 🚨 Important Notes

1. **Location Permissions**: The mobile app requires location permissions to find nearby doctors.

2. **API URL Configuration**: 
   - Update API URLs based on your network configuration
   - For physical devices, use your computer's IP address

3. **MongoDB Connection**: 
   - Ensure MongoDB is accessible from your network
   - Whitelist your IP in MongoDB Atlas

4. **CORS**: Backend is configured to allow all origins in development

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Built with ❤️ using Node.js, React Native, and React.js
