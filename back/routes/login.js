import { Router } from 'express'
import { loginController } from '../controllers/login.js';
import { loginValidate } from '../middleware/loginValidation.js';
import { errorSender } from '../middleware/errorSender.js';

const loginRoute = Router();
loginRoute.post('/', loginValidate, errorSender, loginController)

export default loginRoute;