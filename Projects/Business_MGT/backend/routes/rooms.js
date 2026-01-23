const router = require('express').Router();
const Room = require('../models/Room');

// Get all rooms
router.get('/', async (req, res) => {
    console.log("GET /api/rooms request received");
    try {
        const rooms = await Room.find().populate('tenants');
        console.log(`Found ${rooms.length} rooms`);
        res.json(rooms);
    } catch (err) {
        console.error("Error in GET /api/rooms:", err);
        res.status(500).json({ message: err.message, stack: err.stack });
    }
});

// Create a room
router.post('/', async (req, res) => {
    const { roomNumber, floor, sharingType } = req.body;
    let rentPerPerson = 0;

    switch (parseInt(sharingType)) {
        case 1: rentPerPerson = 9000; break;
        case 2: rentPerPerson = 7000; break;
        case 3: rentPerPerson = 6500; break;
        case 4: rentPerPerson = 5500; break;
        default: rentPerPerson = 0;
    }

    const newRoom = new Room({
        roomNumber,
        floor,
        sharingType,
        rentPerPerson,
        capacity: sharingType
    });

    try {
        const savedRoom = await newRoom.save();
        res.status(200).json(savedRoom);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
