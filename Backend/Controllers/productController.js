const catchAsyncError = require('../Middlewares/catchAsyncError');

exports.getProducts = (req,res ,next) => {
    res.status(201).json({
        success: true,
        message: "products found"
    })
}