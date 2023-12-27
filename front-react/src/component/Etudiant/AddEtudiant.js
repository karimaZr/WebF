import { useState } from "react";
import {
	Link,
	useNavigate,
} from "react-router-dom";
import axios from "axios";
import NavBar from "../common/navbar";


const AddProfesseur= () => {
	let navigate = useNavigate();
	const [professor, setProfesseur] = useState({
		userName: "",
		password: "",
		firstName: "",
		lastName: "",
        image:"", 
        number:""
		
		
	});
	const {
		userName,
		password,
		firstName,
		lastName,
        image, 
        number
	} = professor;
	

	const handleInputChange = (e) => {
		setProfesseur({
			...professor,
			[e.target.name]: e.target.value,
			

		});
	};
	const saveProfessor = async (e) => {
		e.preventDefault();

		try {
			// Use the imageData for the image field
			await axios.post(
				"http://localhost:8083/student", professor

			);

			navigate("/view-Etudiant");
		} catch (error) {
			console.error("Error adding professor:", error);
		}
	};

	return (
		
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Add Student</h2>
			<form onSubmit={(e) => saveProfessor(e)}>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="fristName">
						First Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="firstName"
						id="firstName"
						required
						value={firstName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="lastName">
						Last Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="lastName"
						id="lastName"
						required
						value={lastName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="userName">
						UserName
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="userName"
						id="userName"
						required
						value={userName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="password">
						Password
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="password"
						id="password"
						required
						value={password}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>
				<div className="input-group mb-5">
					<label className="input-group-text" htmlFor="image">
						Image
					</label>
					<input
						type="file"
						id="image"
						name="image"
						
						className="block w-full transition duration-150 ease-in-out appearance-none bg-white border border-gray-400 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
					/>
				</div>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="number">
						Number
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="number"
						id="number"
						required
						value={number}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="row mb-5">
					<div className="col-sm-2">
						<button
							type="submit"
							className="btn btn-outline-success btn-lg">
							Save
						</button>
					</div>

					<div className="col-sm-2">
						<Link
							to={"/view-Etudiant"}
							type="submit"
							className="btn btn-outline-warning btn-lg">
							Cancel
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddProfesseur;