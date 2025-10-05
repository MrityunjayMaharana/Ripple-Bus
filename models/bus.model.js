import mongoose from "mongoose"

const busSchema = new mongoose.Schema({
        busNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"],
        },
        route: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Route",
            required: true,
        },
        conductor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        currentLocation: {
            latitude: { type: Number, default: 0 },
            longitude: { type: Number, default: 0 },
            lastUpdated: { type: Date, default: Date.now },
        },
        status: {
            type: String,
            enum: ["active", "inactive", "maintenance"],
            default: "inactive",
        },
        adminVerified: {
            type: Boolean,
            default: false,
        }
    }, 
    { 
        timestamps: true 
})

const Bus = mongoose.model('Bus', busSchema)
export default Bus