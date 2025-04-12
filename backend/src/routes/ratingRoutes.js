const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const {authMiddleware,isStoreOwner} = require('../middlewares/authMiddleware');

router.post('/:storeId', authMiddleware() , ratingController.submitRating);

router.put('/:storeId', authMiddleware() , ratingController.modifyRating);

router.get('/store/:storeId', ratingController.getStoreRatings);
router.get('/',ratingController.getAllRatings);
router.get('/user/:userId', authMiddleware() , ratingController.getUserRatings);
router.get('/user/:storeId', isStoreOwner, ratingController.getAllUsersByStore);


module.exports = router;