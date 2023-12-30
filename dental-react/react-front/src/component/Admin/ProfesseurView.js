import React, {
	useEffect,
	useState,
} from "react";
import axios from "axios";
import {
	FaEdit,
	FaEye,
	FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Search from "../common/Search";
import { Modal, Button } from "react-bootstrap";


const ProfesseurView = () => {
	const [professeurs, setProfesseur] = useState([]);
	const [search, setSearch] = useState("");
    const [selectedProfessor, setSelectedProfessor] = useState(null);
    const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		loadProfesseur();
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

	const handleDelete = async (id) => {
		await axios.delete(
			`http://localhost:8083/professor/${id}`
		);
		loadProfesseur();
	};
    const handleEdit = (professor) => {
        setSelectedProfessor(professor);
        setShowModal(true);
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProfessor(null);
      };
   
	return (
		<div >
			<Search
				search={search}
				setSearch={setSearch}
			/>
			<table className="table table-bordered table-hover shadow">
				<thead>
					<tr className="text-center">
						<th>ID</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>UserName</th>
                        <th>Password</th>
                        <th>Grade</th>
						<th colSpan="3">Actions</th>
					</tr>
				</thead>

				<tbody className="text-center">
					{professeurs
						.filter((st) =>
							st.firstName
								.toLowerCase()
								.includes(search)
						)
						.map((professor, index) => (
							<tr key={professor.id}>
								<th scope="row" key={index}>
									{index + 1}
								</th>
								<td>{professor.firstName}</td>
								<td>{professor.lastName}</td>
								<td>{professor.userName}</td>
								<td>{professor.password}</td>
                                <td>{professor.grade}</td>
								<td className="mx-2">
									<Link
										to={`/prof-profile/${professor.id}`}
										className="btn btn-info">
										<FaEye />
									</Link>
								</td>
								<td className="mx-2">
                                
                                <Link
										to={`/edit-prof/${professor.id}`}
										className="btn btn-warning">
										<FaEdit />
									</Link>
							
								</td>
								<td className="mx-2">
									<button
										className="btn btn-danger"
										onClick={() =>
											handleDelete(professor.id)
										}>
										<FaTrashAlt />
									</button>
								</td>
							</tr>
						))}
                       
				</tbody>
               
			</table>
            
		</div>
	);
};

export default ProfesseurView;