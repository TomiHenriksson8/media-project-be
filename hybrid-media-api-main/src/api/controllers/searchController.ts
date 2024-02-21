import { NextFunction, Request, Response } from "express";
import { searchByUserAndMedia } from "../models/searchModel";


const searchForMediaAndUser = async (req: Request, res: Response, next: NextFunction) => {
  const { searchQuery } = req.query;

  try {
    if (!searchQuery || typeof searchQuery !== 'string') {
      res.status(400).json({ message: 'Invalid search query' });
      return;
    }

    const mediaAndUsers = await searchByUserAndMedia(searchQuery);
    res.status(200).json({ message: 'Search results', mediaAndUsers });
  } catch (error) {
    next(error);
  }
};


export { searchForMediaAndUser };
