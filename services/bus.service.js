import Bus from "../models/bus.model.js";

class BusServices {
  async addBus(busData) {
    try {
      const bus = new Bus(busData);
      await bus.save();
      return bus;
    } catch (error) {
      throw new Error("Error while adding bus: " + error.message);
    }
  }

  // Verify bus by admin
  async verifyBus(busId) {
    try {
      const bus = await Bus.findById(busId);
      if (!bus) {
        return { success: false, message: "Bus not found" };
      }
      bus.adminVerified = true;
      await bus.save();
      return { success: true, bus };
    } catch (error) {
      throw new Error("Error while verifying bus: " + error.message);
    }
  }

  async getAllBuses() {
    try {
      const buses = await Bus.find()
        .populate("route")
        .populate("conductor", "-password");
      return buses;
    } catch (error) {
      throw new Error("Error while fetching buses: " + error.message);
    }
  }
}

export default new BusServices();
