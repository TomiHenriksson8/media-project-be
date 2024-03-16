/**
 * @api {get} /comments List all comments
 * @apiName GetComments
 * @apiGroup Comment
 */

/**
 * @api {post} /comments Post a comment
 * @apiName PostComment
 * @apiGroup Comment
 * @apiPermission authenticated user
 *
 * @apiParam {String} comment_text Text content of the comment.
 * @apiParam {Number} media_id ID of the media to which the comment is associated.
 */

/**
 * @api {get} /comments/bymedia/:id List comments by media ID
 * @apiName GetCommentsByMedia
 * @apiGroup Comment
 *
 * @apiParam {Number} id Media ID to list comments for.
 */

/**
 * @api {get} /comments/byuser List comments by user
 * @apiName GetCommentsByUser
 * @apiGroup Comment
 * @apiPermission authenticated user
 */

/**
 * @api {get} /comments/count/:id Get comment count by media ID
 * @apiName GetCommentCountByMedia
 * @apiGroup Comment
 *
 * @apiParam {Number} id Media ID to get comment count for.
 */

/**
 * @api {get} /comments/:id Get a single comment
 * @apiName GetComment
 * @apiGroup Comment
 *
 * @apiParam {Number} id Comment ID.
 */

/**
 * @api {put} /comments/:id Update a comment
 * @apiName UpdateComment
 * @apiGroup Comment
 * @apiPermission authenticated user
 *
 * @apiParam {String} comment_text New text content of the comment.
 */

/**
 * @api {delete} /comments/:id Delete a comment
 * @apiName DeleteComment
 * @apiGroup Comment
 * @apiPermission authenticated user
 *
 * @apiParam {Number} id Comment ID to delete.
 */
import express from 'express';
import {
  commentListGet,
  commentListByMediaIdGet,
  commentListByUserGet,
  commentCountByMediaIdGet,
  commentGet,
  commentPost,
  commentPut,
  commentDelete,
} from '../controllers/commentController';
import {authenticate, validationErrors} from '../../middlewares';
import {body} from 'express-validator';

const router = express.Router();

router
  .route('/')
  .get(commentListGet)
  .post(
    authenticate,
    body('comment_text').notEmpty().isString().escape(),
    body('media_id').notEmpty().isInt(),
    validationErrors,
    commentPost
  );

router.route('/bymedia/:id').get(commentListByMediaIdGet);

router.route('/byuser').get(authenticate, commentListByUserGet);

router.route('/count/:id').get(commentCountByMediaIdGet);

router
  .route('/:id')
  .get(commentGet)
  .put(
    authenticate,
    body('comment_text').notEmpty().isString().escape(),
    validationErrors,
    commentPut
  )
  .delete(authenticate, commentDelete);

export default router;
