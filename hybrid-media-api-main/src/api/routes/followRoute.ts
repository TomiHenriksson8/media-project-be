import express from 'express';
import { followLGet, followingLtGet, follow, unfollow, followingCount, followersCount, checkFollowStatus } from '../controllers/followController';
import { authenticate } from '../../middlewares';


const router = express.Router();

router.route('/followers/:id').get(followLGet);
router.route('/following/:id').get(followingLtGet);
router.route('/followers/count/:id').get(followingCount);
router.route('/following/count/:id').get(followersCount);
router.route('/check/:id').get(checkFollowStatus);
router.route('/:id').post(follow);
router.route('/:id').delete(unfollow);


export default router;

