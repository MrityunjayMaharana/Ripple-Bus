import busService from "../services/bus.service";

export async function addBus(req, res) {
  try {
    const user = req.user;
    const busDetails = req.body;

    if (user.role !== "conductor") {
      return res.status(403).json({ message: "Only conductors can add buses" });
    }

    const bus = await busService.addBus({ ...busDetails, conductor: user._id });
    return res.status(201).json({ message: "Bus added successfully", bus });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error while adding bus: ${error.message}` });
  }
}

export async function verifyBus(req, res) {
  try {
    const user = req.user;
    const { busId } = req.params;

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can verify buses" });
    }

    const result = await busService.verifyBus(busId);
    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    return res
      .status(200)
      .json({ message: "Bus verified successfully", bus: result.bus });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error while verifying bus: ${error.message}` });
  }
}

export async function getAllBuses(req, res) {
  try {
    const buses = await busService.getAllBuses();
    return res.status(200).json({ buses });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error while fetching buses: ${error.message}` });
  }
}

