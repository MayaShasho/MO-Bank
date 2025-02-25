import './dashboard.css';
import React, { useEffect, useState, useCallback } from 'react';
import FetchWithAuth from '../../utils/fetchWithAuth.js';
import { useNavigate } from 'react-router-dom';
import TransactionHistory from './transactionHistory/transactionHistory.js';
import CreateTransaction from './createTransaction/createTransaction.js';
import ShowBalance from './balance/showBalance.js';

const User = () => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [info, setInfo] = useState(0);
    const navigate = useNavigate();

    const fetchDashboard = useCallback(async () => {
        const balanceResponse = await FetchWithAuth(
            'https://mo-bank.onrender.com/user/balance',
            {},
            navigate
        );
        if (balanceResponse.ok) {
            const balanceData = await balanceResponse.json();
            setBalance(balanceData.balance);
        }
    }, [navigate]);

    const fetchUserInfo = useCallback(async () => {
        const infoResponse = await FetchWithAuth(
            'https://mo-bank.onrender.com/user/info',
            {},
            navigate
        );
        if (infoResponse.ok) {
            const infoData = await infoResponse.json();
            setInfo(infoData.info);
        }
    }, [navigate]);

    const fetchTransactionsHistory = useCallback(async () => {
        const transactionsResponse = await FetchWithAuth(
            'https://mo-bank.onrender.com/user/transaction',
            {},
            navigate
        );
        if (transactionsResponse.ok) {
            const transactionsData = await transactionsResponse.json();
            setTransactions(transactionsData.transactions);
        }
    }, [navigate]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                fetchDashboard();
                fetchUserInfo();
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, [fetchDashboard, fetchUserInfo]);

    return (
        <div className="DashboardContainer">
            <div className="DashboardContainerCheck">
                <h1 className="DashboardHeader">
                    Welcome, {info.first_name} {info.last_name}!
                </h1>
                <ShowBalance balance={balance} />
                <CreateTransaction
                    fetchDashboard={fetchDashboard}
                    fetchTransactionsHistory={fetchTransactionsHistory}
                />
                <TransactionHistory
                    userEmail={info.email}
                    transactions={transactions}
                    fetchTransactionsHistory={fetchTransactionsHistory}
                />
            </div>
        </div>
    );
};

export default User;
