import '../styles/pagesStyles/error.css'

import { Link, useRouteError } from "react-router-dom";

const Error = ({redirect}) => {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to={redirect || '/'}> Back</Link>
    </div>
  );
};

export default Error;
