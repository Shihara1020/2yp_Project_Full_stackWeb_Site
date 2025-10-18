const express=require('express');
const router=express.Router();
const {getEvent,getEvents,getEventsByType,getEventsByslug,getFeaturedEvents,getUpcomingEvents,deleteEvent,updateEvent,createEvent}=require('../controller/events');


const {protect,authorize}=require('../middleware/auth');



router.route('/upcoming').get(getUpcomingEvents);
router.route('/featured').get(getFeaturedEvents);

router.route('/')
                .get(getEvents)
                .post(protect,authorize('admin','publisher'),createEvent)

router.route('/:id')
                .delete(protect,authorize('admin','publisher'),deleteEvent)
                .put(protect,authorize('admin','publisher'),updateEvent)
                .get(getEvent)

router.route('/slug/:slug').get(getEventsByslug);
router.route('/type/:eventType').get(getEventsByType);


module.exports=router;