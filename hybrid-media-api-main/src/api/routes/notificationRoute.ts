import express from 'express';
import { createCommentNotification, createFollowNotification, createLikeNotification, getNotificationById, getUnreadNotifications, markNotificationAsRead, removeNotification } from '../controllers/notificationController';


const router = express.Router();

router.route('/create/comment').post(createCommentNotification);
router.route('/create/follow').post(createFollowNotification);
router.route('/create/like').post(createLikeNotification);
router.route('/get/:userId').get(getNotificationById);
router.route('/markasread/:notiId').patch(markNotificationAsRead);
router.route('/delete/:notiId').delete(removeNotification);
router.route('/getunread/:userId').get(getUnreadNotifications);

export default router
