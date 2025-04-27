import express from 'express';
import { checkAuth } from '../middlewares/user.middleware.js';

const reviewRouter = express.Router();

// TODO: building comment routes
// reviewRouter.post('/', checkAuth, addComment);
// reviewRouter.post('/', checkAuth,);

export default reviewRouter;