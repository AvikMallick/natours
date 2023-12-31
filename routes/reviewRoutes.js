const express = require('express');

const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

// we need this option because by default each router only have access to the parameters of their specific routes
const router = express.Router({ mergeParams: true });

// all below end up in this route
// POST /tour/234fad4/reviews
// GET /tour/234fad4/reviews
// POST /reviews

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;
