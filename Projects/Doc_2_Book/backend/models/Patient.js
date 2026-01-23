import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
        select: false
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: 0,
        max: 150
    },
    education: {
        type: String,
        required: [true, 'Education is required']
    },
    workStatus: {
        type: String,
        required: [true, 'Work status is required'],
        enum: ['Employed', 'Unemployed', 'Student', 'Retired', 'Self-Employed']
    },
    placeFrom: {
        type: String,
        required: [true, 'Place is required']
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: [true, 'Location coordinates are required']
        }
    }
}, {
    timestamps: true
});

// Create 2dsphere index for geospatial queries
patientSchema.index({ location: '2dsphere' });

// Hash password before saving
patientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
patientSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
