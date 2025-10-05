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
            ref: Stop,
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

const Route = mongoose.model("Route", routeSchema)
export default Route