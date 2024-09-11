import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gender',
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true,
        length: 10
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i
    },
    appointment_date: {
        type: Date,
        required: true
    },
    appointment_time: {
        type: String,
        required: true
    },
    prescription: {
        type: String
    }
}, { timestamps: true });

export const Appointment = mongoose.model('Appointment', appointmentSchema);