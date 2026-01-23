const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true, unique: true },
    floor: { type: Number, required: true },
    sharingType: { type: Number, required: true, enum: [1, 2, 3, 4] },
    rentPerPerson: { type: Number, required: true },
    capacity: { type: Number, required: true },
    occupied: { type: Number, default: 0 },
    tenants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' }]
}, { timestamps: true });

module.exports = mongoose.model('Room', RoomSchema);
