const Contributor=require('../models/Contributor');
const ErrorResponse=require('../utils/errorResponse');
const asyncHandler=require('../middleware/async');

// @desc  Get all contributors
// @route GET /api/v1/contributors
// @access Public

exports.getContributors=asyncHandler(async(req,res,next)=>{
    const contributor=await Contributor.find();
    res.status(200).json({
        success:true,
        data:contributor
    })
})



// @desc   Get single contributor
// @route  GET /api/v1/contributors/:id
// @access Public
exports.getContributor=asyncHandler(async(req,res,next)=>{
    const contributor=await Contributor.findById(req.params.id);

    if(!contributor){
        return next(new ErrorResponse(`Contributor not found with id of ${req.params.id}`,404));
    }

    res.status(200).json({
        success:true,
        data:contributor
    });
});


// @desc   Create new contributor
// @route  POST /api/v1/contributors
// @access Private(Admin only)
exports.createContributor=asyncHandler(async(req,res,next)=>{

    const contributor=await Contributor.create(req.body);

    res.status(201).json({
        success:true,
        data:contributor
    })
})

// @desc Update contributor
// @route PUT /api/v1/contributors/:id
// @access Private(Admin only)
exports.updateContributor=asyncHandler(async(req,res,next)=>{

    const contributor=await Contributor.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });

    if(!contributor){
        return next(new ErrorResponse(`Contributor not found with id ${req.params.id}`,404))
    }

    res.status(200).json({
        success:true,
        data:contributor
    });
});


// @desc Delete contributor
// @route DELETE /api/v1/contributors/:id
exports.deleteContributor=asyncHandler(async(req,res,next)=>{
    const contributor=await Contributor.findByIdAndDelete(req.params.id);

    if(!contributor){
        return next(new ErrorResponse(`Contributor not found with id ${req.params.id}`,404))
    }
    res.status(200).json({
        success:true,
        data:{}
    });
})