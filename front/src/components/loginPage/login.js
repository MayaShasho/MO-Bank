import "../form/form.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordInput from "../inputs/passwordInput.js";
import Input from "../inputs/input.js";
import ErrorMessage from "../errorMessage/errorMessage.js";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

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
        setLoading(true);
        console.log('submit');


        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('accessToken', result.accessToken);
                localStorage.setItem('refreshToken', result.refreshToken);
                navigate('/user');
            } else {
                setError(`Login failed: ${result.message}`);
            }
        } catch (error) {
            console.error('Error during login: ', error);
            setError(`Signup failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="FormContainer">
            <form className="MainForm" onSubmit={handleSubmit}>
                <h2 className="FormHeader">Login</h2>
                <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <PasswordInput name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                <ErrorMessage error={error} />

                <button className="SubmitButton" type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;
