import mongoose from 'mongoose';

const testsSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
      unique: true
    },
    title: {
        type: String,
        required: { type: Boolean, default: true }
    },
    description: {
        type: String,
        required: { type: Boolean, default: true }
    },
    price: {
        type: Number,
        required: { type: Boolean, default: true }
    }
},{timestamps: true});

export const Test = mongoose.model('Test', testsSchema);

