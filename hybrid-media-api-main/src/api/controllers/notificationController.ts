import {Request, Response, NextFunction} from 'express';
import CustomError from '../../classes/CustomError';
import promisePool from '../../lib/db';
import {
  createComNotification,
  createFolNotification,
  createLiNotification,
  deleteNotification,
  fetchNotificationsById,
  getUnreadNotificationsCount,
  markNotiAsRead,
} from '../models/notificationModel';

const createCommentNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {userId, notiContent, refId} = req.body;
    if (!userId || !notiContent || !refId) {
      throw new CustomError('Invalid request body', 400);
    }
    await createComNotification(userId, notiContent, refId);
    res.status(201).json({message: 'Notification created'});
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const createFollowNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {userId, notiContent, refId} = req.body;
    if (!userId || !notiContent || !refId) {
      throw new CustomError('Invalid request body', 400);
    }
    await createFolNotification(userId, notiContent, refId);
    res.status(201).send('Notification created');
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const createLikeNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {userId, notiContent, refId} = req.body;
    if (!userId || !notiContent || !refId) {
      throw new CustomError('Invalid request body', 400);
    }
    await createLiNotification(userId, notiContent, refId);
    res.status(201);
    res.json({message: 'Like notification created successfully'});
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getNotificationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {userId} = req.params;
  try {
    const notifications = await fetchNotificationsById(Number(userId));
    res.status(200).json(notifications);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const markNotificationAsRead = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {notiId} = req.params;
  try {
    await markNotiAsRead(Number(notiId));
    res.status(200).json({message: 'Notification marked as read'});
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const removeNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {notiId} = req.params;
  try {
    await deleteNotification(Number(notiId));
    res.status(200).json({message: 'Notification removed'});
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getUnreadNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {userId} = req.params;
  try {
    const notis = await getUnreadNotificationsCount(Number(userId));
    console.log(notis);
    res.status(200).json({message: 'count of notis', count: notis});
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export {
  createCommentNotification,
  createFollowNotification,
  createLikeNotification,
  getNotificationById,
  markNotificationAsRead,
  removeNotification,
  getUnreadNotifications,
};
