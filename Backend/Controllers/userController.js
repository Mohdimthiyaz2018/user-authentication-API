const User = require('../Models/userModel');
const errorHandler = require('../Utils/errorHandler');
const catchAsyncError = require('../Middlewares/catchAsyncError');

// skygoaltech/user/registerUser
exports.registerUser = catchAsyncError ( async (req,res, next) => {
    const data = req.body;

    //checking email is already registered
    const { email } = req.body;
    const userChecker = await User.findOne({email});
    if(userChecker)
    {
        return next(new errorHandler('Email already registered!',404));
    }

    const user = await User.create(data);

    res.status(200).json({
        success: true,
        message: "Registered successfully!",
        user
    })

});

// skygoaltech/user/loginUser
exports.loginUser = catchAsyncError( async (req,res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({email}).select('+password');
    if(!user) // checking email is registered
    {
        return next(new errorHandler('Email or password is incorrect!',401));
    }

    if(! await user.isValidPassword(password)) // checking password is correct
    {
        return next(new errorHandler('Email or password is incorrect!',401));
    }

    const token = user.generateJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    
    const user1 = await User.findOne({email});
    res.status(201).cookie("token",token,options).json({
        success: true,
        message: "Login successfull",
        user1
    })
});

// skygoaltech/user/logoutUser
exports.logoutUser = catchAsyncError( async (req,res, next) => {
    res.status(200).cookie("token",null,{
        expires: new Date(Date.now())
    }).json({
        message: "Logged out successfully"
    })
} )