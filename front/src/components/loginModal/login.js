import "./loginModal.css";
import "../form.css";

const LoginModal = ({ onClose }) => {
    return (
        <div className="ModalOverlay">
            <div className="ModalContent">
                <button className="CloseButton" onClick={onClose}>X</button>
                <h2 className="LoginHeader">Login</h2>
                <form>
                    <label>
                        <input
                            className="FormInput"
                            placeholder='Email'
                            type="email"
                            required />
                    </label>
                    <label>
                        <input
                            className="FormInput"
                            placeholder='Password'
                            type="password"
                            required />
                    </label>
                    <span className="ForgotPassword">Forgot my password</span>
                    <button className="LoginButton" type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
