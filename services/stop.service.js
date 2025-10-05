import Stop from "../models/stop.model.js";

class StopServices {

    async getStopById (stopId) {
        try {
            const stop = await Stop.findById(stopId)
            return stop
        } catch (error) {
            throw new Error('Error fetching stop by ID: ', error.message) 
        }
    }

    async addStop (stopData) {
        try {
            const stop = await new Stop(stopData)
            stop.save()
            return stop
        } catch (error) {
            throw new Error('Error adding new stop: ', error.message) 
        }
    }

    async getAllStops () {
        try {
            const stops = await Stop.find()
            return stops
        } catch (error) {
            throw new Error('Error fetching stops: ', error.message) 
        }
    }

    async updateStop (stopId, stopData) {
        try {
            const stop = await Stop.findByIdAndUpdate(stopId, stopData, { new: true })
            return stop
        } catch (error) {
            throw new Error('Error updating stop: ', error.message)
        }
    }

    async deleteStop (stopId) {
        try {
            const stop = await Stop.findByIdAndDelete(stopId)
            return stop
        } catch (error) {
            throw new Error('Error deleting stop: ', error.message)
        }
    }

}

export default new StopServices()