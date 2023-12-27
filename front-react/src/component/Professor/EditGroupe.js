import React, {
	useEffect,
	useState,
} from "react";
import axios from "axios";

import {
	Link,
	useNavigate,
	useParams,
} from "react-router-dom";

const EditStudent = () => {
	let navigate = useNavigate();

	const { id } = useParams();

	const [professor, setProfesseur] = useState({
		userName: "",
        password: "",
        firstName: "",
        lastName: "",
        image: "",
        grade: ""
	});
	const {
		userName,
        password,
        firstName,
        lastName,
        image,
        grade
	} = professor;

	useEffect(() => {
		loadProfesseur();
	}, []);

	const loadProfesseur = async () => {
		const result = await axios.get(
			`http://localhost:8083/groupe/${id}`
		);
		setProfesseur(result.data);
	};

	const handleInputChange = (e) => {
		setProfesseur({
			...professor,
			[e.target.name]: e.target.value,
		});
	};
	const updateProfessofa = async (e) => {
		e.preventDefault();
		await axios.put(
			`http://localhost:8083/groupe/${id}`,
			professor
		);
		navigate("/view-groupe");
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Edit Group</h2>
			<form onSubmit={(e) => updateProfessofa(e)}>
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
						htmlFor="grade">
						Grade
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="grade"
						id="grade"
						required
						value={grade}
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
							to={"/view-prof"}
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

export default EditStudent; 