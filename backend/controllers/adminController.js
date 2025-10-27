import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';

import jwt from 'jsonwebtoken';

// API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const {name, email, password, specialization, degree, experience, about, fees, address,} = req.body;
        const imageFile = req.file;

        console.log({name, email, password, specialization, degree, experience, about, fees, address, imageFile});

        // checking for all data to add doctor
        if (!name || !email || !password || !specialization || !degree || !experience || !about || !fees || !address) { 
            return res.status(400).json({ success: false, message: "Please fill all fields" });
        }

        //validating email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        // validation strong password
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }
        
        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image",
            
        });

        const imageUrl = imageUpload.secure_url;

        // create new doctor object
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            specialization,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now(),
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.status(201).json({ success: true, message: "Doctor added successfully"});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API for the admin login

const loginAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Validate email and password
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // Generate token
            const token = jwt.sign(email+password, process.env.JWT_SECRET );
            res.status(200).json({ success: true, token });




        } else {
            return res.status(401).json({ success: false, message: "Invalid admin credentials" }); 
        }

        // Check if admin exists
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ success: true, message: "Login successful", token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export {addDoctor, loginAdmin};