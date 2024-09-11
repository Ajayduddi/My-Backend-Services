import mongoose from 'mongoose';

const genderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
},{timestamps: true});

export const Gender = mongoose.model('Gender', genderSchema);
