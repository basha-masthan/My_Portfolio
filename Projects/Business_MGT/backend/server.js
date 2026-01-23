const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const MONGO_URI = 'mongodb+srv://basha:king@basha.vrlvzbl.mongodb.net/HostelManagement';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => {
        console.error('MongoDB Connection Error Details:', err);
        // process.exit(1); // Keep running to allow diagnosis
    });

// Routes
app.get('/', (req, res) => {
    res.send('PG Hostel Management API is running');
});

// Import Routes (to be created)
const roomRoutes = require('./routes/rooms');
const tenantRoutes = require('./routes/tenants');
const expenditureRoutes = require('./routes/expenditures');
const reportRoutes = require('./routes/reports');

app.use('/api/rooms', roomRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/expenditures', expenditureRoutes);
app.use('/api/reports', reportRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
