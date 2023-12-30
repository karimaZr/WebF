import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";

const ProfesseurPofile = () => {
	const { id } = useParams();
	const [student, setProfesseur] = useState({
		userName: "",
		password: "",
		firstName: "",
		lastName: "",
		image: "",
		number: ""
	});
	const chartData = {
		labels: student.studentPWS ? student.studentPWS.map((pw) => pw.date) : [],
		datasets: [
			{
				label: "Note",
				data: student.studentPWS ? student.studentPWS.map((pw) => pw.note) : [],
				fill: false,
				borderColor: "rgb(75, 192, 192)",
				tension: 0.1,
			},
		],
	};

	useEffect(() => {
		loadProfesseur();

	}, []);

	const loadProfesseur = async () => {
		const result = await axios.get(`http://localhost:8083/student/${id}`);
		setProfesseur(result.data);
	};



	return (

		<div className="container py-5">
			<div className="row">
				<div className="col-lg-3">
					<div className="card mb-4">

						<div className="card-body text-center">
							<img
								key={Date.now()}
								src={student.image === null ? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" : `data:image/png;base64,${student.image}`}
								alt="avatar"
								className="rounded-circle img-fluid"
								style={{ width: 150 }}
							/>

							<h5 className="my-3">
								{`${student.firstName} ${student.lastName}`}
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
										First Name
									</h5>
								</div>

								<div className="col-sm-9">
									<p className="text-muted mb-0">
										{student.firstName}
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
										{student.lastName}
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
										{student.userName}
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
										{student.password}
									</p>
								</div>
							</div>
							<hr />

							<div className="row">
								<div className="col-sm-3">
									<h5 className="mb-0">
										Number
									</h5>
								</div>

								<div className="col-sm-9">
									<p className="text-muted mb-0">
										{student.number}
									</p>
								</div>
							</div>
							<hr />
							<div className="row">
								<div className="col-sm-3">
									<h5 className="mb-0">
										Groupe
									</h5>
								</div>

								<div className="col-sm-9">
									<p className="text-muted mb-0">
										{student.groupe ? (
											student.groupe.code - student.groupe.year
										) : (
											<span>Not Assigned to any Group yet</span>
										)}
									</p>
								</div>
							</div>
							<hr />
							<div className="row">
								<div className="col-sm-3">
									<h5 className="mb-0">PWS</h5>
								</div>
								<div className="col-sm-9">
									{student && student.studentPWS && student.studentPWS.length > 0 ? (
										<div className="row">
											{student.studentPWS.map((pwStudent) => {
												// Find the corresponding PW in groupe's pws
												const groupePW = student.groupe.pws.find(groupePW => groupePW.id === pwStudent.pw);

												return (
													<div key={pwStudent.id.pw_id} className="col-md-6 mb-4">
														<div className="card">
															<div className="card-body">
																<h5 className="card-title">{groupePW.title}</h5>
																<p className="card-text">Objectif: {groupePW.objectif}</p>
																<p className="card-text">Tooth: {groupePW.tooth.name}</p>
																<p className="card-text">Note: {pwStudent.note}</p>
																<p className="card-text">Date: {pwStudent.date}</p>

																<div className="row">
																	<div className="col-sm-6">
																		{/* Display front image */}
																		<img
																			src={`data:image/jpeg;base64,${pwStudent.imageFront}`}
																			alt="Front Image"
																			className="img-fluid"
																			style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'cover' }}
																		/>
																	</div>
																	<div className="col-sm-6">
																		{/* Display side image */}
																		<img
																			src={`data:image/jpeg;base64,${pwStudent.imageSide}`}
																			alt="Side Image"
																			className="img-fluid"
																			style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'cover' }}
																		/>
																	</div>
																</div>

																<div className="row mt-3">
																	<div className="col-sm-6">
																		{/* Display alpha angles in side */}
																		<p>Alpha 1: {pwStudent.alpha1}</p>
																		<p>Alpha 2: {pwStudent.alpha2}</p>
																		<p>Alpha 3: {pwStudent.alpha3}</p>
																	</div>
																	<div className="col-sm-6">
																		{/* Display beta angles in side */}
																		<p>Beta 1: {pwStudent.beta1}</p>
																		<p>Beta 2: {pwStudent.beta2}</p>
																		<p>Beta 3: {pwStudent.beta3}</p>
																	</div>
																</div>

																
																
															</div>
														</div>
													</div>
												);
											})}
										</div>
									) : (
										<span>No PWs submitted yet</span>
									)}
								</div>



							</div>

							<hr />

							<div className="row">
							<div className="col-sm-3">
									<h5 className="mb-0">Progress Over Time</h5>
								</div>
								<div className="col-sm-9">
								
									
									{student.studentPWS && student.studentPWS.length > 0 ? (
										<div style={{ height: "300px", marginTop: "20px" }}>
											<Line data={chartData} />
										</div>
									) : (
										<p>No data available for the chart</p>
									)}
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
