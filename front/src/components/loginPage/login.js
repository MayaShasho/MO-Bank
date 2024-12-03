import "../form/form.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
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
        setLoading(true);

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
                alert('Login successful!');
                localStorage.setItem('accessToken', result.accessToken);
                localStorage.setItem('refreshToken', result.refreshToken);
                navigate('/user');
            } else {
                alert(`Login failed: ${result.msg}`);
            }
        } catch (error) {
            console.error('Error during login: ', error);
            alert('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="FormContainer">
            <form onSubmit={handleSubmit}>
                <h2 className="FormHeader">Login</h2>
                <label>
                    <input
                        className="FormInput"
                        placeholder='Email'
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    <input
                        className="FormInput"
                        placeholder='Password'
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button className="SubmitButton" type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;
