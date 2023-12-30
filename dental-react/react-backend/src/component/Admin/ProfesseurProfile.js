import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProfesseurPofile = () => {
	const { id } = useParams();
	const [professor, setProfesseur] = useState({
		userName: "",
		password: "",
		firstName: "",
		lastName: "",
		image: "",
		grade: ""
	});

	useEffect(() => {
		loadProfesseur();
		
	}, []);

	const loadProfesseur = async () => {
		const result = await axios.get(`http://localhost:8083/professor/${id}`);
		setProfesseur(result.data);
	};

	const decodeBase64Image = (base64String) => {
		try {
		  // Ensure the string is not empty or null
		  if (!base64String) {
			return "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp";
		  }
	  
		  // Ensure the string has the correct data URI prefix
		  const prefixedString =
			base64String.indexOf("data:image/jpeg;base64,") === -1
			  ? `data:image/jpeg;base64,${base64String}`
			  : base64String;
	  
		  const decodedImage = atob(prefixedString.split(",")[1]);
		  const byteNumbers = new Array(decodedImage.length);
		  for (let i = 0; i < decodedImage.length; i++) {
			byteNumbers[i] = decodedImage.charCodeAt(i);
		  }
		  const byteArray = new Uint8Array(byteNumbers);
		  const blob = new Blob([byteArray], { type: "image/jpeg" });
		  return URL.createObjectURL(blob);
		} catch (error) {
		  console.error("Error decoding base64 image:", error);
		  return "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp";
		}
	  };
	  
	return (
		
			<div className="container py-5">
				<div className="row">
					<div className="col-lg-3">
						<div className="card mb-4">

							<div className="card-body text-center">
								<img
								key={Date.now()}
								src={professor.image === null ? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" : `data:image/png;base64,${professor.image}`}
									alt="avatar"
									className="rounded-circle img-fluid"
									style={{ width: 150 }}
								/>

								<h5 className="my-3">
									{`${professor.firstName} ${professor.lastName}`}
								</h5>
								<div className="d-flex justify-content-center mb-2">
									<button type="button" className="btn btn-outline-primary">
										Call
									</button>
									<button type="button" className="btn btn-outline-warning ms-1">
										Message
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-9">
						<div className="card mb-4">
							<div className="card-body">
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											First Nmae
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{professor.firstName}
										</p>
									</div>
								</div>

								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Last Name
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{professor.lastName}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											UserName
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{professor.userName}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Password
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{professor.password}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Grade
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{professor.grade}
										</p>
									</div>
								</div>
								<hr />
							</div>
						</div>
					</div>
				</div>
			</div>

		
	);
};

export default ProfesseurPofile;
