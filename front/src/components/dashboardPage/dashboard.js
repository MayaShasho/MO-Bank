import './dashboard.css';
import React, { useEffect, useState } from 'react';
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
    }, [navigate]);

    const fetchDashboard = async () => {
        const balanceResponse = await FetchWithAuth('http://localhost:8080/user/balance', {}, navigate);
        if (balanceResponse.ok) {
            const balanceData = await balanceResponse.json();
            setBalance(balanceData.balance);
        }
    };

    const fetchUserInfo = async () => {
        const infoResponse = await FetchWithAuth('http://localhost:8080/user/info', {}, navigate);
        if (infoResponse.ok) {
            const infoData = await infoResponse.json();
            setInfo(infoData.info);
        }
    };

    const fetchTransactionsHistory = async () => {
        const transactionsResponse = await FetchWithAuth('http://localhost:8080/user/transaction', {}, navigate);
        if (transactionsResponse.ok) {
            const transactionsData = await transactionsResponse.json();
            setTransactions(transactionsData.transactions);
        }
    }

    return (
        <div className="DashboardContainer">
            <div className="DashboardContainerCheck">
                <h1 className='DashboardHeader'>Welcome, {info.first_name} {info.last_name}!</h1>
                <ShowBalance balance={balance} />
                <CreateTransaction fetchDashboard={fetchDashboard} fetchTransactionsHistory={fetchTransactionsHistory} />
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
