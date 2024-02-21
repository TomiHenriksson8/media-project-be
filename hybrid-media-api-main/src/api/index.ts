import express, {Request, Response} from 'express';

import mediaRoute from './routes/mediaRoute';
import tagRoute from './routes/tagRoute';
import likeRoute from './routes/likeRoute';
import commentRoute from './routes/commentRoute';
import ratingRoute from './routes/ratingRoute';
import followRoute from './routes/followRoute';
import notificationRoute from './routes/notificationRoute';
import searchRoute from './routes/searchRoute';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'media api v1',
  });
});

router.use('/media', mediaRoute);
router.use('/follow', followRoute);
router.use('/notification', notificationRoute)
router.use('/search', searchRoute);
router.use('/tags', tagRoute);
router.use('/likes', likeRoute);
router.use('/comments', commentRoute);
router.use('/ratings', ratingRoute);


export default router;
