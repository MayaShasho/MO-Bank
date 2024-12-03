// src/components/TransactionHistory.js
import React, { useEffect, useState } from 'react';
import FetchWithAuth from '../../utils/fetchWithAuth.js';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const transactionsResponse = await FetchWithAuth('http://localhost:8080/user/transaction', {}, navigate);
                if (transactionsResponse.ok) {
                    const transactionsData = await transactionsResponse.json();
                    setTransactions(transactionsData.transactions);
                }
            } catch (error) {
                console.error('Error fetching transaction history:', error);
            }
        };

        fetchTransactions();
    }, [navigate]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'date', headerName: 'Date', width: 200 },
        { field: 'from', headerName: 'From', width: 150 },
        { field: 'to', headerName: 'To', width: 150 },
        { field: 'amount', headerName: 'Amount', width: 100 },
    ];

    const rows = transactions.map((transaction, index) => ({
        id: index + 1,
        date: new Date(transaction.date).toLocaleString(),
        from: transaction.from,
        to: transaction.to,
        amount: transaction.amount.toFixed(2),
    }));

    return (
        <section>
            <h3>Transaction History</h3>
            <div className='TableContainer'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    disableSelectionOnClick
                />
            </div>
        </section>
    );
};

export default TransactionHistory;
