import mongoose from 'mongoose';
import validator from 'validator';

const messageSchema = new mongoose.Schema({
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
    message:{
        type: String,
        required: true,
        minlength: [10,"Message must be at least 10 characters!"],
    }
})

export const Message = mongoose.model('Message',messageSchema);
