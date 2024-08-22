import "./Backdrop.css";

const Backdrop = ({ isShown = false, toggle }) => {
    if (isShown) {
        document.body.classList.add("active-overlay");
    } else {
        document.body.classList.remove("active-overlay");
    }

    return (
        isShown && (
            <div className="backdrop" onClick={() => toggle(!isShown)}></div>
        )
    );
};

export default Backdrop;
