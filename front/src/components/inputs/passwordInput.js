import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

const PasswordInput = ({ name, placeholder, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return <div className="PasswordEye">
        <label>
            <input
                className="FormInput"
                type={showPassword ? 'text' : 'password'}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <button className="ShowPassword" type='button' onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
        </label>
    </div>
}

export default PasswordInput;