import { cloneElement, useEffect, useRef, useState } from "react";
import "./Dropdown.css";

const Dropdown = ({ toggleButton = <button>Toggle</button>, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleButtonWithClick = cloneElement(toggleButton, {
        onClick: toggleDropdown,
    });

    return (
        <div className="dropdown" ref={dropdownRef}>
            {toggleButtonWithClick}

            {isOpen && <div className="dropdown-menu">{children}</div>}
        </div>
    );
};

export default Dropdown;
