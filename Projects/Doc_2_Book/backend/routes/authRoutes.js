import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';

const router = express.Router();

// Generate JWT token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @route   POST /api/auth/register-doctor
// @desc    Register a new doctor
// @access  Public
router.post('/register-doctor', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('qualification').notEmpty().withMessage('Qualification is required'),
    body('experience').isNumeric().withMessage('Experience must be a number'),
    body('specialization').notEmpty().withMessage('Specialization is required'),
    body('hospitalName').notEmpty().withMessage('Hospital name is required'),
    body('hospitalArea').notEmpty().withMessage('Hospital area is required'),
    body('location.coordinates').isArray({ min: 2, max: 2 }).withMessage('Location coordinates are required [longitude, latitude]')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email } = req.body;

        // Check if doctor already exists
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: 'Doctor with this email already exists' });
        }

        // Create new doctor
        const doctor = new Doctor(req.body);
        await doctor.save();

        // Generate token
        const token = generateToken(doctor._id, 'doctor');

        res.status(201).json({
            success: true,
            token,
            doctor: {
                id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                specialization: doctor.specialization,
                hospitalName: doctor.hospitalName
            }
        });
    } catch (error) {
        console.error('Doctor registration error:', error);
        res.status(500).json({ message: 'Server error during registration', error: error.message });
    }
});

// @route   POST /api/auth/register-patient
// @desc    Register a new patient
// @access  Public
router.post('/register-patient', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('age').isNumeric().withMessage('Age must be a number'),
    body('education').notEmpty().withMessage('Education is required'),
    body('workStatus').notEmpty().withMessage('Work status is required'),
    body('placeFrom').notEmpty().withMessage('Place is required'),
    body('location.coordinates').isArray({ min: 2, max: 2 }).withMessage('Location coordinates are required [longitude, latitude]')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email } = req.body;

        // Check if patient already exists
        const existingPatient = await Patient.findOne({ email });
        if (existingPatient) {
            return res.status(400).json({ message: 'Patient with this email already exists' });
        }

        // Create new patient
        const patient = new Patient(req.body);
        await patient.save();

        // Generate token
        const token = generateToken(patient._id, 'patient');

        res.status(201).json({
            success: true,
            token,
            patient: {
                id: patient._id,
                name: patient.name,
                email: patient.email,
                age: patient.age,
                placeFrom: patient.placeFrom
            }
        });
    } catch (error) {
        console.error('Patient registration error:', error);
        res.status(500).json({ message: 'Server error during registration', error: error.message });
    }
});

// @route   POST /api/auth/login-doctor
// @desc    Login doctor
// @access  Public
router.post('/login-doctor', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Find doctor and include password field
        const doctor = await Doctor.findOne({ email }).select('+password');
        if (!doctor) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await doctor.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(doctor._id, 'doctor');

        res.json({
            success: true,
            token,
            doctor: {
                id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                specialization: doctor.specialization,
                hospitalName: doctor.hospitalName
            }
        });
    } catch (error) {
        console.error('Doctor login error:', error);
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
});

// @route   POST /api/auth/login-patient
// @desc    Login patient
// @access  Public
router.post('/login-patient', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Find patient and include password field
        const patient = await Patient.findOne({ email }).select('+password');
        if (!patient) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await patient.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(patient._id, 'patient');

        res.json({
            success: true,
            token,
            patient: {
                id: patient._id,
                name: patient.name,
                email: patient.email,
                age: patient.age,
                placeFrom: patient.placeFrom,
                location: patient.location
            }
        });
    } catch (error) {
        console.error('Patient login error:', error);
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
});

export default router;
