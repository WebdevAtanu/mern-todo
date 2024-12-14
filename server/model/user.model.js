import mongoose from 'mongoose';
const userShema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        selected: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const user = mongoose.model('user', userShema);