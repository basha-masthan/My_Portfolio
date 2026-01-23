const router = require('express').Router();
const Tenant = require('../models/Tenant');
const Room = require('../models/Room');

// Get all tenants
router.get('/', async (req, res) => {
    try {
        const tenants = await Tenant.find().populate('room');
        res.json(tenants);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add a tenant
router.post('/', async (req, res) => {
    const { name, phone, roomId, advancePaid, joinDate } = req.body;

    try {
        const room = await Room.findById(roomId);
        if (!room) return res.status(404).json("Room not found");
        if (room.occupied >= room.capacity) return res.status(400).json("Room is full");

        const newTenant = new Tenant({
            name,
            phone,
            room: roomId,
            advancePaid,
            joinDate
        });

        const savedTenant = await newTenant.save();

        // Update room occupancy
        await Room.findByIdAndUpdate(roomId, {
            $inc: { occupied: 1 },
            $push: { tenants: savedTenant._id }
        });

        res.status(200).json(savedTenant);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add Due/Record Payment
router.put('/:id/dues', async (req, res) => {
    try {
        const tenant = await Tenant.findById(req.params.id);
        const { month, amount, status } = req.body;

        // Check if month already exists
        const dueIndex = tenant.dues.findIndex(d => d.month === month);
        if (dueIndex > -1) {
            tenant.dues[dueIndex].status = status;
            tenant.dues[dueIndex].amount = amount;
        } else {
            tenant.dues.push({ month, amount, status });
        }

        const updatedTenant = await tenant.save();
        res.status(200).json(updatedTenant);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
