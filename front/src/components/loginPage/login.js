import "../form.css";

const Login = () => {
    return (
        <div className="FormContainer">
            <form>
                <h2 className="FormHeader">Login</h2>
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
                <button className="SubmitButton" type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
