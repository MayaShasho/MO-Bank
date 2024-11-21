import { Router } from 'express'
import { balanceController } from '../controllers/balance.js';
import { transactionPostController, transactionGetController } from '../controllers/transaction.js';
import { validate } from '../middleware/validation.js';
import { verifyToken } from '../middleware/tokenValidation.js';

const userRoutes = Router();
userRoutes.use(validate);
userRoutes.post('/balance', verifyToken, balanceController)
userRoutes.post('/transaction', verifyToken, transactionPostController)
userRoutes.get('/transaction', verifyToken, transactionGetController)

export default userRoutes;