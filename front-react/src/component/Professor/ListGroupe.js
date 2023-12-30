import React, {
    useEffect,
    useState,
} from "react";
import axios from "axios";
import AddGroupe from "./AddGroupe";
import { Button } from 'primereact/button';
import {
    FaEdit,
    FaEye,
    FaTrashAlt, FaPlus
} from "react-icons/fa";
import { Modal, Form, Dropdown } from 'react-bootstrap'
import { Link } from "react-router-dom";
import Search from "../common/Search";
import EditGroupe from "./EditGroupe";
import { FaFolderPlus } from "react-icons/fa6";





const ProfesseurView = ({ id }) => {
    const [professeurs, setProfesseur] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [groupId, setGroupeId] = useState(null);
    const [pwList, setPWList] = useState([]);
    const [selectedPW, setSelectedPW] = useState('');
    const [show, setShow] = useState(false);
    const [idGroup, setiDGroup] = useState(null);


    const handleAddPW = (groupeID) => {
        setShow(true);
        setiDGroup(groupeID);

    };
    useEffect(() => {
        const fetchPWList = async () => {
            try {
                const response = await axios.get('http://localhost:8083/pw');
                setPWList(response.data);
            } catch (error) {
                console.error('Error fetching PW list:', error);
            }
        };

        fetchPWList();
    }, []);



    const handleSave = async () => {
        // Pass the selected PW ID to the saveStudentPW function
        console.log(idGroup)
        console.log(selectedPW)
        await axios.post(`http://localhost:8083/groupe/pw/${idGroup}/${selectedPW}`);


        handleClose();


    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleShowModalEdit = (profId) => {
        setShowModalEdit(true);
        setGroupeId(profId);
    };
    const handleClose = () => {
        setShow(false);
        loadProfesseur();
    };
    const handleCloseModal = () => {
        setShowModal(false);
        loadProfesseur();
    };
    const handleCloseModalEdit = () => {
        setShowModalEdit(false);
        loadProfesseur();
    };
    useEffect(() => {
        loadProfesseur();
    }, []);

    const getTPDetailsById = (tpId, students) => {
        for (const student of students) {
            for (const tp of student.studentPWS) {
                if (tp.pw.id === tpId) {
                    return {
                        title: tp.pw.title,
                        objective: tp.pw.objectif,
                    };
                }
            }
        }
        return {
            title: tpId,
            objective: "",
        };
    };

    const loadProfesseur = async () => {
        const result = await axios.get(
            `http://localhost:8083/groupe/professor/${id}`,
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
            `http://localhost:8083/groupe/${id}`
        );
        loadProfesseur();
    };

    return (

        <div>
            <div >


                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="col-sm-10">
                        <Search
                            search={search}
                            setSearch={setSearch}
                        />
                    </div>
                    <div className="col-sm-6"> {/* Adjust the column size as needed */}
                        <Button
                            onClick={handleShowModal}
                            className="btn btn-info btn-lg"
                        >
                            <FaPlus />
                            Add Group
                        </Button>
                    </div>

                </div>
                <table className="table table-bordered table-hover shadow">
                    <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Code</th>
                            <th>PW's List</th>
                            <th>Year</th>
                            <th>PWS Submitted</th>
                            <th>ADD PW</th>
                            <th colSpan="3">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="text-center">
                        {professeurs
                            .filter((st) =>
                                st.code
                                    .toLowerCase()
                                    .includes(search)
                            )
                            .map((professor, index) => (
                                <tr key={professor.id}>
                                    <th scope="row" key={index}>
                                        {index + 1}
                                    </th>
                                    <td>{professor.code}</td>
                                    <td> {professor.pws.length !== 0 ? professor.pws.map((pw) => (
                                        <td className="mx-2">
                                            <div className="d-flex align-items-center mx-2">
                                                <span>
                                                    {getTPDetailsById(pw, professor.students).title} - {getTPDetailsById(pw, professor.students).objective}
                                                </span>
                                            </div>
                                        </td>
                                    )) :
                                        <p>{console.log()}no pws</p>}</td>
                                    <td>{professor.year}</td>
                                    <td >
                                        {professor.students.length ? (
                                            professor.students.map((student) => (
                                                <div key={student.id} >
                                                    <strong>{student.lastName} {student.firstName}
                                                        <td className="mx-2">
                                                            <div className="d-flex align-items-center mx-2">
                                                                <Link
                                                                    to={`/etudiant-profile/${student.id}`}
                                                                    className="btn btn-info">
                                                                    <FaEye />
                                                                </Link>

                                                            </div>
                                                        </td></strong>
                                                    <ul>
                                                        {student.studentPWS && student.studentPWS.length > 0 ? (
                                                            student.studentPWS.map((tp) => (
                                                                <li key={tp.pw.id}>
                                                                    {tp.pw.title} - {tp.pw.objectif}
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <li>No TP submitted yet</li>
                                                        )}
                                                    </ul>
                                                </div>
                                            ))
                                        ) : (
                                            <ul><li>No students available</li></ul>
                                        )}
                                    </td>
                                    <td className="mx-2">
                                        <Button
                                            type="button"
                                            onClick={() => handleAddPW(professor.id)}
                                            className="btn btn-outline-succes btn-lg"
                                        >
                                            <FaFolderPlus />
                                        </Button>
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
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(professor.id)}>
                                            <FaTrashAlt />
                                        </button>
                                    </td>


                                </tr>
                            ))}

                    </tbody>

                </table>
                {showModal && (
                    <AddGroupe
                        id={id}
                        showModal={showModal}
                        handleClose={handleCloseModal}
                    />)}
                {showModalEdit && (
                    <EditGroupe
                        id={groupId}
                        showModal={showModalEdit}
                        handleClose={handleCloseModalEdit}
                    />
                )}
                {show && (<Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add PW to Student</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="pwSelect">
                                <Form.Label>Select PW</Form.Label>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {selectedPW ? `PW ID: ${selectedPW}` : 'Select PW'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {pwList.map((pw) => (
                                            <Dropdown.Item
                                                key={pw.id}
                                                onClick={() => setSelectedPW(pw.id)}
                                            >
                                                {pw.title}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>

                        <div className="col-sm-2">
                            <button
                                onClick={handleSave}
                                className="btn btn-outline-success btn-lg"
                            >
                                Save
                            </button>
                        </div>
                        <div className="col-sm-2">
                            <button

                                className="btn btn-outline-danger btn-lg"
                                size="lg"
                                onClick={handleClose}
                            >
                                close
                            </button>
                        </div>

                    </Modal.Footer>
                </Modal>

                )}
            </div>

        </div>
    );
};

export default ProfesseurView;


