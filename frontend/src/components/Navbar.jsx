import "../styles/componentsStyles/navbar.css";

import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/logoipsum.svg";
import Footer from "./Footer";
import ProfileMenu from "./ProfileMenu";
import SideMenu from "./SideMenu";

const Navbar = ({ of }) => {
    const { user } = useSelector((state) => state.user);

    return (
        <>
            <header>
                <nav id="navbar">
                    <div>
                        <Link to="/">
                            <img src={logo} alt="brand logo" />
                        </Link>
                    </div>
                    {of === "home" && (
                        <div>
                            <ul className="navbar-links">
                                <li className="navbar-link">
                                    <Link to="#about">about </Link>
                                </li>
                                <li className="navbar-link">
                                    <Link to="#features">features </Link>
                                </li>
                                <li className="navbar-link">
                                    <Link to="#contact">contact </Link>
                                </li>
                            </ul>
                        </div>
                    )}

                    {of === "dashboard" && <ProfileMenu profile={user} />}
                </nav>
            </header>

            {of === "dashboard" ? <SideMenu /> : <Outlet />}

            <Footer />
        </>
    );
};

export default Navbar;
