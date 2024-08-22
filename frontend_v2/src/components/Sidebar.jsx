import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import avatar from "../assets/user.png";
import { userLogout } from "../redux/user/userSlice";
import Dropdown from "./Dropdown";
import "./Sidebar.css";

const toggleButton = (
    <button className="profile-btn">
        <img src={avatar} alt="User avatar" />
    </button>
);

const Sidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(true);
    const {user } = useSelector(state => state.user)
    const dispatch = useDispatch();


    
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
                <div className="sidebar-container">
                    <div className="sidebar-header">
                        <Link to="/">
                            <img src={logo} alt="Brand logo" />
                        </Link>
                        <button
                            className="sidebar-toggle"
                            onClick={toggleSidebar}
                        >
                            {isOpen ? "❮" : "❯"}
                        </button>
                    </div>
                    <nav className="sidebar-nav">
                        <small>Menu</small>
                        <ul className="sidebar-menu">
                            <li className="sidebar-item">
                                <NavLink
                                    to="/dashboard"
                                    className="sidebar-links"
                                >
                                    <span>🎲</span>
                                    <p>Dashboard</p>
                                </NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink
                                    to="/expense"
                                    className="sidebar-links"
                                >
                                    <span>🎲</span>
                                    <p>Expenses</p>
                                </NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to="/income" className="sidebar-links">
                                    <span>🎲</span>
                                    <p>Income</p>
                                </NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to="/budget" className="sidebar-links">
                                    <span>🎲</span>
                                    <p>Budget</p>
                                </NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink
                                    to="/investments"
                                    className="sidebar-links"
                                >
                                    <span>🎲</span>
                                    <p>Investments</p>
                                </NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink
                                    to="/transactions"
                                    className="sidebar-links"
                                >
                                    <span>🎲</span>
                                    <p>Transactions</p>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
            <main
                style={{
                    marginLeft: isOpen ? "250px" : "4rem",
                    transition: "margin 0.3s ease",
                }}
                className="main"
            >
                <div className="main-header">
                    <p>{location.pathname.slice(1)}</p>
                    <Dropdown toggleButton={toggleButton}>
                        <span>{user.fullName.split(" ")[0]}</span>
                        <hr style={{ marginBlock: "1rem" }} />
                        <button type="button">Profile</button>
                        <button type="button">Dashboard</button>
                        <button
                            type="button"
                            className="logout-btn"
                            onClick={() => dispatch(userLogout())}
                        >
                            Logout
                        </button>
                    </Dropdown>
                </div>
                <div className="main-content">
                    <Outlet />
                </div>
            </main>
        </>
    );
};

export default Sidebar;
