import "./Input.css";

const Input = ({
    name = "Text",
    type = "text",
    autoComplete = "off",
    value,
    onChange,
    isValid = true,
    required = false,
    ...props
}) => {
    const rand = Math.floor(Math.random() * 100000) + 1;

    return (
        <div className="input-group">
            <input
                type={type}
                name={name}
                id={name + " " + rand}
                autoComplete={autoComplete}
                value={value}
                onChange={onChange}
                required={required}
                placeholder=" "
                className={!isValid ? "invalid" : undefined}
                {...props}
            />
            <label htmlFor={name + " " + rand}>
                {name.replace(/([A-Z])/g, ' $&')  + (required ? "*" : "")}
            </label>
        </div>
    );
};

export default Input;
