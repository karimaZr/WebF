import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import React, { useState, useEffect } from "react";
import Home from "./Home";
import ProfesseurView from "./component/Admin/ProfesseurView";
import NavBar from "./component/common/navbar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import AddProf from "./component/Admin/AddProfesseur";
import EditProf from "./component/Admin/EditProfesseur";
import ProfPofile from "./component/Admin/ProfesseurProfile";
import Login from "./component/User/Login";
import NavBar2 from "./component/common/Navbar2";
import ListGroupe from "./component/Professor/ListGroupe";
import AddEtudiant from "./component/Etudiant/AddEtudiant"
import ViewEtudiant from "./component/Etudiant/EtudiantView"
import EditEtudiant from "./component/Etudiant/EditEtudiant";
import Profile from "./component/Etudiant/EtudiantProfile"
import Dashboard from "./component/Professor/Dashboard";
import Tooth from "./component/Professor/Tooth";
import PW from "./component/PW/PWs";


function App() {
	const [userRole, setUserRole] = useState(null);
	const [professorId, setId] = useState(null);


	return (
		<main className="container mt-5">

			<Router>
				{userRole === "admin" && (
					<NavBar />

				)}
				{userRole === "professor" && (
					<NavBar2 />
				)}

				<Routes>
					<Route
						exact
						path="/"
						element={<Login setUserRole={setUserRole} setId={setId} />}></Route>
					<Route
						exact
						path="/Home"
						element={<Home id={professorId} />}></Route>
					<Route
						exact
						path="/tooth"
						element={<Tooth />}></Route>
					<Route
						exact
						path="/pw"
						element={<PW />}></Route>

					<Route
						exact
						path="/etudiant-profile/:id"
						element={<Profile />}></Route>

					<Route
						exact
						path="/view-groupe"
						element={<ListGroupe id={professorId} />}></Route>
					<Route
						exact
						path="/dash"
						element={<Dashboard id={professorId} />}></Route>

					<Route
						exact
						path="/view-Etudiant"
						element={<ViewEtudiant id={professorId} />}></Route>

					<Route
						exact
						path="/admin"
						element={<home_admin />}></Route>
					<Route
						exact
						path="/view-prof"
						element={<ProfesseurView />}></Route>
					<Route
						exact
						path="/add-prof"
						element={<AddProf />}></Route>
					<Route
						exact
						path="/edit-prof/:id"
						element={<EditProf />}></Route>
					<Route
						exact
						path="/prof-profile/:id"
						element={<ProfPofile />}></Route>


				</Routes>
			</Router>

		</main>
	);
}

export default App;