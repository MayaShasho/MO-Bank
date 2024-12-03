import React, { useEffect, useState } from 'react';
import FetchWithAuth from '../../utils/fetchWithAuth.js';
import { useNavigate } from 'react-router-dom';
import TransactionHistory from './transactionHistory.js';
import CreateTransaction from './createTransaction.js';

const User = () => {
    const [balance, setBalance] = useState(0);
    const [info, setInfo] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const balanceResponse = await FetchWithAuth('http://localhost:8080/user/balance', {}, navigate);
                if (balanceResponse.ok) {
                    const balanceData = await balanceResponse.json();
                    setBalance(balanceData.balance);
                }

                const infoResponse = await FetchWithAuth('http://localhost:8080/user/info', {}, navigate);
                if (infoResponse.ok) {
                    const infoData = await infoResponse.json();
                    setInfo(infoData.info);
                }

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        console.log()
        fetchDashboardData();
    }, [navigate]);

    return (
        <div className="DashboardContainer">
            <h2>Dashboard</h2>
            <h3>Welcome, {info.first_name} {info.last_name}!</h3>
            <section>
                <h3>Your Balance</h3>
                <p>${balance.toFixed(2)}</p>
            </section>
            <CreateTransaction />
            <TransactionHistory />
        </div>
    );
};

export default User;
