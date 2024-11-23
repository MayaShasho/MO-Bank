import { Router } from 'express'
import { balanceController } from '../controllers/balance.js';
import { transactionPostController, transactionGetController } from '../controllers/transaction.js';
import { validate } from '../middleware/validation.js';
import { verifyToken } from '../middleware/tokenValidation.js';

const userRoutes = Router();
userRoutes.use(validate);
userRoutes.get('/balance', verifyToken, balanceController)
userRoutes.get('/transaction', verifyToken, transactionGetController)
userRoutes.post('/transaction', verifyToken, transactionPostController)

export default userRoutes;