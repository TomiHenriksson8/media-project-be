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
