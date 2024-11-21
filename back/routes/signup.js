import { Router } from 'express'
import { confirmationController } from '../controllers/confirmation.js';
import { signupController } from '../controllers/signup.js';
import { signupValidate } from '../middleware/signupValidation.js';
import { errorSender } from '../middleware/errorSender.js';

const signupRoute = Router();
signupRoute.post('/', signupValidate, errorSender, signupController)
signupRoute.post('/confirmation', confirmationController)

export default signupRoute;