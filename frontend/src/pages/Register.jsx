import "../styles/pagesStyles/register.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import logo from "../assets/logoipsum.svg";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import { resetError, userRegister } from "../redux/user/userSlice";

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const { status, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [FormData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [Err, setErr] = useState(error);

    const [ValidUsername, setValidUsername] = useState(false);
    const [ValidPassword, setValidPassword] = useState(false);
    const [ValidConfirmPassword, setValidConfirmPassword] = useState(false);

    useEffect(() => {
        setValidUsername(USERNAME_REGEX.test(FormData.username));
    }, [FormData.username]);

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(FormData.password));
        setValidConfirmPassword(FormData.confirmPassword === FormData.password);
    }, [FormData.confirmPassword, FormData.password]);

    useEffect(() => {
        setErr(null);
    }, [FormData.username, FormData.confirmPassword, FormData.password]);

    useEffect(() => {
        setErr(error);
    }, [error]);

    useEffect(() => {
        return () => {
            dispatch(resetError());
        };
    }, [dispatch]);

    function changeHandler(e) {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    function submitHandler(e) {
        e.preventDefault();
        if (!ValidUsername || !ValidPassword || !ValidConfirmPassword) {
            return setErr("Please fill the required fields correctly");
        }
        dispatch(
            userRegister({
                ...FormData,
                fullName: `${FormData.firstName} ${FormData.lastName}`,
            })
        );
    }

    return (
        <main id="register">
            <div className="register-img">
                <Link to="/">
                    <img src={logo} alt="Brand ogo" />
                </Link>
                <h1>Create your account</h1>
                <p>Register for free</p>
            </div>

            <p style={{ color: "red" }}>{Err}</p>

            <div className="register-content">
                <form onSubmit={submitHandler} className="register-form">
                    <div className="register-form-name">
                        <Input
                            type="text"
                            name="firstName"
                            label="First name"
                            autoComplete="off"
                            value={FormData.firstName}
                            onChange={changeHandler}
                            required={true}
                        />
                        <Input
                            type="text"
                            name="lastName"
                            label="Family name"
                            autoComplete="off"
                            value={FormData.lastName}
                            onChange={changeHandler}
                        />
                    </div>
                    <Input
                        valid={!FormData.username || ValidUsername}
                        type="text"
                        name="username"
                        label="Username"
                        autoComplete="off"
                        value={FormData.username}
                        onChange={changeHandler}
                        required={true}
                        info={[
                            "4 to 24 characters",
                            "Must begin with a letter",
                            "Only letters, numbers, underscores & hyphens allowed",
                        ]}
                    />
                    <Input
                        type="email"
                        name="email"
                        label="Email"
                        autoComplete="off"
                        value={FormData.email}
                        onChange={changeHandler}
                        required={true}
                    />
                    <Input
                        valid={!FormData.password || ValidPassword}
                        type="password"
                        name="password"
                        label="Password"
                        autoComplete="off"
                        value={FormData.password}
                        onChange={changeHandler}
                        required={true}
                        info={[
                            "8 to 24 characters",
                            "Must contains a capital letter ",
                            "Must contains a lowercase",
                            "Must contains a number",
                            "Must contains a special character(!,@,#,$,%)",
                        ]}
                    />
                    <Input
                        valid={
                            !FormData.confirmPassword || ValidConfirmPassword
                        }
                        type="password"
                        name="confirmPassword"
                        label="Confirm password"
                        autoComplete="off"
                        value={FormData.confirmPassword}
                        onChange={changeHandler}
                        info={["Password are not matching."]}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        title="Register"
                        disabled={status === "loading"}
                    >
                        {status === "loading" ? <Spinner /> : "Register"}
                    </button>
                </form>
                <p>Or Sign up using</p>
                <button
                    className="btn google-auth"
                    type="button"
                    title="Continue with google"
                    onClick={() => {
                        window.location.href =
                            "http://localhost:3000/api/v2/users/google";
                    }}
                >
                    G
                </button>
                <p>
                    Already have an account? <Link to="/login">Login.</Link>
                </p>
            </div>
        </main>
    );
};

export default Register;
