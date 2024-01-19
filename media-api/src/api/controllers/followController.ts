import {NextFunction, Request, Response} from 'express';
import {
  addFollow,
  deleteFollow,
  followersList,
  followingList,
} from '../models/followModel';
import CustomError from '../../classes/CustomError';

const followUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const followerId = res.locals.user.user_id;
    const {followingId} = req.body;

    await addFollow(followerId, followingId);
    res.status(200).json({message: 'Follow successful'});
  } catch (error) {
    console.error(error);
    next(
      new CustomError(
        'Something went wrong with the server. Please try again later.',
        500
      )
    );
  }
};

const unFollowUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const followerId = res.locals.user.user_id;
    const {followingId} = req.body;

    await deleteFollow(followerId, followingId);
    res.status(200).json({message: 'Unfollow successful'});
  } catch (error) {
    console.error(error);
    next(
      new CustomError(
        'Something went wrong whit the server. PLease try again later.',
        500
      )
    );
  }
};

const getFollowersList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = res.locals.user.user_id;
    const followers = await followersList(id);
    res.status(200).json({
      message: `Followers list for user ID ${id} retrieved successfully`,
      followers,
    });
  } catch (error) {
    console.error(error);
    next(
      new CustomError(
        'Something went wrong whit the server. Pleasy try again later.',
        500
      )
    );
  }
};

const getFollowingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = res.locals.user.user_id;
    const following = await followingList(id);
    res.status(200).json({
      message: `Following list for user ID ${id} retrieved successfully.`,
      following,
    });
  } catch (error) {
    console.error(error);
    next(
      new CustomError(
        'Something went wrong whit the server. Please try again later.',
        500
      )
    );
  }
};

export {followUser, unFollowUser, getFollowersList, getFollowingList};
