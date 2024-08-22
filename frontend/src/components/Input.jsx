import "../styles/componentsStyles/input.css";

const Input = ({
    value,
    label,
    name,
    type,
    onChange,
    autoComplete,
    valid = true,
    required = false,
    info
}) => {
    return (
        <div className="form-group">
            <input
                className={!valid ? "invalid" : undefined}
                type={type}
                name={name}
                id={`group-${name}`}
                placeholder={label ? "" : name}
                autoComplete={autoComplete}
                value={value}
                onChange={onChange}
                required={required}
            />
            {(!valid && info) && <ul className="validation-list">
                    {info.map((rule, idx) => <li key={idx}><small>{rule}</small></li>)}
                </ul>}
            {label && <label htmlFor={`group-${name}`}>{label}</label>}
        </div>
    );
};

export default Input;
