import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
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
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gender',
        required: true
    },
    role: {
        type: String,
        required: true
    }
},{timestamps: true});

export const Employee = mongoose.model('Employee', employeeSchema);