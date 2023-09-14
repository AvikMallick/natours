const express = require('express');

const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

// we need this option because by default each router only have access to the parameters of their specific routes
const router = express.Router({ mergeParams: true });

// all below end up in this route
// POST /tour/234fad4/reviews
// GET /tour/234fad4/reviews
// POST /reviews

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );

module.exports = router;
