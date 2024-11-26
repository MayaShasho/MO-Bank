import { Router } from 'express'
import { confirmationController } from '../controllers/confirmation.js';
import { signupController } from '../controllers/signup.js';
import { signupValidate } from '../middleware/signupValidation.js';
import { errorSender } from '../middleware/errorSender.js';
import { resendController } from '../controllers/resend.js';

const signupRoute = Router();
signupRoute.post('/', signupValidate, errorSender, signupController)
signupRoute.post('/confirmation', confirmationController)
signupRoute.post('/resend', resendController);

export default signupRoute;