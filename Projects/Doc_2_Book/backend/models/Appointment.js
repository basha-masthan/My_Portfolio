import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'Patient ID is required']
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: [true, 'Doctor ID is required']
    },
    slotDate: {
        type: String,
        required: [true, 'Slot date is required']
    },
    slotTime: {
        type: String,
        required: [true, 'Slot time is required']
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'postponed', 'rejected'],
        default: 'pending'
    },
    rescheduledDate: {
        type: String,
        default: null
    },
    rescheduledTime: {
        type: String,
        default: null
    },
    rejectionReason: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

// Index for faster queries
appointmentSchema.index({ doctorId: 1, status: 1 });
appointmentSchema.index({ patientId: 1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
