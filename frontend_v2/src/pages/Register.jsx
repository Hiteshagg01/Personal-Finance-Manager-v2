import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import google from "../assets/google.png";
import logo from "../assets/logo.svg";
import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";
import { resetStatus, userRegister } from "../redux/user/userSlice";
import "./Register.css";

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const [
        { firstName, lastName, username, email, password, confirmPassword },
        setCredentials,
    ] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showModal, setShowModal] = useState(false);

    const [validUsername, setValidUsername] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);

    const { status, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validUsername && validPassword && validConfirmPassword) {
            dispatch(
                userRegister({
                    fullName: `${firstName} ${lastName}`,
                    username,
                    email,
                    password,
                })
            );
        }
        setShowModal(true);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleGoogleSignIn = () => {
        window.location.href = "http://localhost:3000/api/v2/users/google";
    };

    const modalToggle = () => {
        setShowModal(!showModal);
        dispatch(resetStatus());
    };

    useEffect(() => {
        setValidUsername(USERNAME_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidConfirmPassword(password === confirmPassword);
    }, [password, confirmPassword]);

    useEffect(() => {
        setShowModal(status === "failed");
    }, [status]);

    return (
        <main className="register">
            <div className="register-container">
                <Modal showModal={showModal} toggle={modalToggle}>
                    <span>❌</span>
                    <p>{error ? error : "Validation error"}</p>
                </Modal>
                <div className="register-logo">
                    <Link to="/">
                        <img src={logo} alt="Brand logo" />
                    </Link>
                    <h1>Create your account</h1>
                    <p>Register for free</p>
                </div>
                <form className="form register-form" onSubmit={handleSubmit}>
                    <div className="register-full-name">
                        <Input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={handleChange}
                            minLength="2"
                            required
                        />
                        <Input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <Input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        isValid={validUsername}
                        minLength="4"
                        required
                    />
                    <Input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        minLength="8"
                        isValid={validPassword}
                        required
                    />
                    <Input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        minLength="8"
                        isValid={validConfirmPassword}
                        required
                    />
                    <Button type="submit" loading={status === "loading"}>
                        Register
                    </Button>
                    <p className="redirect">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                    <div className="divider">
                        <hr />
                        <span>or</span>
                    </div>
                    <Button variant="secondary" onClick={handleGoogleSignIn}>
                        <img src={google} alt="Google icon" />
                        Sign in with Google
                    </Button>
                </form>
            </div>
        </main>
    );
};

export default Register;
