import React, {
	useEffect,
	useState,
} from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

import {
	Link,
	useNavigate,
	useParams,
} from "react-router-dom";

const EditStudent = ({ id, groups,showModal, handleClose }) => {
	const [selectedGroupId, setSelectedGroupId] = useState("");
	const [student, setProfesseur] = useState({
		userName: "",
		password: "",
		firstName: "",
		lastName: "",
		image: "",
		number: ""
	});
	const {
		userName,
		password,
		firstName,
		lastName,
		image,
		number
	} = student;

	useEffect(() => {
		loadProfesseur();
	}, []);

	const loadProfesseur = async () => {
		const result = await axios.get(
			`http://localhost:8083/student/${id}`
		);
		setProfesseur(result.data);
	};

	const handleInputChange = (e) => {
		setProfesseur({
			...student,
			[e.target.name]: e.target.value,
		});
	};
	const updateStudent = async (e) => {
		e.preventDefault();
		await axios.put(
			`http://localhost:8083/student/${id}/groupe/${selectedGroupId}`,
			student
		);
		handleClose();
	};
	const handleGroupChange = (e) => {
		const selectedId = e.target.value;
		setSelectedGroupId(selectedId);

	};
	return (
		<Modal show={showModal} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Edit Etudiant</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form onSubmit={(e) => updateStudent(e)}>
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
					<div className="input-group mb-5">
						<label className="input-group-text" htmlFor="group">
							Group
						</label>
						<select
							className="form-control col-sm-6"
							required
							onChange={(e) => handleGroupChange(e)}
						>
							<option value="">Select Group</option>
							{groups.map((student) => (
								<option key={student.id} value={student.id}>
									{student.code}
								</option>
							))}
						</select>
					</div>
					<div className="row mb-5">
						<div className="col-sm-2">
							<button
								type="submit"
								className="btn btn-outline-success btn-lg"
							>
								Save
							</button>
						</div>
						<div className="col-sm-2">
							<Button
								variant="outline-warning"
								size="lg"
								onClick={handleClose}
							>
								Cancel
							</Button>
						</div>
					</div>
				</form>
			</Modal.Body>
		</Modal>
	);
};

export default EditStudent; 