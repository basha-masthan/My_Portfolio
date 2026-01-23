import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';
import Appointment from '../models/Appointment.js';

const router = express.Router();

// Generate JWT token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @route   POST /api/admin/create
// @desc    Create first admin (should be protected in production)
// @access  Public (for initial setup only)
router.post('/create', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, name } = req.body;

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this email already exists' });
        }

        // Create admin
        const admin = new Admin({ email, password, name: name || 'Admin' });
        await admin.save();

        const token = generateToken(admin._id, 'admin');

        res.status(201).json({
            success: true,
            message: 'Admin created successfully',
            token,
            admin: {
                id: admin._id,
                email: admin.email,
                name: admin.name
            }
        });
    } catch (error) {
        console.error('Admin creation error:', error);
        res.status(500).json({ message: 'Server error during admin creation', error: error.message });
    }
});

// @route   POST /api/admin/login
// @desc    Admin login
// @access  Public
router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Find admin
        const admin = await Admin.findOne({ email }).select('+password');
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(admin._id, 'admin');

        res.json({
            success: true,
            token,
            admin: {
                id: admin._id,
                email: admin.email,
                name: admin.name
            }
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
});

// @route   GET /api/admin/pending-doctors
// @desc    Get all pending (unapproved) doctors
// @access  Private (Admin only)
router.get('/pending-doctors', async (req, res) => {
    try {
        const pendingDoctors = await Doctor.find({ isApproved: false, rejectionReason: null })
            .select('-password')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: pendingDoctors.length,
            doctors: pendingDoctors
        });
    } catch (error) {
        console.error('Error fetching pending doctors:', error);
        res.status(500).json({ message: 'Server error fetching pending doctors', error: error.message });
    }
});

// @route   GET /api/admin/all-doctors
// @desc    Get all doctors with their approval status
// @access  Private (Admin only)
router.get('/all-doctors', async (req, res) => {
    try {
        const { status } = req.query; // approved, pending, rejected

        let query = {};
        if (status === 'approved') {
            query.isApproved = true;
        } else if (status === 'pending') {
            query.isApproved = false;
            query.rejectionReason = null;
        } else if (status === 'rejected') {
            query.rejectionReason = { $ne: null };
        }

        const doctors = await Doctor.find(query)
            .select('-password')
            .populate('approvedBy', 'name email')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: doctors.length,
            doctors
        });
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ message: 'Server error fetching doctors', error: error.message });
    }
});

// @route   PATCH /api/admin/approve-doctor/:id
// @desc    Approve a doctor
// @access  Private (Admin only)
router.patch('/approve-doctor/:id', async (req, res) => {
    try {
        const { adminId } = req.body; // Should come from auth middleware in production

        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        if (doctor.isApproved) {
            return res.status(400).json({ message: 'Doctor is already approved' });
        }

        doctor.isApproved = true;
        doctor.approvedBy = adminId;
        doctor.approvedAt = new Date();
        doctor.rejectionReason = null;

        await doctor.save();

        res.json({
            success: true,
            message: 'Doctor approved successfully',
            doctor: {
                id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                isApproved: doctor.isApproved,
                approvedAt: doctor.approvedAt
            }
        });
    } catch (error) {
        console.error('Error approving doctor:', error);
        res.status(500).json({ message: 'Server error approving doctor', error: error.message });
    }
});

// @route   PATCH /api/admin/reject-doctor/:id
// @desc    Reject a doctor
// @access  Private (Admin only)
router.patch('/reject-doctor/:id', [
    body('reason').notEmpty().withMessage('Rejection reason is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { reason } = req.body;

        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        doctor.isApproved = false;
        doctor.rejectionReason = reason;
        doctor.approvedBy = null;
        doctor.approvedAt = null;

        await doctor.save();

        res.json({
            success: true,
            message: 'Doctor rejected',
            doctor: {
                id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                rejectionReason: doctor.rejectionReason
            }
        });
    } catch (error) {
        console.error('Error rejecting doctor:', error);
        res.status(500).json({ message: 'Server error rejecting doctor', error: error.message });
    }
});

// @route   GET /api/admin/statistics
// @desc    Get admin dashboard statistics
// @access  Private (Admin only)
router.get('/statistics', async (req, res) => {
    try {
        const totalDoctors = await Doctor.countDocuments();
        const approvedDoctors = await Doctor.countDocuments({ isApproved: true });
        const pendingDoctors = await Doctor.countDocuments({ isApproved: false, rejectionReason: null });
        const rejectedDoctors = await Doctor.countDocuments({ rejectionReason: { $ne: null } });
        const totalPatients = await Patient.countDocuments();

        res.json({
            success: true,
            statistics: {
                totalDoctors,
                approvedDoctors,
                pendingDoctors,
                rejectedDoctors,
                totalPatients
            }
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ message: 'Server error fetching statistics', error: error.message });
    }
});

// @route   GET /api/admin/all-patients
// @desc    Get all patients
// @access  Private (Admin only)
router.get('/all-patients', async (req, res) => {
    try {
        const patients = await Patient.find().select('-password').sort({ createdAt: -1 });
        res.json({
            success: true,
            count: patients.length,
            patients
        });
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ message: 'Server error fetching patients', error: error.message });
    }
});

// @route   GET /api/admin/all-bookings
// @desc    Get all bookings (appointments)
// @access  Private (Admin only)
router.get('/all-bookings', async (req, res) => {
    try {
        const { status } = req.query;
        let query = {};
        if (status) {
            query.status = status;
        }

        const appointments = await Appointment.find(query)
            .populate('patientId', 'name email phone')
            .populate('doctorId', 'name specialization hospitalName')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: appointments.length,
            appointments
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Server error fetching bookings', error: error.message });
    }
});

export default router;
