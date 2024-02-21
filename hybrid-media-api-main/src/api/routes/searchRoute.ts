import express from 'express';
import { searchForMediaAndUser } from '../controllers/searchController';

const router = express.Router();

router.get('/search', searchForMediaAndUser);


export default router;
