import express from 'express';
import ReviewsCtrl from './reviews.controller.js';

const router = express.Router();

router.route('/book/:id').get(ReviewsCtrl.apiGetReviews);
router.route('/new').post(ReviewsCtrl.apiPostReview);
router.route('/:id')
  .get(ReviewsCtrl.apiGetReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview);

export default router;
