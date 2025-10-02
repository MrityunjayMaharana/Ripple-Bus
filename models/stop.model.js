import mongoose from "mongoose";

const stopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    }
}, 
{ timestamps: true })
export default mongoose.model("Stop", stopSchema);