import "./Button.css";
import Spinner from "./Spinner";

const sizeMap = {
    small: "2.5rem",
    medium: "3rem",
    large: "3.5rem",
};

const Button = ({
    children,
    onClick,
    type = "button",
    variant = "primary", // primary | secondary | success | danger | warning
    size = "medium", // small | medium | large
    disabled = false,
    loading = false,
    ...props
}) => {
    return (
        <button
            className={`btn btn-${variant} btn-${size} ${
                loading ? "btn-loading" : ""
            }`}
            onClick={onClick}
            type={type}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <Spinner
                    size={sizeMap[size]}
                    color={
                        variant === "secondary" || variant === "warning"
                            ? "black"
                            : "white"
                    }
                />
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
