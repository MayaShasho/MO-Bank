import './createTransaction.css'
import '../../form/form.css'
import React, { useState } from 'react';
import FetchWithAuth from '../../../utils/fetchWithAuth.js';
import { Typography } from '@mui/material';

const CreateTransaction = ({ fetchDashboard, fetchTransactionsHistory }) => {
    const [newTransaction, setNewTransaction] = useState({ to: '', amount: '' });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'amount' && value && isNaN(value)) {
            // Ensure the value entered is a valid number
            return;
        }
        setNewTransaction({ ...newTransaction, [name]: value });
    };

    const handleTransactionSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!newTransaction.to || !newTransaction.amount) {
            setError('Receiver email and amount are required.');
            return;
        }

        try {
            const response = await FetchWithAuth('http://localhost:8080/user/transaction', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: newTransaction.to,
                    amount: newTransaction.amount,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                setNewTransaction({ to: '', amount: '' });
                fetchDashboard();
                fetchTransactionsHistory();
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to process transaction.');
            }
        } catch (error) {
            console.error('Error creating transaction:', error);
            setError('Internal server error.');
        }
    };

    return (
        <section>
            <form className='CreateTransactionForm' onSubmit={handleTransactionSubmit}>
                <h2 className='CreateTransactionHeader'>Create Transaction: </h2>
                <label>
                    <input
                        className='FormInput'
                        placeholder='Receiver Email'
                        name="to"
                        value={newTransaction.to}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    <input
                        className='FormInput'
                        placeholder='Amount'
                        name="amount"
                        type="text"
                        value={newTransaction.amount}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <button className="SubmitButton SubmitTransaction" type="submit">Submit Transaction</button>
                {error && <Typography color="error">{error}</Typography>}
            </form>
        </section >
    );
};

export default CreateTransaction;
