import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    isComplete: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const task = mongoose.model('task', taskSchema)