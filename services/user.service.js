import User from "../models/user.model.js";
import jwt from "jsonwebtoken"

class UserServices {

  async createUser(data) {
    try {
      const { role, profile, conductor, admin, ...basicDetails } = data;
      const userToCreate = {
        ...basicDetails,
        role: role || "passenger",
      };

      if (profile) {
        userToCreate.profile = profile;
      } else if(!profile) {
        userToCreate.profile = {};
      } else if (role == "conductor" && conductor) {
        userToCreate.conductor = conductor;
      } else if (role == "admin" && admin) {
        userToCreate.admin = admin;
      }

      if (role != "conductor") {
        delete userToCreate.conductor;
      }
      if (role != "admin") {
        delete userToCreate.admin;
      }

      const user = new User(userToCreate);
      await user.save();
      return user;
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await User.findOne({ email });
      console.log(user);
      return user;
    } catch (error) {
      throw new Error("Error finding user by email: " + error.message);
    }
  }

  async findUserByPhone(phone) {
    try {
      const user = await User.findOne({ phone });
      return user;
    } catch (error) {
      throw new Error("Error finding user by phone: " + error.message);
    }
  }

  async findUserById(id) {
    try {
      const user = await User.findById(id).select("-password");
      return user;
    } catch (error) {
      throw new Error("Error finding user by ID: " + error.message);
    }
  }

  async getAllUsers() {
    try {
      const users = await User.find().select("-password");
      return users;
    } catch (error) {
      throw new Error("Error retrieving all users: " + error.message);
    }
  }

  async updateProfile(email, profileData) {
    try {
      const user = await User.findOneAndUpdate(
        { email },
        { profile: profileData },
        { new: true }
      ).select("-password");
      return user;
    } catch (error) {
      throw new Error("Error updating user profile: " + error.message);
    }
  }

  async updateUserVerification(email, isVerified) {
    try {
      const user = await User.findOneAndUpdate(
        { email },
        { isVerified },
        { new: true }
      ).select("-password");
      return user;
    } catch (error) {
      throw new Error("Error updating user verification: " + error.message);
    }
  }

  generateAuthToken(user) {
    try {
      const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      console.log("Generated Token: ", token);
      return token;
    } catch (error) {
      throw new Error("Error generating auth token: " + error.message);
    }
  }
}

export default new UserServices();
