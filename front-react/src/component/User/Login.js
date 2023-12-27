import React, { useState,useEffect } from "react";
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [professeurs, setProfesseur] = useState([]);
    const [admins,setAdmin] = useState([]);
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
    const validateUser = () => {
        const isProfessor = validateCredentials(professeurs);
        const isAdmin = validateCredentials(admins);
    
        if (isProfessor) {
          props.setUserRole("professor");
          console.log("Professor login successful");
          navigate("/view-groupe");
        } else if (isAdmin) {
          props.setUserRole("admin");
          console.log("Admin login successful");
          navigate("/view-prof");
        } else {
          handleInvalidCredentials();
        }
      };
      const validateCredentials = (userData) => {
        return userData.some(
          (professor) =>
            professor.userName === user.email && professor.password === user.password
        );
      };

      const handleInvalidCredentials = () => {
        setError("Invalid email and password");
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
                        value={user.email}
                        onChange={credentialChange}
                        name="email"
                        required
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
                        required
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
