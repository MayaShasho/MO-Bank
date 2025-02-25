import '../form/form.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../inputs/passwordInput.js';
import Input from '../inputs/input.js';
import ErrorMessage from '../errorMessage/errorMessage.js';

const Signup = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch(
                'https://mo-bank.onrender.com/signup',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        first_name: formData.first_name,
                        last_name: formData.last_name,
                        phone_number: formData.phone_number,
                        email: formData.email,
                        password: formData.password,
                    }),
                }
            );

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('email', formData.email);
                navigate('/MO-Bank/confirmation');
            } else {
                setError(`Signup failed: ${result.message}`);
            }
        } catch (error) {
            console.error('Error during signup: ', error);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="FormContainer">
            <form className="MainForm SignupForm" onSubmit={handleSubmit}>
                <h1 className="FormHeader">Sign Up</h1>
                <Input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                />
                <Input
                    type="tel"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={formData.phone_number}
                    onChange={handleChange}
                />
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <PasswordInput
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                    placeholder="Password"
                />
                <PasswordInput
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                />
                <ErrorMessage error={error} />
                <button className="SubmitButton" type="submit">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
