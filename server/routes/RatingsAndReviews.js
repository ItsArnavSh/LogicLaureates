const express = require('express');
const router = express.Router();

const {createReview , editReview , deleteReview , getAllReviews , getStorageReviews} = require('../controllers/RatingsAndReviews');
const {auth , isRenter} = require('../middlewares/auth');

router.post('/create-review' , auth , isRenter , createReview);
router.put('/edit-review' , auth , isRenter , editReview);
router.delete('/delete-review' , auth , isRenter , deleteReview);
router.get('/get-all-reviews' , auth , isRenter , getAllReviews);
router.get('/get-storage-reviews' , auth , isRenter , getStorageReviews);

module.exports = router;