import "../styles/componentsStyles/popover.css";

import { useEffect, useRef } from "react";

const Popover = ({ itemId, isOpen, toggleDropdown , remove}) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                toggleDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [toggleDropdown]);

    console.log(itemId, isOpen, dropdownRef.current);

    return (
        <div ref={dropdownRef} className="popover">
            <button
                type="button"
                className="popover-trigger"
                onClick={() => toggleDropdown(isOpen ? null : itemId)}
            >
                ☰
            </button>

            {isOpen && (
                <div className="popover-content">
                    <button type="button" onClick={() => {}}>
                        ✏️ <span>Edit</span>
                    </button>
                    <button type="button" onClick={() => {}}>
                        📋 <span>Detail</span>
                    </button>
                    <button type="button" onClick={() => remove(itemId)}>
                        🗑️ <span>Delete</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Popover;
