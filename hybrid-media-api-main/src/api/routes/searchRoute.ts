/**
 * @api {get} /search Search for Media and Users
 * @apiName SearchForMediaAndUser
 * @apiGroup Search
 *
 * @apiParam {String} query The search query string used to find matching media and users.
 *
 * @apiDescription Performs a search across media and user entities based on the provided query string. Returns a combined list of media and user objects that match the search criteria.
 */
import express from 'express';
import { searchForMediaAndUser } from '../controllers/searchController';

const router = express.Router();

router.get('/search', searchForMediaAndUser);

export default router;
