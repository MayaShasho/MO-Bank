import { Router } from 'express'
import { balanceController } from '../controllers/balance.js';
import { transactionController } from '../controllers/transaction.js';
import { transactionHistoryController } from '../controllers/history.js';
import { verifyToken } from '../middleware/tokenValidation.js';
import { verifyTransaction } from '../middleware/transactionValidation.js';

const userRoutes = Router();
userRoutes.use(verifyToken);
userRoutes.get('/balance', balanceController)
userRoutes.post('/transaction', verifyTransaction, transactionController)
userRoutes.get('/transaction', transactionHistoryController)

export default userRoutes;