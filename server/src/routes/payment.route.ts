import express, { Router } from 'express';
import { checkAuth } from '../middlewares/user.middleware.js';
import { 
    createOrder, 
    validateWebhook, 
    verifyPayment,
    getPaymentHistory
} from '../controllers/payment.controller.js';

const paymentRouter: Router = express.Router();

paymentRouter.post('/create-order', checkAuth, createOrder);
paymentRouter.post('/webhook', validateWebhook);
paymentRouter.post('/verify', checkAuth, verifyPayment);
paymentRouter.get('/history', checkAuth, getPaymentHistory);

export default paymentRouter;