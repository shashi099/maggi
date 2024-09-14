const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync.js');
const reviewController = require('../controller/review.js');
 

// Route main  // 4 sep 2024
// Route Review
router.post('/review', wrapAsync(
  reviewController.setReview
));
   



module.exports = router;