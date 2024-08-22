import "../styles/pagesStyles/login.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import logo from "../assets/logoipsum.svg";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import { resetError, userLogin } from "../redux/user/userSlice";

const Login = () => {
    const [FormData, setFormData] = useState({
        username: "",
        password: "",
    });

    const { status, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    function changeHandler(e) {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    function submitHandler(e) {
        e.preventDefault();
        dispatch(userLogin(FormData));
    }

    useEffect(() => {
        return () => {
            dispatch(resetError());
        };
    }, [dispatch]);

    return (
        <main id="login">
            <div className="login-img">
                <Link to="/">
                    <img src={logo} alt="Brand logo" />
                </Link>
                <h1>Hello, Friend!</h1>
                <p>We are glad to have you back</p>
            </div>

            <p style={{ color: "red" }}>{error} </p>

            <form className="login-form" onSubmit={submitHandler}>
                <Input
                    label="Username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={FormData.username}
                    onChange={changeHandler}
                />
                <Input
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={FormData.password}
                    onChange={changeHandler}
                />
                <button
                    className="btn btn-primary"
                    type="submit"
                    title="login"
                    disabled={status === "loading"}
                >
                    {status === "loading" ? <Spinner /> : "Login"}
                </button>
            </form>

            <p>or sign up using</p>

            <button
                className="btn google-auth"
                type="button"
                title="Continue with google"
                onClick={() => {
                    window.location.href =
                        "http://localhost:3000/api/v2/users/google";
                }}
            >
                Google
            </button>

            <p>
                Don&apos;t have an account? <Link to="/register">Register</Link>
            </p>
        </main>
    );
};

export default Login;
