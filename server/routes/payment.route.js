import express from 'express';
import { checkAuth } from '../middlewares/user.middleware.js';
import { createOrder, validateWebhook } from '../controllers/payment.controller.js';

const paymentRouter = express.Router();

paymentRouter.post('/create-order', checkAuth, createOrder);
paymentRouter.post('/webhook', validateWebhook);

export default paymentRouter;