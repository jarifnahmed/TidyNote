import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";


function SignupForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;



    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(signUp({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <form className='modal-container' onSubmit={handleSubmit}>
            <ul className='modal-list'>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Email
            </label>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <label>
                Username
            </label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <label>
                Password
            </label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <label>
                Confirm Password
            </label>
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            <button className='modal-button' type="submit">Sign Up</button>
        </form>
    );
}

export default SignupForm;