import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserPlus,
    faSignInAlt,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";


const NavBar = () => {
    const handleLogout = () => {
        // Save the current path
        const currentPath = window.location.pathname;

        // Redirect to the home page
        window.location.href = '/';

        // Check if the current path is the home page
        if (window.location.pathname === '/') {
            // Refresh the page only if it's the home page
            window.location.reload(true);
        }
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
            <div className="container-fluid">
                <Link className="navbar-brand" to={"/"}>
                    GENSAK
                </Link>

                <Nav className="mr-auto">
                    <Link to={"view-groupe"} className="nav-link">

                        Gestion Group

                    </Link>

                    <Link to={"view-Etudiant"} className="nav-link">

                        Gestion Etudiant

                    </Link>
                    <Link to={"pw"} className="nav-link">

                        Gestion PW

                    </Link>
                    <Link to={"tooth"} className="nav-link">

                        Gestion Tooth

                    </Link>
                </Nav>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>


                <>
                    <Nav className="mr-auto">



                    </Nav>
                    <Nav className="navbar-right">
                        <Link className="nav-link" to={"/"} onClick={handleLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                        </Link>
                    </Nav>
                </>
            </div>

        </nav>
    );
};

export default NavBar;