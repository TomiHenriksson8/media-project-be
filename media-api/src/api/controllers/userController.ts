import {NextFunction, Request, Response} from 'express';
import { searchForUser } from '../models/userModel';
import CustomError from '../../classes/CustomError';


const searchByUsername = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const SearchTerm = req.query.username

    if (!SearchTerm || typeof SearchTerm !== 'string') {
      return res.status(400).json({message: 'Invalid search term'})
    }

    const results = await searchForUser(SearchTerm);
    res.json(results)

  } catch (error) {
    console.error(error)
    next(new CustomError('Something went wrong whit the server. Please try again later.', 500))
  }
}
