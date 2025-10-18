const Event=require('../models/Event');
const ErrorResponse=require('../utils/errorResponse');
const asyncHandler=require('../middleware/async');

// @desc  Get all Events
// @route GET /api/v1/events
// @access Public

exports.getEvents=asyncHandler(async(req,res,next)=>{
    const event= await Event.find();
    res.status(200).json({
        success:true,
        data:event
    })
})



// @desc   Get single Event
// @route  GET /api/v1/events/:id
// @access Public
exports.getEvent=asyncHandler(async(req,res,next)=>{
    const event=await Event.findById(req.params.id);

    if(!event){
        return next(new ErrorResponse(`Event not found with id of ${req.params.id}`,404));
    }

    res.status(200).json({
        success:true,
        data:event
    });
});


// @desc   Create new Event
// @route  POST /api/v1/events
// @access Private(Admin only)
exports.createEvent=asyncHandler(async(req,res,next)=>{

    const event=await Event.create(req.body);

    res.status(201).json({
        success:true,
        data:event
    })
})

// @desc Update Event
// @route PUT /api/v1/events/:id
// @access Private(Admin only)
exports.updateEvent=asyncHandler(async(req,res,next)=>{

    const event=await Event.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });

    if(!event){
        return next(new ErrorResponse(`Event not found with id ${req.params.id}`,404))
    }

    res.status(200).json({
        success:true,
        data:event
    });
});


// @desc Delete Event
// @route DELETE /api/v1/events/:id
// @access Private (Admin only)
exports.deleteEvent=asyncHandler(async(req,res,next)=>{
    const event=await Event.findByIdAndDelete(req.params.id);

    if(!event){
        return next(new ErrorResponse(`Event not found with id ${req.params.id}`,404))
    }
    res.status(200).json({
        success:true,
        data:{}
    });
})

// @desc   GET upcoming events
// @route  GET /api/v1/events/upcoming
// @access Public
exports.getUpcomingEvents=asyncHandler(async(req,res,next)=>{
    console.log('upcoming...')

    const events=await Event.find({
        status:'upcoming',
        isPublished:true,
        startDate:{$gt:new Date()}
    }).sort('startDate');

    res.status(200).json({
        success:true,
        count:events.length,
        data:events
    })
})

// @desc   GET upcoming events
// @route  GET /api/v1/events/featured
// @access Public
exports.getFeaturedEvents=asyncHandler(async(req,res,next)=>{

    const events=await Event.find({
        isPublished:true,
        isFeatured:true
    }).sort('startDate');

    res.status(200).json({
        success:true,
        count:events.length,
        data:events
    })
})


// @desc   Get events by type
// @route  GET /api/v1/events/type/:eventType
// @access Public
exports.getEventsByType=asyncHandler(async(req,res,next)=>{

    const events=await Event.find({
        eventType:req.params.eventType,
        isFeatured:true
    }).sort('startDate');

    res.status(200).json({
        success:true,
        count:events.length,
        data:events
    })
})

// @esc   Get event by slug
// @route GET /api/v1/events/slug/:slug
// @access Public
exports.getEventsByslug=asyncHandler(async(req,res,next)=>{

    const events=await Event.find({
        slug:req.params.slug
    });

    if(!events){
        return next(new ErrorResponse(`Event not found with slug of ${req.params.slug}`,404));
    }

    res.status(200).json({
        success:true,
        data:events
    })
})