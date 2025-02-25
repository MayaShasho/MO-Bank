import '../form/form.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../errorMessage/errorMessage.js';
import PinInput from 'react-pin-input';

const Confirmation = () => {
    const email = localStorage.getItem('email');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [isResend, setIsResend] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleResend = async () => {
        setError('');
        try {
            setIsResend(true);
            const responseResend = await fetch(
                'https://mo-bank.onrender.com/signup/resend',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                }
            );
            const result = await responseResend.json();
            if (!responseResend.ok) {
                setError(result.message);
            }
        } catch (error) {
            console.error('Error during resend confirmation: ', error);
            setError(`Error during resend confirmation: ${error.message}`);
        }
    };

    const handleConfirmationSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(
                'https://mo-bank.onrender.com/signup/confirmation',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        confirmation_code: confirmationCode,
                    }),
                }
            );

            const result = await response.json();
            console.log(result);
            if (response.ok) {
                localStorage.removeItem('email');
                navigate('/MO-Bank/login');
            } else {
                setError(`Confirmation failed: ${result.message}`);
            }
        } catch (error) {
            console.error('Error during confirmation: ', error);
            setError('An error occurred. Please try again later');
        }
    };

    return (
        <div className="FormContainer">
            <form className="MainForm" onSubmit={handleConfirmationSubmit}>
                <h1 className="FormHeader">Confirm Your Signup</h1>
                <p>
                    A confirmation code has been sent to {email}. <br />
                    <br />
                    Please enter it below:
                </p>
                <PinInput
                    length={6}
                    focus
                    type="numeric"
                    inputStyle={{
                        border: '2px solid #ccc',
                        borderRadius: '8px',
                        fontSize: '30px',
                        width: '50px',
                        height: '70px',
                        margin: '5px',
                        textAlign: 'center',
                    }}
                    onChange={(value) => setConfirmationCode(value)}
                    onComplete={(value) => setConfirmationCode(value)}
                />
                <p>
                    Didn't get a code? &nbsp;
                    <span className="Resend" onClick={handleResend}>
                        Click to resend
                    </span>
                </p>
                {isResend ? (
                    <p className="resendText">check your email again.</p>
                ) : null}
                <ErrorMessage error={error} />
                <button
                    className="SubmitButton"
                    type="submit"
                    disabled={confirmationCode.length !== 6}
                >
                    Confirm
                </button>
            </form>
        </div>
    );
};

export default Confirmation;
