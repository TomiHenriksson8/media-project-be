/**
 * @api {post} /notifications/create/comment Create Comment Notification
 * @apiName CreateCommentNotification
 * @apiGroup Notification
 * @apiPermission authenticated user
 *
 * @apiDescription Creates a notification for when a comment is made.
 */

/**
 * @api {post} /notifications/create/follow Create Follow Notification
 * @apiName CreateFollowNotification
 * @apiGroup Notification
 * @apiPermission authenticated user
 *
 * @apiDescription Creates a notification for when a follow action occurs.
 */

/**
 * @api {post} /notifications/create/like Create Like Notification
 * @apiName CreateLikeNotification
 * @apiGroup Notification
 * @apiPermission authenticated user
 *
 * @apiDescription Creates a notification for when a like is given.
 */

/**
 * @api {get} /notifications/get/:userId Get Notifications by User ID
 * @apiName GetNotificationsByUserId
 * @apiGroup Notification
 * @apiPermission authenticated user
 *
 * @apiParam {String} userId User's unique identifier.
 *
 * @apiDescription Retrieves all notifications for a given user.
 */

/**
 * @api {patch} /notifications/markasread/:notiId Mark Notification as Read
 * @apiName MarkNotificationAsRead
 * @apiGroup Notification
 * @apiPermission authenticated user
 *
 * @apiParam {String} notiId Notification's unique identifier.
 *
 * @apiDescription Marks a specified notification as read.
 */

/**
 * @api {delete} /notifications/delete/:notiId Delete Notification
 * @apiName DeleteNotification
 * @apiGroup Notification
 * @apiPermission authenticated user
 *
 * @apiParam {String} notiId Notification's unique identifier.
 *
 * @apiDescription Deletes a specified notification.
 */

/**
 * @api {get} /notifications/getunread/:userId Get Unread Notifications by User ID
 * @apiName GetUnreadNotificationsByUserId
 * @apiGroup Notification
 * @apiPermission authenticated user
 *
 * @apiParam {String} userId User's unique identifier.
 *
 * @apiDescription Retrieves all unread notifications for a given user.
 */
import express from 'express';
import {
  createCommentNotification,
  createFollowNotification,
  createLikeNotification,
  getNotificationById,
  getUnreadNotifications,
  markNotificationAsRead,
  removeNotification,
} from '../controllers/notificationController';
import {authenticate} from '../../middlewares';

const router = express.Router();

router.route('/create/comment').post(authenticate, createCommentNotification);
router.route('/create/follow').post(authenticate, createFollowNotification);
router.route('/create/like').post(authenticate, createLikeNotification);
router.route('/get/:userId').get(authenticate, getNotificationById);
router.route('/markasread/:notiId').patch(authenticate, markNotificationAsRead);
router.route('/delete/:notiId').delete(authenticate, removeNotification);
router.route('/getunread/:userId').get(authenticate, getUnreadNotifications);

export default router;
