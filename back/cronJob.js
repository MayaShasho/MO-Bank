import cron from 'node-cron';
import { PendingUser } from './schemas.js';

const deleteExpiredPendingUsers = async () => {
    try {
        const now = Date.now();

        const deletedUsers = await PendingUser.deleteMany({
            expirationTime: { $lt: now }
        });

        console.log(`Deleted ${deletedUsers.deletedCount} expired pending users.`);
    } catch (error) {
        console.error('Error deleting expired pending users:', error.message);
    }
};
cron.schedule('0 0 * * *', deleteExpiredPendingUsers);   // Runs at midnight (00:00)
// cron.schedule('* * * * *', deleteExpiredPendingUsers);  // Runs every minute
