const mongoose = require('mongoose');

const TenantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    advancePaid: { type: Number, default: 0 },
    joinDate: { type: Date, default: Date.now },
    dues: [{
        month: { type: String, required: true }, // e.g., "January 2025"
        amount: { type: Number, required: true },
        status: { type: String, enum: ['Pending', 'Paid', 'Partial'], default: 'Pending' },
        paidAmount: { type: Number, default: 0 },
        dueDate: { type: Date }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Tenant', TenantSchema);
