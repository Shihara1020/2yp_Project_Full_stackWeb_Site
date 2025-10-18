const express=require('express');
const router=express.Router();
const {getNews,getSingleNews,getFeaturedNews,deleteNews,updateNews,createNews,getNewsByslug}=require('../controller/news');


const {protect,authorize}=require('../middleware/auth');


router.route('/featured').get(getFeaturedNews);
router.route('/')
                .get(getNews)
                .post(protect,authorize('admin','publisher'),createNews);

router.route('/:id')
                .delete(protect,authorize('admin','publisher'),deleteNews)
                .put(protect,authorize('admin','publisher'),updateNews)
                .get(getSingleNews)
            
router.route('/slug/:slug').get(getNewsByslug);

module.exports=router;