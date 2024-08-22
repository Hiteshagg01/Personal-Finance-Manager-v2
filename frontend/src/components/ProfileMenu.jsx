import "../styles/componentsStyles/profileMenu.css";

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../redux/user/userSlice";

const ProfileMenu = ({ profile }) => {
    const [IsOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function toggleMenu() {
        setIsOpen(!IsOpen);
    }

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <div ref={menuRef} className="profile-menu">
                <button
                    type="button"
                    title="Profile"
                    onClick={toggleMenu}
                    className="profile-menu-trigger"
                ></button>

                {IsOpen && (
                    <div className="profile-menu-content">
                        <span>Hi, {profile.fullName.split(" ")[0]}</span>
                        <hr />
                        <button
                            type="button"
                            onClick={() => navigate("/account")}
                        >
                            Profile
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                        >
                            Dashboard
                        </button>
                        <button
                            type="button"
                            className="logout-btn"
                            onClick={() => dispatch(userLogout())}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProfileMenu;
