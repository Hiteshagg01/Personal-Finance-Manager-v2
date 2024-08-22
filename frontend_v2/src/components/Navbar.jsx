import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.svg";
import Backdrop from "./Backdrop";
import "./Navbar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-logo">
                        <Link to="/">
                            <img src={logo} alt="Brand logo" />
                        </Link>
                    </div>

                    <ul
                        className={
                            isOpen ? "navbar-menu active" : "navbar-menu"
                        }
                    >
                        <li className="navbar-item">
                            <Link to="/" className="navbar-links">
                                Home
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/" className="navbar-links">
                                About
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/" className="navbar-links">
                                Features
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/" className="navbar-links">
                                Contact
                            </Link>
                        </li>
                    </ul>
                    <button
                        type="button"
                        title="Menu"
                        className="navbar-menu-toggle"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        ☰
                    </button>

                    {/* <Dropdown
                        buttonClass="profile-btn"
                        buttonLabel={<img src={avatar} alt="User avatar" />}
                    >
                        <span>John</span>
                        <hr style={{ marginBlock: "1rem" }} />
                        <button type="button">Profile</button>
                        <button type="button">Dashboard</button>
                        <button type="button" className="logout-btn">
                            Logout
                        </button>
                    </Dropdown> */}
                </div>
            </nav>
            <Backdrop isShown={isOpen} toggle={setIsOpen} />
            <Outlet />
        </>
    );
};

export default Navbar;
