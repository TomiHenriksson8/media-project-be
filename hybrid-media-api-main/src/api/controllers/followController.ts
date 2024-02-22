import { Request, Response, NextFunction } from "express";
import CustomError from '../../classes/CustomError';
import { addFollow, checkFollow, deleteFollow, followersList, followingList } from "../models/followModel";
import { RowDataPacket } from "mysql2";


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
    // Extract followingId from the query parameters
    const followingId = Number(req.query.followingId);
    // Extract the user ID (of the person who wants to unfollow someone) from the URL parameters
    const userId = Number(req.params.id);

    if (!followingId || !userId) {
      res.status(400).json({ message: 'Missing parameters' });
      return;
    }

    const result = await deleteFollow(userId, followingId);
    if (result) {
      res.json({ message: 'Unfollowed' });
      return;
    }
    next(new CustomError('Failed to unfollow', 500));
  } catch (error) {
    next(error);
  }
};

const followingCount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const following = await followingList(Number(req.params.id)) as RowDataPacket[];
    if (following) {
      res.json({count: following.length});
      return;
    }
    next(new CustomError('No following found', 404));
  } catch (error) {
    next(error);
  }
};

const followersCount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const followers = await followersList(Number(req.params.id)) as RowDataPacket[];
    if (followers) {
      res.json({count: followers.length});
      return;
    }
    next(new CustomError('No followers found', 404));
  } catch (error) {
    next(error);
  }
};

const checkFollowStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const followingId = Number(req.query.followingId);
    const userId = Number(req.params.id);

    if (!followingId || !userId) {
      res.status(400).json({ message: 'Missing parameters' });
      return;
    }
    const result = await checkFollow(userId, followingId);
    res.json({ following: result });
  } catch (error) {
    next(error);
  }
};


export { followLGet, followingLtGet, follow, unfollow, followingCount, followersCount, checkFollowStatus};
