import express from 'express';
import { createCommentNotification, createFollowNotification, createLikeNotification, getNotificationById, getUnreadNotifications, markNotificationAsRead, removeNotification } from '../controllers/notificationController';
import { authenticate } from '../../middlewares';


const router = express.Router();

router.route('/create/comment').post(authenticate, createCommentNotification);
router.route('/create/follow').post(authenticate, createFollowNotification);
router.route('/create/like').post(createLikeNotification);
router.route('/get/:userId').get(authenticate, getNotificationById);
router.route('/markasread/:notiId').patch(markNotificationAsRead);
router.route('/delete/:notiId').delete(removeNotification);
router.route('/getunread/:userId').get(getUnreadNotifications);


export default router