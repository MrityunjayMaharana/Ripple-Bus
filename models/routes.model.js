import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    stops: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: stop,
            sequence: Number,
            estimatedArrival: Number
        }
    ],
    totalDistance: {
        type: Number,
        required: true
    },
    estimatedTime: {
        type: Number,
        required: true
    },
}, 
{ timestamps: true })
export default mongoose.model("Route", routeSchema)