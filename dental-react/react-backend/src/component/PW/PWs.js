import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFilePdf } from "react-icons/fa6";
import Search from "../common/Search";
import { Button } from 'primereact/button'
import { Modal } from "react-bootstrap";
import {
    FaEdit,
    FaEye,
    FaTrashAlt, FaPlus
} from "react-icons/fa";

const PW = () => {
    const port = 8083;
    const [pws, setPWs] = useState([]);
    const [search, setSearch] = useState("");
    const [pw, setPW] = useState({
        id: '',
        title: '',
        objectif: '',
        docs: '',
        tooth: {
            id: ''
        }
    });
    const [teeth, setTeeth] = useState({})
    const [modal, setModal] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);
    const url = `http://localhost:${port}`;

    const fetchPWs = async () => {
        const rep = await axios.get(`${url}/pw`);
        setPWs(rep.data);
      
    };
    const fetchTeeth = async () => {
        const rep = await axios.get(`${url}/tooth`);
        setTeeth(rep.data);
      
    };

    useEffect(() => {
        fetchPWs();
        fetchTeeth()
    }, []);
    const handleTooth = (e) => {
        setPW({
            ...pw,
            tooth: {
                ...pw.tooth,
                id: e.target.value
            }
        })
    }
    const restPw = () => {
        setPW({
            id: '',
            title: '',
            objectif: '',
            docs: '',
            tooth: {
                id: ""
            }
        })
    }

    const handlePW = (e) => {
        setPW({ ...pw, [e.target.name]: e.target.value });
    };

    const handleUpdate = (pwup) => {
        setPW(pwup)
        setUpdateMode(true)
        openModal()
    }


    const addPW = async () => {
        const rep = await axios.post(`${url}/pw`, pw)
        console.log(pw)
        restPw()
        fetchPWs();
        closeModal()
    }
    const updatePW = async () => {
        const rep = await axios.put(`${url}/pw/${pw.id}`, pw)
        restPw()
        fetchPWs()
        closeModal()
        setUpdateMode(false)
    }
    const handleDelete = async (id) => {
        await axios.delete(`${url}/pw/${id}`)
        restPw()
        fetchPWs();

    }

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
        restPw()
        setUpdateMode(false)
    };

    const handleFileChange = (e) => {
        const fileInput = e.target;
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const base64Data = reader.result.split(",")[1];
                setPW({ ...pw, docs: base64Data });
            };

            reader.readAsDataURL(file);
        }
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
                        onClick={openModal}
                        className="btn btn-info btn-lg"
                    >
                        <FaPlus />
                        Add PW
                    </Button>
                </div>

            </div>
            <table className="table table-bordered table-hover shadow">
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Title</th>
                        <th>Objectif</th>
                        <th>Document</th>
                        <th>Tooth</th>
                        <th colSpan="3">Actions</th>
                    </tr>
                </thead>

                <tbody className="text-center">
                    {pws
                        .filter((st) =>
                            st.title
                                .toLowerCase()
                                .includes(search)
                        )
                        .map((pw, index) => (
                            <tr key={pw.id}>
                                <th scope="row" key={index}>
                                    {index + 1}
                                </th>
                                <td>{pw.title}</td>
                                <td>{pw.objectif}</td>
                                <td><a a href={`data:application/pdf;base64,${pw.docs}`} download={`Document_PW_${pw.title}.pdf`} target="_blank" rel="noopener noreferrer"
                                >
                                    <FaFilePdf />
                                </a></td>
                                <td>{pw.tooth.name}</td>

                                <td className="mx-2">
                                    <Button
                                        type="button"
                                        onClick={() => handleUpdate(pw)}
                                        className="btn btn-outline-warning btn-lg"
                                    >
                                        <FaEdit />
                                    </Button>

                                </td>

                                <td className="mx-2">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(pw.id)}>
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}

                </tbody>

            </table>

            {modal && (
                <Modal show={openModal} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{updateMode ? 'Update' : 'Add'} pw</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="input-group mb-5">
                            <label className="input-group-text" htmlFor="code">
                                Title
                            </label>
                            <input
                                className="form-control col-sm-6"
                                type="text"
                                name="title"
                                value={pw.title}
                                onChange={handlePW}
                                id="input-label"

                                required

                            />
                        </div>

                        <div className="input-group mb-5">
                            <label className="input-group-text" htmlFor="year">
                                Objectif
                            </label>
                            <input
                                className="form-control col-sm-6"
                                type="text"
                                id="input-label"
                                name='objectif'
                                value={pw.objectif}
                                onChange={handlePW}
                                required

                            />
                        </div>
                        <div className="input-group mb-5">
                            <label className="input-group-text" htmlFor="year">
                                Document(PDF)
                            </label>
                            <input
                                className="form-control col-sm-6"
                                type="file"
                                id="fileInput"
                                name="docs"
                                accept=".pdf"
                                onChange={(e) => handleFileChange(e)}
                                required

                            />
                        </div>
                        <div className="input-group mb-5">
                            <label className="input-group-text" htmlFor="group">
                                Tooth
                            </label>
                            <select
                                className="form-control col-sm-6"
                                required
                                value={pw.tooth.id} onChange={handleTooth}
                            >
                                <option selected>Select Tooth</option>
                                {teeth.map((tooth, index) => (
                                    <option selected={tooth.id == pw.tooth.id} value={tooth.id}>{tooth.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="row mb-5">
                            <div className="col-sm-2">
                                <button
                                    type="submit"
                                    className="btn btn-outline-success btn-lg"
                                    onClick={updateMode ? updatePW : addPW}
                                >
                                    {updateMode ? 'update' : 'add'}
                                </button>
                            </div>

                            <div className="col-sm-2">
                                <Button
                                    className='btn btn-outline-warning btn-lg'
                                    variant="outline-warning"
                                    size="lg"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>

                    </Modal.Body>
                </Modal>

            )}




        </div>




    );
};

export default PW;
