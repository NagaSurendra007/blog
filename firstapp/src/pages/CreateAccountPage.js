import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const navigate = useNavigate();

    const register = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const auth = getAuth();
            await createUserWithEmailAndPassword(auth, email, password);
            setRegistrationSuccess(true);
        } catch (error) {
            setError(error.message);
        }
    }

    const handleLoginClick = () => {
        navigate('/login');
    }

    return (
        <>
            <h1>Register Form</h1>
            {error && <p className="error">{error}</p>}
            {registrationSuccess && (
                <div>
                    <p>Registration successful!</p>
                    <button onClick={handleLoginClick}>Login Now</button>
                </div>
            )}
            {!registrationSuccess && (
                <>
                    <input
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    <button onClick={register}>Register</button>
                    <Link to="/login">Already have an account? Login here</Link>
                </>
            )}
        </>
    );
}

export default RegisterPage;
