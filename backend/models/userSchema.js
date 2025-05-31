import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minlength: [3,"First Name must be at least 3 characters!"],
    },
    lastName:{
        type: String,
        required: true,
        minlength: [3,"Last Name must be at least 3 characters!"],
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail,"Please enter a valid email"],
    },
    phone:{
        type: String,
        required: true,
        minLength: [11,"Phone number must be  11 digits!"],
        maxLength: [11,"Phone number must be  11 digits!"],
    },
    nic:{
        type: String,
        required: true,
        minLength: [12,"NIC must be 12 digits!"],
        maxLength: [12,"NIC must be 12 digits!"],
    },
    dob:{
        type:Date,
        required:[true,"DOB is required"],
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female"],
    },
    password:{
        type:String,
        minLength: [8,"Password must contain at least 8 characters!"],
        required:true,
        select:false,
    },
    role:{
        type:String,
        required:true,
        enum:["Admin","Patient","Doctor"],
    },
    doctorDepartment:{
        type:String,
    },
    docAvatar:{
        public_id:String,
        url:String,
    },
});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 20);
});

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// return the token in string form
userSchema.methods.generateJsonWebToken = function() {
    return jwt.sign(
      { id: this._id }, // Correct: payload is an object
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES } // Now correctly references "JWT_EXPIRES"
    );
  };


// Fix OverwriteModelError by checking if model already exists
export const User = mongoose.models.User || mongoose.model("User", userSchema);
