import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from "../common/Search";
import { Button } from 'primereact/button'
import { Modal } from "react-bootstrap";
import {
    FaEdit,
    FaEye,
    FaTrashAlt, FaPlus
} from "react-icons/fa";

const Tooth = () => {
    const port = 8083;
    const [teeth, setTeeth] = useState([]);
    const [search, setSearch] = useState("");
    const [tooth, setTooth] = useState({
        id: '',
        name: ''

    });
    const [modal, setModal] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);
    const url = `http://localhost:${port}`;

    const fetchTeeth = async () => {
        const rep = await axios.get(`${url}/tooth`);
        setTeeth(rep.data);

    };

    useEffect(() => {
        fetchTeeth()
    }, []);

    const handleTooth = (e) => {
        setTooth({ ...tooth, [e.target.name]: e.target.value });
    }
    const restTooth = () => {
        setTooth({
            id: '',
            name: '',

        })
    }


    const handleUpdate = (toothup) => {
        setTooth(toothup);
        setUpdateMode(true);
        openModal();
    }


    const addtooth = async () => {
        const rep = await axios.post(`${url}/tooth`, tooth);
        console.log(tooth)
        restTooth()
        fetchTeeth();
        closeModal()
    }
    const updatetooth = async () => {
        const rep = await axios.put(`${url}/tooth/${tooth.id}`, tooth);
        restTooth()
        fetchTeeth()
        closeModal()
        setUpdateMode(false)
    }

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8083/tooth/${id}`);
        restTooth();
        fetchTeeth();

    }



    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
        restTooth()
        setUpdateMode(false)
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
                        Add Tooth
                    </Button>
                </div>

            </div>
            <table className="table table-bordered table-hover shadow">
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Name</th>

                        <th colSpan="3">Actions</th>
                    </tr>
                </thead>

                <tbody className="text-center">
                    {teeth
                        .filter((st) =>
                            st.name
                                .toLowerCase()
                                .includes(search)
                        )
                        .map((tooth, index) => (
                            <tr key={tooth.id}>
                                <th scope="row" key={index}>
                                    {index + 1}
                                </th>
                                <td>{tooth.name}</td>


                                <td className="mx-2">
                                    <Button
                                        type="button"
                                        onClick={() => handleUpdate(tooth)}
                                        className="btn btn-outline-warning btn-lg"
                                    >
                                        <FaEdit />
                                    </Button>

                                </td>

                                <td className="mx-2">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(tooth.id)}>
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
                        <Modal.Title>{updateMode ? 'Update' : 'Add'} tooth</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="input-group mb-5">
                            <label className="input-group-text" htmlFor="code">
                                Name
                            </label>
                            <input
                                className="form-control col-sm-6"
                                type="text"
                                name="name"
                                value={tooth.name}
                                onChange={handleTooth}
                                id="input-label"

                                required

                            />
                        </div>

                        <div className="row mb-5">
                            <div className="col-sm-2">
                                <button
                                    type="submit"
                                    className="btn btn-outline-success btn-lg"
                                    onClick={updateMode ? updatetooth : addtooth}
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

export default Tooth;
