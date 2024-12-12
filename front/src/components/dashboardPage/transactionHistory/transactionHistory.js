import './transactionHistory.css'
import formatBalance from '../../../utils/formatBalance.js'
import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const TransactionHistory = ({ userEmail, transactions, fetchTransactionsHistory }) => {

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                fetchTransactionsHistory();
            } catch (error) {
                console.error('Error fetching transaction history:', error);
            }
        };

        fetchTransactions();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.1 },
        { field: 'from', headerName: 'From', flex: 0.2 },
        { field: 'to', headerName: 'To', flex: 0.2 },
        {
            field: 'amount',
            headerName: 'Amount',
            flex: 0.1,
            renderCell: (params) => (
                <span
                    className={params.row.amountClass}>
                    {params.value}
                </span>
            ),
        },
        { field: 'date', headerName: 'Date', flex: 0.2 },
        { field: 'time', headerName: 'Time', flex: 0.2 },
    ];

    const rows = transactions.map((transaction, index) => ({
        id: index + 1,
        from: transaction.from,
        to: transaction.to,
        amount: formatBalance(transaction.amount.toFixed(2)),
        amountClass: transaction.from === userEmail ? 'TextRed' : 'TextGreen',
        date: new Date(transaction.date).toLocaleDateString('en-GB', {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        time: new Date(transaction.date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
    }));

    return (
        <section>
            <h2 className='TransactionHistoryHeader' >Transaction History</h2>
            <div className='TableContainer'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    disableSelectionOnClick
                    disableColumnMenu
                    disableColumnSorting
                    disableColumnResize={true}
                    initialState={{
                        sorting: {
                            sortModel:
                                [{ field: 'id', sort: 'desc' }]
                        }
                    }}
                    hideFooter={true}
                />
            </div>
        </section>
    );
};

export default TransactionHistory;
