import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import google from "../assets/google.png";
import logo from "../assets/logo.svg";
import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";
import { resetStatus, userLogin } from "../redux/user/userSlice";
import "./Login.css";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [showModal, setShowModal] = useState(false);
    const { status, error } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(userLogin(credentials));
    };

    const handleGoogleSignIn = () => {
        window.location.href = "http://localhost:3000/api/v2/users/google";
    };

    const modalToggle = () => {
        setShowModal(!showModal);
        dispatch(resetStatus());
    };

    useEffect(() => {
        setShowModal(status === "failed");
    }, [status]);
    
    return (
        <main className="login">
            <div className="login-container">
                <Modal showModal={showModal} toggle={modalToggle}>
                    <p>❌</p>
                    <h3>{error}</h3>
                </Modal>
                <div className="login-logo">
                    <Link to="/">
                        <img src={logo} alt="Brand Logo" />
                    </Link>
                    <h1>Hello, Friend!</h1>
                    <p>We are glad to have you back</p>
                </div>
                <form className="form login-form" onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        name="username"
                        autoComplete="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required={true}
                    />
                    <Input
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        value={credentials.password}
                        onChange={handleChange}
                        required={true}
                    />
                    <Button type="submit" loading={status === "loading"}>
                        Login
                    </Button>
                    <p className="redirect">
                        Don&apos;t have an account?{" "}
                        <Link to="/register">Register</Link>
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

export default Login;
