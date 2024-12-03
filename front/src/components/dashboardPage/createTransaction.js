// src/components/CreateTransaction.js
import React, { useState } from 'react';
import FetchWithAuth from '../../utils/fetchWithAuth.js';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateTransaction = () => {
    const [newTransaction, setNewTransaction] = useState({ to: '', amount: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
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
            }, navigate);

            if (response.ok) {
                const result = await response.json();
                alert(result.message);
                setNewTransaction({ to: '', amount: '' });
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
            <h3>New Transaction</h3>
            <form onSubmit={handleTransactionSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
                    <TextField
                        label="Receiver Email"
                        name="to"
                        value={newTransaction.to}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label="Amount"
                        name="amount"
                        type="number"
                        value={newTransaction.amount}
                        onChange={handleInputChange}
                        required
                    />
                    <Button type="submit" variant="contained">Submit Transaction</Button>
                    {error && <Typography color="error">{error}</Typography>}
                </Box>
            </form>
        </section>
    );
};

export default CreateTransaction;
