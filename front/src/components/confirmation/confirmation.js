import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Confirmation = ({ email }) => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const navigate = useNavigate();

    const handleCodeChange = (e) => {
        setConfirmationCode(e.target.value);
    };

    const handleConfirmationSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/signup/confirmation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ confirmation_code: confirmationCode }),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Confirmation successful! You can now log in.');
                navigate('/login');
            } else {
                alert(`Confirmation failed: ${result.msg}`);
            }
        } catch (error) {
            console.error('Error during confirmation: ', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="FormContainer">
            <form onSubmit={handleConfirmationSubmit}>
                <h1 className="FormHeader">Confirm Your Signup</h1>
                <p>A confirmation code has been sent to {email}. Please enter it below:</p>
                <label>
                    <input
                        className="FormInput"
                        type="text"
                        name="confirmation_code"
                        placeholder="Enter Confirmation Code"
                        value={confirmationCode}
                        onChange={handleCodeChange}
                        required
                    />
                </label>
                <button className="SubmitButton" type="submit">Confirm</button>
            </form>
        </div>
    );
};

export default Confirmation;
