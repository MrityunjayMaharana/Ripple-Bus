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
const Stop = mongoose.model("Stop", stopSchema);
export default Stop