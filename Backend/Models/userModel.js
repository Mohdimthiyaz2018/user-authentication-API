const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: [true,"Please fill out the email!"],
        unique: [true, "Duplicate email found!"],
        validate: [validator.isEmail,"Please enter the valid email"]
    },
    password: {
        type: String,
        required: [true,"Please enter the password"],
        maxlength: [8, "Password cannot exceed 8 characters!"],
        select: false
    },
    firstName: {
        type: String,
        required: [true,"Please enter the name"]
    },
    lastName: {
        type: String
    },
    phone: {
        type: Number,
        required: [true,"Please enter the mobile number"]
    },
    role: {
        type: String,
        default: "user",
    }
});

// hashing the password
userSchema.pre('save', async function (next) {
    if(this.password != null)
    {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

// generating json web token
userSchema.methods.generateJwtToken = async function(){
    return jwt.sign({id: this.id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
};

// checking password is correct
userSchema.methods.isValidPassword = async function(enterredPassword) {
    return await bcrypt.compare(enterredPassword,this.password);
}

const userModel = mongoose.model("user",userSchema);
module.exports = userModel;