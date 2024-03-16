/* eslint-disable @typescript-eslint/no-unused-vars */
import {NextFunction, Request, Response} from 'express';
import {ErrorResponse} from '@sharedTypes/MessageTypes';
import CustomError from './classes/CustomError';
import jwt from 'jsonwebtoken';
import {TokenContent} from '@sharedTypes/DBTypes';
import path from 'path';
import getVideoThumbnail from './utils/getVideoThumbnail';
import jimp from 'jimp';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(`🔍 - Not Found - ${req.originalUrl}`, 404);
  next(error);
};

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction,
) => {
  console.error('errorHandler', err);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('authenticate');
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      next(new CustomError('Authentication failed', 401));
      return;
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as TokenContent;

    console.log(decodedToken);
    if (!decodedToken) {
      next(new CustomError('Authentication failed', 401));
      return;
    }

    res.locals.user = decodedToken;
    next();
  } catch (error) {
    next(new CustomError('Authentication failed', 401));
  }
};

const makeThumbnail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.file) {
      console.log('No file found in the request');
      next(new CustomError('File not uploaded', 500));
      return;
    }
    console.log('Uploaded file details:', req.file);

    const src = path.join(__dirname, 'uploads', req.file.filename);
    console.log('Full path to the uploaded file:', src);

    if (!req.file.mimetype.includes('video')) {
      console.log('Processing as an image, not a video');
      const image = await jimp.read(src);
      image.resize(320, jimp.AUTO);
      const thumbPath = src + '-thumb.png';
      await image.writeAsync(thumbPath);
      console.log('Image thumbnail created at:', thumbPath);
      next();
      return;
    }

    console.log('Processing as a video');
    await getVideoThumbnail(src);
    console.log('Video thumbnail should have been created');
    next();
  } catch (error) {
    console.error('Error during thumbnail generation:', error);
    next(new CustomError('Thumbnail not created', 500));
  }
};


export {notFound, errorHandler, authenticate, makeThumbnail};
