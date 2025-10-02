import bcrypt from 'bcryptjs'
import userService from '../services/user.service.js';
import verificationService from '../services/verification.service.js';

export async function userSignup(req, res) {
  try {
    const { password, email, phone, verificationDeatils, ...remainingDetails } = req.body;

    // check if user already exists
    if(await userService.findUserByEmail(email)) {
        return res.status(500).json({ message: 'User already exists with this email' })
    }
    if(await userService.findUserByPhone(phone)) {
        return res.status(500).json({ message: 'User already exists with this phone number' })
    }

    // validations
    if(password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' })
    }
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password)) {
        return res.status(400).json({ message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character' })
    }
    if(!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' })
    }
    if(!/^\d{10}$/.test(phone)) {
        return res.status(400).json({ message: 'Phone number must be 10 digits' })
    }

    // hash password
    const salt = await bcrypt.genSalt(13)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await userService.createUser({ ...remainingDetails, email, phone, password: hashedPassword })
    res.status(201).json({ message: 'User created successfully', user })
  } catch (error) {
    
  }
}

export async function sendVerificationEmail(req, res) {
    try {
        const { email } = req.user; // ✅ email from JWT middleware
        if(!email) {
            return res.status(400).json({ message: 'Email is required' })
        }
        if(!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' })
        }
        const result = await verificationService.sendVerificationEmail(email)
        res.status(200).json({ message: result.message })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function verifyEmail(req, res) {
    try {
        const { email } = req.user;
        const { otp } = req.body;

        if(!email) {
            return res.status(400).json({ message: 'Email is required' })
        }
        if(!otp) {
            return res.status(400).json({ message: 'OTP is required' })
        }

        const verified = await verificationService.verifyEmailOTP(email, otp)
        if(!verified.success) {
            return res.status(400).json({ message: verified.message })
        }

        res.status(200).json({ message: verified.message })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export async function loginUser(req, res) {
    try {
        console.log("JWT_SECRET from env:", process.env.JWT_SECRET);

        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' })
        }
        const user = await userService.findUserByEmail(email)
        if(!user) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }
        const isMatch =  bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }
        
        const token = userService.generateAuthToken(user)
        user.lastLogin = Date.now()
        await user.save()
        res.status(200).json({ message: 'Login successful', token, user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


