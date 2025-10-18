const Projects=require('../models/Project');
const ErrorResponse=require('../utils/errorResponse');
const asyncHandler=require('../middleware/async');

// @desc  Get all projects
// @route GET /api/v1/projects
// @access Public

exports.getProjects=asyncHandler(async(req,res,next)=>{
    const projects= await Projects.find();
    res.status(200).json({
        success:true,
        data:projects
    })
})



// @desc   Get single projects
// @route  GET /api/v1/projects/:id
// @access Public
exports.getSingleProject=asyncHandler(async(req,res,next)=>{
    const projects=await Projects.findById(req.params.id);

    if(!projects){
        return next(new ErrorResponse(`Projects not found with id of ${req.params.id}`,404));
    }

    res.status(200).json({
        success:true,
        data:projects
    });
});

// @esc   Get projects by slug
// @route GET /api/v1/projects/slug/:slug
// @access Public
exports.getProjectsByslug=asyncHandler(async(req,res,next)=>{

    const projects=await Projects.find({
        slug:req.params.slug
    });

    if(!projects){
        return next(new ErrorResponse(`Projects not found with slug of ${req.params.slug}`,404));
    }



    res.status(200).json({
        success:true,
        data:projects
    })
})


// @desc   Create new projects
// @route  POST /api/v1/projects
// @access Private(Admin only)
exports.createProjects=asyncHandler(async(req,res,next)=>{

    const projects=await Projects.create(req.body);

    res.status(201).json({
        success:true,
        data:projects
    })
})

// @desc Update projects
// @route PUT /api/v1/projects/:id
// @access Private(Admin only)
exports.updateProjects=asyncHandler(async(req,res,next)=>{

    const projects=await Projects.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });

    if(!projects){
        return next(new ErrorResponse(`Projects not found with id ${req.params.id}`,404))
    }

    res.status(200).json({
        success:true,
        data:projects
    });
});


// @desc Delete projects
// @route DELETE /api/v1/projects/:id
// @access Private (Admin only)
exports.deleteProjects=asyncHandler(async(req,res,next)=>{
    const projects=await Projects.findByIdAndDelete(req.params.id);

    if(!projects){
        return next(new ErrorResponse(`projects not found with id ${req.params.id}`,404))
    }
    res.status(200).json({
        success:true,
        data:{}
    });
})



// @desc   GET projects by status
// @route  GET /api/v1/projects/status/:status
// @access Public
exports.getProjectsByStatus=asyncHandler(async(req,res,next)=>{

    const projects=await Projects.find({
        status:req.params.status,
        isPublic:true
    }).sort('-createdAt');

    res.status(200).json({
        success:true,
        count:projects.length,
        data:projects
    })
})

// @desc   GET projects by feature
// @route  GET /api/v1/projects/featured
// @access Public
exports.getFeaturedProjects=asyncHandler(async(req,res,next)=>{

    const projects=await Projects.find({
        isFeatured:true,
        isPublic:true
    }).sort('-createdAt');

    res.status(200).json({
        success:true,
        count:projects.length,
        data:projects
    })
})

// @desc    Add team member to project
// @route   PUT /api/v1/projects/:id/team-members
// @access  Private (Admin only)
exports.addTeamMember = asyncHandler(async (req, res, next) => {
    const project = await Projects.findById(req.params.id);

    const {member,role}=req.body;

    // Check if member is already in the team
    const exitingMember=project.teamMembers.find(
        teamMember=>teamMember.member.toString()===member
    );

    if(exitingMember){
        return next(new ErrorResponse(`Member is already part of this project`,404));
    }

    project.teamMembers.push({
        member,
        role,
        joinDate:Date.now()
    });

    await project.save();

    res.status(200).json({
        success:true,
        data:project
    });
});

// @desc    Remove team member from project
// @route   DELETE /api/v1/projects/:id/team-members/:memberId
// @access  Private (Admin only)
exports.removeTeamMember = asyncHandler(async (req, res, next) => {
    const project = await Projects.findById(req.params.id);

    if (!project) {
        return next(
            new ErrorResponse(`Project not found with id of ${req.params.id}`, 404)
        );
    }

    // Remove team member
    project.teamMembers = project.teamMembers.filter(
        teamMember => teamMember.member.toString() !== req.params.memberId
    );

    await project.save();

    res.status(200).json({
        success: true,
        data: project
    });
});

// @desc    Add milestone to project
// @route   PUT /api/v1/projects/:id/milestones
// @access  Private (Admin only)
exports.addMilestone = asyncHandler(async (req, res, next) => {
    const project = await Projects.findById(req.params.id);

    if (!project) {
        return next(
            new ErrorResponse(`Project not found with id of ${req.params.id}`, 404)
        );
    }

    project.milestones.push(req.body);
    await project.save();

    res.status(200).json({
        success: true,
        data: project
    });
});

// @desc    Update milestone
// @route   PUT /api/v1/projects/:id/milestones/:milestoneId
// @access  Private (Admin only)
exports.updateMilestone = asyncHandler(async (req, res, next) => {
    const project = await Projects.findById(req.params.id);

    if (!project) {
        return next(
            new ErrorResponse(`Project not found with id of ${req.params.id}`, 404)
        );
    }

    const milestone = project.milestones.id(req.params.milestoneId);

    if (!milestone) {
        return next(
            new ErrorResponse(`Milestone not found with id of ${req.params.milestoneId}`, 404)
        );
    }

    // Update milestone fields
    Object.keys(req.body).forEach(key => {
        milestone[key] = req.body[key];
    });

    await project.save();

    res.status(200).json({
        success: true,
        data: project
    });
});




