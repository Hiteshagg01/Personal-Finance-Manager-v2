import "./Spinner.css";

const Spinner = ({ color = "black", size = "60px", speed = "1.5s" }) => {
    return (
        <div
            className="spinner"
            style={{
                "--uib-color": color,
                "--uib-speed": speed,
                "--uib-size": size,
            }}
        >
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
    );
};

export default Spinner;
