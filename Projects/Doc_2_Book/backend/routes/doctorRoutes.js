import express from 'express';
import { body, validationResult } from 'express-validator';
import Doctor from '../models/Doctor.js';

const router = express.Router();

// @route   GET /api/doctors/nearby
// @desc    Get doctors sorted by distance from patient location
// @access  Public
router.get('/nearby', async (req, res) => {
    try {
        const { lat, lon, maxDistance = 50000 } = req.query; // maxDistance in meters (default 50km)

        if (!lat || !lon) {
            return res.status(400).json({ message: 'Latitude and longitude are required' });
        }

        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);

        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ message: 'Invalid latitude or longitude' });
        }

        // Use MongoDB $geoNear aggregation to find nearby doctors
        const doctors = await Doctor.aggregate([
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    distanceField: 'distance',
                    maxDistance: parseInt(maxDistance),
                    spherical: true,
                    query: { isApproved: true }, // Only show approved doctors
                    distanceMultiplier: 0.001 // Convert meters to kilometers
                }
            },
            {
                $project: {
                    password: 0 // Exclude password field
                }
            }
        ]);

        res.json({
            success: true,
            count: doctors.length,
            doctors
        });
    } catch (error) {
        console.error('Error fetching nearby doctors:', error);
        res.status(500).json({ message: 'Server error fetching doctors', error: error.message });
    }
});

// @route   GET /api/doctors/:id
// @desc    Get specific doctor details
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).select('-password');

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.json({
            success: true,
            doctor
        });
    } catch (error) {
        console.error('Error fetching doctor:', error);
        res.status(500).json({ message: 'Server error fetching doctor', error: error.message });
    }
});

// @route   PATCH /api/doctors/:id/slots
// @desc    Update doctor's available slots
// @access  Private (Doctor only)
router.patch('/:id/slots', [
    body('availableSlots').isArray().withMessage('Available slots must be an array')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { availableSlots } = req.body;

        const doctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            { availableSlots },
            { new: true, runValidators: true }
        ).select('-password');

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.json({
            success: true,
            message: 'Available slots updated successfully',
            doctor
        });
    } catch (error) {
        console.error('Error updating slots:', error);
        res.status(500).json({ message: 'Server error updating slots', error: error.message });
    }
});

// @route   GET /api/doctors
// @desc    Get all doctors (with optional filters)
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { specialization, hospitalArea } = req.query;

        let query = { isApproved: true }; // Only show approved doctors
        if (specialization) {
            query.specialization = new RegExp(specialization, 'i');
        }
        if (hospitalArea) {
            query.hospitalArea = new RegExp(hospitalArea, 'i');
        }

        const doctors = await Doctor.find(query).select('-password');

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

export default router;
