import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Home Page
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <Link className="btn btn-outline-light" to="/adduser">
            Workouts
          </Link>
          <Link className="btn btn-outline-light" to="/mealplans">
          Meel Plans
          </Link>
          <Link className="btn btn-outline-light" to="/adduser">
           Current workout
          </Link>
        </div>
      </nav>
    </div>
  );
}
