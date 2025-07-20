import mongoose from "mongoose";
const activeuserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    loggedAt: {
        type: Date,
        default: Date.now
    },
    refreshToken: String
})

export const activeUSer = mongoose.model('activeUSer', activeuserSchema);