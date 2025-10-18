const express=require('express');
const router=express.Router();
const {getProjects,getSingleProject,getFeaturedProjects,getProjectsByslug,createProjects,updateMilestone,updateProjects,deleteProjects,addMilestone,addTeamMember,removeTeamMember,getProjectsByStatus}=require('../controller/projects');


const {protect,authorize}=require('../middleware/auth');



router
    .route('/')
    .get(getProjects)
    .post(protect, authorize('admin', 'publisher'), createProjects);

router
    .route('/featured')
    .get(getFeaturedProjects);

router
    .route('/status/:status')
    .get(getProjectsByStatus);

router
    .route('/slug/:slug')
    .get(getProjectsByslug);

router
    .route('/:id')
    .get(getSingleProject)
    .put(protect, authorize('admin', 'publisher'), updateProjects)
    .delete(protect, authorize('admin'), deleteProjects);

router
    .route('/:id/team-members')
    .put(protect, authorize('admin', 'publisher'), addTeamMember);

router
    .route('/:id/team-members/:memberId')
    .delete(protect, authorize('admin', 'publisher'), removeTeamMember);


router
    .route('/:id/milestones')
    .put(protect, authorize('admin', 'publisher'), addMilestone);

router
    .route('/:id/milestones/:milestoneId')
    .put(protect, authorize('admin', 'publisher'), updateMilestone);
module.exports=router;