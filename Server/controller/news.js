const News=require('../models/News');
const ErrorResponse=require('../utils/errorResponse');
const asyncHandler=require('../middleware/async');

// @desc  Get all News
// @route GET /api/v1/news
// @access Public

exports.getNews=asyncHandler(async(req,res,next)=>{
    const news= await News.find();
    res.status(200).json({
        success:true,
        data:news
    })
})



// @desc   Get single News
// @route  GET /api/v1/news/:id
// @access Public
exports.getSingleNews=asyncHandler(async(req,res,next)=>{
    const news=await News.findById(req.params.id);

    if(!news){
        return next(new ErrorResponse(`News not found with id of ${req.params.id}`,404));
    }

    // Increament views
    news.views+=1;
    await news.save({validateBeforeSave:false});


    res.status(200).json({
        success:true,
        data:news
    });
});

// @esc   Get News by slug
// @route GET /api/v1/news/slug/:slug
// @access Public
exports.getNewsByslug=asyncHandler(async(req,res,next)=>{

    const news=await News.findOne({
        slug:req.params.slug
    });

    if(!news){
        return next(new ErrorResponse(`News not found with slug of ${req.params.slug}`,404));
    }

    // Increament views
    news.views+=1;
    await news.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
        data:news
    })
})


// @desc   Create new News
// @route  POST /api/v1/news
// @access Private(Admin only)
exports.createNews=asyncHandler(async(req,res,next)=>{

    const news=await News.create(req.body);

    res.status(201).json({
        success:true,
        data:news
    })
})

// @desc Update News
// @route PUT /api/v1/news/:id
// @access Private(Admin only)
exports.updateNews=asyncHandler(async(req,res,next)=>{

    const news=await News.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });

    if(!news){
        return next(new ErrorResponse(`News not found with id ${req.params.id}`,404))
    }

    res.status(200).json({
        success:true,
        data:news
    });
});


// @desc Delete News
// @route DELETE /api/v1/news/:id
// @access Private (Admin only)
exports.deleteNews=asyncHandler(async(req,res,next)=>{
    const news=await News.findByIdAndDelete(req.params.id);

    if(!news){
        return next(new ErrorResponse(`News not found with id ${req.params.id}`,404))
    }
    res.status(200).json({
        success:true,
        data:{}
    });
})



// @desc   GET upcoming Newss
// @route  GET /api/v1/news/featured
// @access Public
exports.getFeaturedNews=asyncHandler(async(req,res,next)=>{

    const news=await News.find({
        isPublished:true,
        isFeatured:true
    }).sort('-publishDate');

    res.status(200).json({
        success:true,
        count:news.length,
        data:news
    })
})



