/**
 * @api {get} /followers/:id List Followers
 * @apiName ListFollowers
 * @apiGroup Follow
 *
 * @apiParam {String} id User's unique identifier to get followers for.
 */

/**
 * @api {get} /following/:id List Following
 * @apiName ListFollowing
 * @apiGroup Follow
 *
 * @apiParam {String} id User's unique identifier to get following for.
 */

/**
 * @api {get} /followers/count/:id Followers Count
 * @apiName FollowersCount
 * @apiGroup Follow
 *
 * @apiParam {String} id User's unique identifier to get followers count for.
 */

/**
 * @api {get} /following/count/:id Following Count
 * @apiName FollowingCount
 * @apiGroup Follow
 *
 * @apiParam {String} id User's unique identifier to get following count for.
 */

/**
 * @api {get} /check/:id Check Follow Status
 * @apiName CheckFollowStatus
 * @apiGroup Follow
 *
 * @apiParam {String} id User's unique identifier to check follow status against.
 */

/**
 * @api {post} /:id Follow User
 * @apiName FollowUser
 * @apiGroup Follow
 *
 * @apiParam {String} id User's unique identifier to follow.
 */

/**
 * @api {delete} /:id Unfollow User
 * @apiName UnfollowUser
 * @apiGroup Follow
 *
 * @apiParam {String} id User's unique identifier to unfollow.
 */
import express from 'express';
import { followLGet, followingLtGet, follow, unfollow, followingCount, followersCount, checkFollowStatus } from '../controllers/followController';
import { authenticate } from '../../middlewares';

const router = express.Router();

router.route('/followers/:id').get(followLGet);
router.route('/following/:id').get(followingLtGet);
router.route('/followers/count/:id').get(followersCount);
router.route('/following/count/:id').get(followingCount);
router.route('/check/:id').get(checkFollowStatus);
router.route('/:id').post(follow);
router.route('/:id').delete(unfollow);

export default router;
