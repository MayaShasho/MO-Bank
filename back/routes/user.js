import { Router } from 'express'
import { balanceController } from '../controllers/balance.js';
import { transactionController } from '../controllers/transaction.js';
import { transactionHistoryController } from '../controllers/history.js';
import { verifyToken } from '../middleware/tokenValidation.js';
import { verifyTransaction } from '../middleware/transactionValidation.js';
import { infoController } from '../controllers/info.js';

const userRoutes = Router();
userRoutes.use(verifyToken);
userRoutes.get('/balance', balanceController)
userRoutes.post('/transaction', verifyTransaction, transactionController)
userRoutes.get('/transaction', transactionHistoryController)
userRoutes.get('/info', infoController)

export default userRoutes;