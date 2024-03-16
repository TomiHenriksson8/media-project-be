/**
 * @api {get} /media List all media
 * @apiName GetMediaList
 * @apiGroup Media
 */

/**
 * @api {post} /media Create a media item
 * @apiName CreateMedia
 * @apiGroup Media
 * @apiPermission authenticated user
 *
 * @apiParam {String} title Title of the media.
 * @apiParam {String} description Description of the media.
 * @apiParam {String} filename Filename of the media.
 * @apiParam {String} media_type Type of the media (e.g., image, video).
 * @apiParam {Number} filesize Size of the media file.
 */

/**
 * @api {get} /media/user/:userId List media by user ID
 * @apiName GetMediaByUser
 * @apiGroup Media
 *
 * @apiParam {String} userId User's unique identifier.
 */

/**
 * @api {get} /media/title/:title List media by title
 * @apiName GetMediaByTitle
 * @apiGroup Media
 *
 * @apiParam {String} title Title of the media.
 */

/**
 * @api {get} /media/followed/:userId List media by followed users
 * @apiName GetMediaByFollowedUsers
 * @apiGroup Media
 *
 * @apiParam {String} userId User's unique identifier.
 */

/**
 * @api {get} /media/user/liked/:userId List liked media by user ID
 * @apiName GetLikedMediaByUser
 * @apiGroup Media
 *
 * @apiParam {String} userId User's unique identifier.
 */

/**
 * @api {get} /media/mostliked List most liked media
 * @apiName GetMostLikedMedia
 * @apiGroup Media
 */

/**
 * @api {get} /media/mostcommented List most commented media
 * @apiName GetMostCommentedMedia
 * @apiGroup Media
 */

/**
 * @api {get} /media/highestrated List highest-rated media
 * @apiName GetHighestRatedMedia
 * @apiGroup Media
 */

/**
 * @api {get} /media/:id Get a specific media item
 * @apiName GetMedia
 * @apiGroup Media
 *
 * @apiParam {Number} id Media item's unique identifier.
 */

/**
 * @api {put} /media/:id Update a media item
 * @apiName UpdateMedia
 * @apiGroup Media
 * @apiPermission authenticated user
 *
 * @apiParam {Number} id Media item's unique identifier.
 * @apiParam {String} [title] (Optional) New title of the media.
 * @apiParam {String} [description] (Optional) New description of the media.
 */

/**
 * @api {delete} /media/:id Delete a media item
 * @apiName DeleteMedia
 * @apiGroup Media
 * @apiPermission authenticated user
 *
 * @apiParam {Number} id Media item's unique identifier.
 */
import express from 'express';
import {
  mediaListGet,
  mediaGet,
  mediaPost,
  mediaPut,
  mediaDelete,
  mediaListMostLikedGet,
  mediaListMostCommentedGet,
  mediaListHighestRatedGet,
  mediaGetByUserId,
  mediaGetByTitle,
  mediaGetByFollowedUsers,
  getLikedMediaByUserId,
} from '../controllers/mediaController';
import {authenticate, validationErrors} from '../../middlewares';
import {body} from 'express-validator';

const router = express.Router();

router
  .route('/')
  .get(mediaListGet)
  .post(
    authenticate,
    body('title').notEmpty().isString().escape(),
    body('description').notEmpty().isString().escape(),
    body('filename').notEmpty().isString().escape(),
    body('media_type').notEmpty().isString().escape(),
    body('filesize').notEmpty().isNumeric().escape(),
    validationErrors,
    mediaPost
  );

router.route('/user/:userId').get(mediaGetByUserId);
router.route('/title/:title').get(mediaGetByTitle);
router.route('/followed/:userId').get(mediaGetByFollowedUsers);
router.route('/user/liked/:userId').get(getLikedMediaByUserId);
router.route('/mostliked').get(mediaListMostLikedGet);
router.route('/mostcommented').get(mediaListMostCommentedGet);
router.route('/highestrated').get(mediaListHighestRatedGet);

router
  .route('/:id')
  .get(mediaGet)
  .put(
    authenticate,
    body('title').optional().isString().escape(),
    body('description').optional().isString().escape(),
    validationErrors,
    mediaPut
  )
  .delete(authenticate, mediaDelete);

export default router;
