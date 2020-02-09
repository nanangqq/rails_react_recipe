import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Value Of Space</h1>
        <p className="lead">
          data managing system
        </p>
        <hr className="my-4" />
        {/* <Link
          to="/recipes"
          className="btn btn-lg custom-button"
          role="button"
        >
          View Recipes
        </Link> */}
        <Link
          to="/polstest"
          className="btn btn-lg custom-button"
          role="button"
        >
          Polygons
        </Link>
        &nbsp;
        <Link
          to="/polshow"
          className="btn btn-lg custom-button"
          role="button"
        >
          ShowPloygons
        </Link>
      </div>
    </div>
  </div>
);
