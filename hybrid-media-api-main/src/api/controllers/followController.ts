import { Request, Response, NextFunction } from "express";
import CustomError from '../../classes/CustomError';
import { addFollow, deleteFollow, followersList, followingList } from "../models/followModel";


const followLGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const followers = await followersList(Number(req.params.id));
    if (followers) {
      res.json(followers);
      return;
    }
    next(new CustomError('No followers found', 404));
  } catch (error) {
    next(error);
  }
};


const followingLtGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const following = await followingList(Number(req.params.id));
    if (following) {
      res.json(following);
      return;
    }
    next(new CustomError('No following found', 404));
  } catch (error) {
    next(error);
  }
};


const follow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await addFollow(Number(req.params.id), Number(req.body.followingId));
    if (result) {
      res.json({ message: 'Followed' });
      return;
    }
    next(new CustomError('Failed to follow', 500));
  } catch (error) {
    next(error);
  }
};

const unfollow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await deleteFollow(Number(req.params.id), Number(req.body.followingId));
    if (result) {
      res.json({ message: 'Unfollowed' });
      return;
    }
    next(new CustomError('Failed to unfollow', 500));
  } catch (error) {
    next(error);
  }
};


export { followLGet, followingLtGet, follow, unfollow };
