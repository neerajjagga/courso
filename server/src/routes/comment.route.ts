import express, { Router } from 'express';
import { checkAuth } from '../middlewares/user.middleware.js';

const reviewRouter: Router = express.Router();

// TODO: building comment routes
// reviewRouter.post('/', checkAuth, addComment);
// reviewRouter.post('/', checkAuth,);

export default reviewRouter;