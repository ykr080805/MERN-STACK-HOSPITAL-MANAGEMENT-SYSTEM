import mongoose, { Mongoose } from "mongoose";
import validator from "validator";
const appointmentSchema = new mongoose.Schema({
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
    appointment_date:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    doctor:{
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        },
    },
    hasVisited:{
        type:Boolean,
        default:false,
    },
    doctorId:{
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    patientId:{
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["Pending", "Accepted" ,"Rejected"],
        default:"Pending",
    },
});

export const Appointment= mongoose.model("Appointment",appointmentSchema);


