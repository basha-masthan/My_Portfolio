import express from 'express';
import { body, validationResult } from 'express-validator';
import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';

const router = express.Router();

// @route   POST /api/appointments/book
// @desc    Patient books an appointment
// @access  Public (should be protected in production)
router.post('/book', [
    body('patientId').notEmpty().withMessage('Patient ID is required'),
    body('doctorId').notEmpty().withMessage('Doctor ID is required'),
    body('slotDate').notEmpty().withMessage('Slot date is required'),
    body('slotTime').notEmpty().withMessage('Slot time is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { patientId, doctorId, slotDate, slotTime } = req.body;

        // Verify patient exists
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Verify doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Check if slot is available
        // Simplified: We assume the slots sent from frontend are valid time-wise.
        // We only check if it conflicts with an existing appointment (done below).

        // Check if appointment already exists for this slot
        const existingAppointment = await Appointment.findOne({
            doctorId,
            slotDate,
            slotTime,
            status: { $in: ['pending', 'approved'] }
        });

        if (existingAppointment) {
            return res.status(400).json({ message: 'This slot is already booked' });
        }

        // Create appointment
        const appointment = new Appointment({
            patientId,
            doctorId,
            slotDate,
            slotTime,
            status: 'pending'
        });

        await appointment.save();

        // Populate patient and doctor details
        await appointment.populate('patientId', '-password');
        await appointment.populate('doctorId', '-password');

        res.status(201).json({
            success: true,
            message: 'Appointment booked successfully',
            appointment
        });
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ message: 'Server error booking appointment', error: error.message });
    }
});

// @route   GET /api/appointments/patient/:id
// @desc    Get all appointments for a patient
// @access  Public (should be protected in production)
router.get('/patient/:id', async (req, res) => {
    try {
        const appointments = await Appointment.find({ patientId: req.params.id })
            .populate('doctorId', '-password')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: appointments.length,
            appointments
        });
    } catch (error) {
        console.error('Error fetching patient appointments:', error);
        res.status(500).json({ message: 'Server error fetching appointments', error: error.message });
    }
});

// @route   GET /api/appointments/doctor/:id
// @desc    Get all appointments for a doctor
// @access  Public (should be protected in production)
router.get('/doctor/:id', async (req, res) => {
    try {
        const { status } = req.query;

        let query = { doctorId: req.params.id };
        if (status) {
            query.status = status;
        }

        const appointments = await Appointment.find(query)
            .populate('patientId', '-password')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: appointments.length,
            appointments
        });
    } catch (error) {
        console.error('Error fetching doctor appointments:', error);
        res.status(500).json({ message: 'Server error fetching appointments', error: error.message });
    }
});

// @route   PATCH /api/appointments/:id/status
// @desc    Update appointment status (approve/reject/postpone)
// @access  Public (should be protected - Doctor only)
router.patch('/:id/status', [
    body('status').isIn(['approved', 'rejected', 'postponed']).withMessage('Invalid status')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { status, rescheduledDate, rescheduledTime, rejectionReason } = req.body;

        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Update status
        appointment.status = status;

        // Handle postponed appointments
        if (status === 'postponed') {
            if (!rescheduledDate || !rescheduledTime) {
                return res.status(400).json({
                    message: 'Rescheduled date and time are required for postponed appointments'
                });
            }
            appointment.rescheduledDate = rescheduledDate;
            appointment.rescheduledTime = rescheduledTime;
        }

        // Handle rejected appointments
        if (status === 'rejected' && rejectionReason) {
            appointment.rejectionReason = rejectionReason;
        }

        await appointment.save();

        // Populate details
        await appointment.populate('patientId', '-password');
        await appointment.populate('doctorId', '-password');

        res.json({
            success: true,
            message: `Appointment ${status} successfully`,
            appointment
        });
    } catch (error) {
        console.error('Error updating appointment status:', error);
        res.status(500).json({ message: 'Server error updating appointment', error: error.message });
    }
});

// @route   DELETE /api/appointments/:id
// @desc    Cancel/delete an appointment
// @access  Public (should be protected)
router.delete('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.json({
            success: true,
            message: 'Appointment cancelled successfully'
        });
    } catch (error) {
        console.error('Error cancelling appointment:', error);
        res.status(500).json({ message: 'Server error cancelling appointment', error: error.message });
    }
});

export default router;
