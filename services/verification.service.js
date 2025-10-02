// services/verification.service.js
import nodemailer from "nodemailer";
import User from "../models/user.model.js";

class VerificationService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendVerificationEmail(email) {
    const otp = this.generateOTP();
    const expiryTime = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store OTP with expiry
    const user = await User.findOne({ email });
    user.emailOtp = otp;
    user.emailOtpExpiry = new Date(expiryTime);
    await user.save();

    const mailOptions = {
      from: `"Ripple Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your email for Ripple",
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background:rgb(37, 37, 37); padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
            <div style="text-align: center; background:rgb(30, 30, 30); padding: 10px 0;">
              <b><h2 style="color: #3498db; margin-bottom: 10px;">Welcome to Ripple 🚌</h2></b>
              <p style="font-size: 16px; color: #333;">We’re excited to have you on board!</p>
            </div>
      
            <div style="background: #fff; padding: 20px; border-radius: 8px; background:rgb(37, 37, 37); text-align: center; border: 1px solid #eee;">
              <p style="font-size: 15px; color: #555;">Use the following One-Time Password (OTP) to verify your email address and activate your Ripple account:</p>
              <h1 style="color: white; font-size: 36px; letter-spacing: 5px; margin: 20px 0;">${otp}</h1>
              <p style="font-size: 14px; color: #777;">This OTP will expire in <strong>10 minutes</strong>.</p>
            </div>
      
            <div style="text-align: center; margin-top: 20px; font-size: 13px; color: #999;">
              <p>If you didn’t request this verification, please ignore this email.</p>
              <p>© ${new Date().getFullYear()} Ripple. All rights reserved.</p>
            </div>
          </div>
        `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Verification email sent to ${email}`);
      return { success: true, message: "Verification email sent" };
    } catch (error) {
      console.error(`Error sending verification email to ${email}:`, error);
      throw new Error("Could not send verification email");
    }
  }

  async sendVerificationSMS(phone) {
    
  }

  async verifyEmailOTP(email, providedOtp) {
    try {
      const user = await User.findOne({ email })
      if (!user) {
        return { success: false, message: "User not found" };
      }
  
      // Convert both to strings and trim
      if (String(user.emailOtp).trim() !== String(providedOtp).trim()) {
        console.log("Provided OTP:", providedOtp, "Expected OTP:", user.emailOtp);
        return { success: false, message: "Invalid OTP" };
      }
  
      if (Date.now() > user.emailOtpExpiry) {
        return { success: false, message: "OTP has expired" };
      }
  
      user.emailOtp = null;
      user.emailOtpExpiry = null;
      user.isVerified = true;
      await user.save();
  
      return { success: true, message: "Email verified successfully" };
    } catch (error) {
      throw new Error("Error verifying email OTP: " + error.message);
    }
  }
  

  async verifyPhoneOTP(phone, providedOtp) {
    try {
        const user = await User.findOne({ phone }).select(" +phoneOtp +phoneOtpExpiry")
        if(!user) {
            return { success: false, message: 'User not found' }
        }
        if(Date.now() > user.phoneOtpExpiry) {
            return { success: false, message: 'OTP has expired' }
        }
        if(user.phoneOtp != providedOtp) {
            console.log('Provided OTP:', providedOtp, 'Expected OTP:', user.phoneOtp)
            return { success: false, message: 'Invalid OTP' }
        }
        user.phoneOtp = null
        user.phoneOtpExpiry = null
        await user.save()
        return { success: true, message: 'Phone number verified successfully' }
    } catch (error) {
        throw new Error('Error verifying phone OTP: ' + error.message)
    }
  }
}

export default new VerificationService();
