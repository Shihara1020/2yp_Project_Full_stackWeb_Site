const express=require('express');
const router=express.Router();
const {getContributor,getContributors,createContributor,updateContributor,deleteContributor}=require('../controller/contributors');


const {protect,authorize}=require('../middleware/auth');



router.route('/')
                .get(getContributors)
                .post(protect,authorize('admin'),createContributor)

router.route('/:id')
                .delete(protect,authorize('admin'),deleteContributor)
                .put(protect,authorize('admin'),updateContributor)
                .get(getContributor)

module.exports=router;