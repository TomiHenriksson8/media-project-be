import express from 'express';
import {
  followUser,
  unFollowUser,
  getFollowersList,
  getFollowingList,
} from '../controllers/followController';
import {authenticate} from '../../middlewares';

const router = express.Router();

router.route('/follow').post(authenticate, followUser);
router.route('/unfollow').delete(authenticate, unFollowUser);
router.route('/followers').get(authenticate, getFollowersList);
router.route('/following').get(authenticate, getFollowingList);

export default router;
