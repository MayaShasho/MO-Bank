import "../form.css";

import React, { useState } from 'react';

const Signup = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
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

        try {
            const response = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Signup successful! Check your email for confirmation.');
            } else {
                alert(`Signup failed: ${result.status}`);
            }
        } catch (error) {
            console.error('Error during signup: ', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <>
            <div className="FormContainer">
                <form onSubmit={handleSubmit}>
                    <h1 className='FormHeader'>Sign Up</h1>
                    <label>
                        <input
                            className="FormInput"
                            type="text"
                            name="first_name"
                            placeholder='First Name'
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        <input
                            className="FormInput"
                            type="text"
                            name="last_name"
                            placeholder='Last Name'
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <input
                            className="FormInput"
                            type="tel"
                            name="phone_number"
                            placeholder='Phone Number'
                            value={formData.phone_number}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <input
                            className="FormInput"
                            type="email"
                            name="email"
                            placeholder='Email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        <input
                            className="FormInput"
                            type="password"
                            name="password"
                            placeholder='Password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <button className='SubmitButton' type="submit">Sign Up</button>
                </form>
            </div>
        </>
    );
};

export default Signup;
