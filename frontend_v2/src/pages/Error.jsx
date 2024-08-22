import { Link, useRouteError } from "react-router-dom";
import "./Error.css";

const Error = ({ redirect = "/" }) => {
    const error = useRouteError();

    return (
        <div className="error">
            <h1>Oops!</h1>
            <p>Sorry, an error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to={redirect}>Go Back</Link>
        </div>
    );
};

export default Error;
