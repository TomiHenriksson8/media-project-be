import express from 'express';
import { followLGet, followingLtGet, follow, unfollow } from '../controllers/followController';
import { authenticate } from '../../middlewares';


const router = express.Router();

router.route('/followers/:id').get(followLGet);
router.route('/following/:id').get(followingLtGet);
router.route('/:id').post(follow).delete(unfollow);


export default router;

