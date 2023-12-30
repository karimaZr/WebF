import React, { useState, useEffect } from "react";
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [professeurs, setProfesseur] = useState([]);
    const [admins, setAdmin] = useState([]);
    const initialState = {
        email: "",
        password: "",
    };
    const [user, setUser] = useState(initialState);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        loadProfesseur();
        loadAdmin();
    }, []);

    const loadProfesseur = async () => {
        const result = await axios.get(
            "http://localhost:8083/professor",
            {
                validateStatus: () => {
                    return true;
                },
            }
        );

        setProfesseur(result.data);


    };
    const loadAdmin = async () => {
        const result = await axios.get(
            "http://localhost:8083/admin",
            {
                validateStatus: () => {
                    return true;
                },
            }
        );

        setAdmin(result.data);

    };

    const credentialChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };
    const validateUser = (event) => {
        event.preventDefault();
        const professor = validateCredentials(professeurs);
        const isAdmin = validateCredentials(admins);

        if (professor) {
            props.setUserRole("professor");
            props.setId(professor.id)
            console.log("Professor login successful with ID:", professor.id);
            navigate(`/view-groupe`);
        } else if (isAdmin) {
            props.setUserRole("admin");
            console.log("Admin login successful");
            navigate("/view-prof");
        } else {
            handleInvalidCredentials();
        }
    };

    const validateCredentials = (userData) => {
        return userData.find(
            (professor) =>
                professor.userName === user.email && professor.password === user.password
        );
    };


    const handleInvalidCredentials = () => {
        setError("Invalid userName and password");
        resetLoginForm();
    };

    const resetLoginForm = () => {
        setUser(initialState);
    };
    return (
        <div className="wrapper">
            <form onSubmit={validateUser}>
                <h1>Login</h1>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="UserName"
                        id="email"
                        value={user.email}
                        onChange={credentialChange}
                        name="email"
                        required
                        autoComplete="username"
                    />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={credentialChange}
                        name="password"
                        id="password"
                        required
                        autoComplete="password"  // Add this line
                    />

                    <FaLock className="icon" />
                </div>
                <div className="remember-forgot">
                    <label>
                        <input type="checkbox" /> Remember me
                    </label>
                    <a href="#">Forgot password?</a>
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
