import { Request, Response, NextFunction } from "express";
import CustomError from '../../classes/CustomError';
import promisePool from "../../lib/db";
import { createComNotification, createFolNotification, createLiNotification, deleteNotification, fetchNotificationsById, markNotiAsRead } from "../models/notificationModel";


const createCommentNotification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, notiContent, refId } = req.body;
    if (!userId || !notiContent || !refId) {
      throw new CustomError('Invalid request body', 400);
    }
    await createComNotification(userId, notiContent, refId);
    res.status(201).send('Notification created');
  } catch (e) {
    console.error(e);
    next(e);
  }
}

const createFollowNotification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, notiContent, refId } = req.body;
    if (!userId || !notiContent || !refId) {
      throw new CustomError('Invalid request body', 400);
    }
    await createFolNotification(userId, notiContent, refId);
    res.status(201).send('Notification created');
  } catch (e) {
    console.error(e);
    next(e);
  }
}


const createLikeNotification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, notiContent, refId } = req.body;
    if (!userId || !notiContent || !refId) {
      throw new CustomError('Invalid request body', 400);
    }
    await createLiNotification(userId, notiContent, refId);
    res.status(201).send('Notification created');
  } catch (e) {
    console.error(e);
    next(e);
  }
}

const getNotificationById = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  try {
    await fetchNotificationsById(Number(userId));
    res.status(200).send('Notification fetched');
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const markNotificationAsRead = async (req: Request, res: Response, next: NextFunction) => {
  const { notiId } = req.params;
  try {
    await markNotiAsRead(Number(notiId));
    res.status(200).send('Notification marked as read');
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const removeNotification = async (req: Request, res: Response, next: NextFunction) => {
  const { notiId } = req.params;
  try {
    await deleteNotification(Number(notiId));
    res.status(200).send('Notification removed');
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getUnreadNotifications = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  try {
    await fetchNotificationsById(Number(userId));
    res.status(200).send('Notification fetched');
  } catch (e) {
    console.error(e);
    throw e;
  }
}
