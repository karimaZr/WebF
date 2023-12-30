import React, {
    useEffect,
    useState,
} from "react";
import axios from "axios";
import {
    FaEdit,
    FaEye,
    FaTrashAlt, FaPlus
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Search from "../common/Search";
import AddEtudiat from './AddEtudiant';
import EditStudent from "./EditEtudiant";
import { Button } from 'primereact/button';



const EtudiantView = ({ id }) => {
    const [Etudiants, setEtudiant] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [studentId,setStudentId] = useState(null);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [groups, setGroups] = useState([]);
    useEffect(() => {
        loadEtudiant();
    }, []);
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        loadEtudiant();
    };
    const handleShowModalEdit = (studentId) => {
        setShowModalEdit(true);
        setStudentId(studentId);
    };
    const handleCloseModalEdit = () => {
        setShowModalEdit(false);
        loadEtudiant();
    };
    useEffect(() => {
        loadGroups();
    }, []);
    const loadGroups = async () => {
        const result = await axios.get(
            `http://localhost:8083/groupe/professor/${id}`,
            {
                validateStatus: () => {
                    return true;
                },
            }
        );

        setGroups(result.data);

    };


    const loadEtudiant = async () => {
        const result = await axios.get(
            `http://localhost:8083/student/professor/${id}`,
            {
                validateStatus: () => {
                    return true;
                },
            }
        );

        setEtudiant(result.data);


    };

    const handleDelete = async (id) => {
        await axios.delete(
            `http://localhost:8083/student/${id}`
        );
        loadEtudiant();
    };
    return (
        <div >
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="col-sm-10">
                    <Search
                        search={search}
                        setSearch={setSearch}
                    />
                </div>
                <div className="col-sm-6">
                    <Button
                        onClick={handleShowModal}
                        className="btn btn-info btn-lg"
                    >
                        <FaPlus />
                        Add Student
                    </Button>
                </div>

            </div>

            <table className="table table-bordered table-hover shadow">
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>UserName</th>
                        <th>Password</th>
                        <th>Number</th>
                        <th>Group</th>
                        <th colSpan="3">Actions</th>
                    </tr>
                </thead>

                <tbody className="text-center">
                    {Etudiants
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
                                <td>{professor.number}</td>
                                <td>
                                    {professor.groupe ? (
                                        professor.groupe.code
                                    ) : (
                                        <span>Not Assigned to any Group yet</span>
                                    )}
                                </td>
                                <td className="mx-2">

                                    <Link
                                        to={`/etudiant-profile/${professor.id}`}
                                        className="btn btn-info">
                                        <FaEye />
                                    </Link>
                                </td>
                                <td className="mx-2">
                                    <Button
                                        type="button"
                                        onClick={() => handleShowModalEdit(professor.id)}
                                        className="btn btn-outline-warning btn-lg"
                                    >
                                        <FaEdit />
                                    </Button>

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
            {showModal && (
                <AddEtudiat
                    groups={groups}
                    showModal={showModal}
                    handleClose={handleCloseModal}
                />)}
            {showModalEdit && (
                <EditStudent
                    groups={groups}
                    id={studentId}
                    showModal={showModalEdit}
                    handleClose={handleCloseModalEdit}
                />)}

        </div>
    );
};

export default EtudiantView;