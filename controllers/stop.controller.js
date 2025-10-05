import stopService from "../services/stop.service.js";

export async function addStop(req, res) {
    try {
        const user = req.user
        const stopDetails = req.body

        if(user.role !== 'admin') {
            return res.status(403).json({ message: 'Only admins can add stops' })
        }

        const stop = await stopService.addStop(stopDetails)
        return res.status(201).json({ message: 'Stop added successfully', stop })
    } catch (error) {
        return res.status(500).json({ message: `Error while adding stop: ${error.message}` })
    }
}

export async function getAllStops(req, res) {
    try {
        const stops = await stopService.getAllStops()
        return res.status(200).json({ stops })
    } catch (error) {
        return res.status(500).json({ message: `Error while fetching stops: ${error.message}` })
    }
}

export async function updateStop(req, res) {
    try {
        const user = req.user
        const { stopId } = req.params
        const stopDetails = req.body

        if(user.role !== 'admin') {
            return res.status(403).json({ message: 'Only admins can update stops' })
        }

        const stop = await stopService.updateStop(stopId, stopDetails)
        if(!stop) {
            return res.status(404).json({ message: 'Stop not found' })
        }
        return res.status(200).json({ message: 'Stop updated successfully', stop })
    } catch (error) {
        return res.status(500).json({ message: `Error while updating stop: ${error.message}` })
    }
}

export async function deleteStop(req, res) {
    try {
        const user = req.user
        const { stopId } = req.params

        if(user.role !== 'admin') {
            return res.status(403).json({ message: 'Only admins can delete stops' })
        }

        const stop = await stopService.deleteStop(stopId)
        if(!stop) {
            return res.status(404).json({ message: 'Stop not found' })
        }
        return res.status(200).json({ message: 'Stop deleted successfully', stop })
    } catch (error) {
        return res.status(500).json({ message: `Error while deleting stop: ${error.message}` })
    }
}

export async function searchStops(req, res) {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ message: "Query parameter is required" });
      }
  
      const stops = await stopService.getAllStops();
  
      const filteredStops = stops.filter(stop =>
        stop.name.toLowerCase().includes(query.toLowerCase())
      );
  
      return res.status(200).json({ stops: filteredStops });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error while searching stops: ${error.message}` });
    }
  }
  

export async function getStopById(req, res) {
    try {
        const { stopId } = req.params
        const stop = await stopService.getStopById(stopId)
        if(!stop) {
            return res.status(404).json({ message: 'Stop not found' })
        }
        return res.status(200).json({ stop: stop })
    } catch (error) {
        return res.status(500).json({ message: `Error while fetching stop: ${error.message}` })
    }
}