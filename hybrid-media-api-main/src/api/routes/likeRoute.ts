/**
 * @api {get} /likes List all likes
 * @apiName GetLikes
 * @apiGroup Like
 */

/**
 * @api {post} /likes Add a new like
 * @apiName AddLike
 * @apiGroup Like
 * @apiPermission authenticated user
 *
 * @apiParam {Number} media_id ID of the media to be liked.
 */

/**
 * @api {get} /likes/bymedia/:media_id List likes by media ID
 * @apiName GetLikesByMedia
 * @apiGroup Like
 *
 * @apiParam {Number} media_id Media's unique identifier.
 */

/**
 * @api {get} /likes/bymedia/user/:media_id Get like by media ID and authenticated user
 * @apiName GetLikeByMediaAndUser
 * @apiGroup Like
 * @apiPermission authenticated user
 *
 * @apiParam {Number} media_id Media's unique identifier.
 */

/**
 * @api {get} /likes/byuser/:id List likes by user ID
 * @apiName GetLikesByUser
 * @apiGroup Like
 * @apiPermission authenticated user
 *
 * @apiParam {String} id User's unique identifier.
 */

/**
 * @api {get} /likes/count/:id Get like count by media ID
 * @apiName GetLikeCountByMedia
 * @apiGroup Like
 *
 * @apiParam {Number} id Media's unique identifier.
 */

/**
 * @api {delete} /likes/:id Delete a like
 * @apiName DeleteLike
 * @apiGroup Like
 * @apiPermission authenticated user
 *
 * @apiParam {Number} id Like's unique identifier.
 */
import express from 'express';
import {
  likeListGet,
  likeListByMediaIdGet,
  likeListByUserIdGet,
  likePost,
  likeDelete,
  likeCountByMediaIdGet,
  likeByMediaIdAndUserIdGet,
} from '../controllers/likeController';
import {authenticate, validationErrors} from '../../middlewares';
import {body} from 'express-validator';

const router = express.Router();

router
  .route('/')
  .get(likeListGet)
  .post(
    authenticate,
    body('media_id').notEmpty().isInt(),
    validationErrors,
    likePost
  );

router.route('/bymedia/:media_id').get(likeListByMediaIdGet);

router
  .route('/bymedia/user/:media_id')
  .get(authenticate, likeByMediaIdAndUserIdGet);

router.route('/byuser/:id').get(authenticate, likeListByUserIdGet);

router.route('/count/:id').get(likeCountByMediaIdGet);

router.route('/:id').delete(authenticate, likeDelete);

export default router;
