import React, { useState, useEffect, useParams } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const AddGroupe = ({ id, showModal, handleClose }) => {
    const navigate = useNavigate();

    // State to manage the form data
    const [groupData, setGroupData] = useState({
        code: "",
        year: ""
    });
    


    // Handler for form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGroupData({
            ...groupData,
            [name]: value
        });
    };

    // Handler for form submission
    // Handler for form submission
    const saveGroup = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`http://localhost:8083/groupe/add/${id}`, groupData);

            // Close the modal after successful submission
            handleClose();

        } catch (error) {
            console.error("Error adding group:", error);
        }
    };


    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={(e) => saveGroup(e)}>
                    <div className="input-group mb-5">
                        <label className="input-group-text" htmlFor="code">
                            Group Code
                        </label>
                        <input
                            className="form-control col-sm-6"
                            type="text"
                            name="code"
                            id="code"
                            required
                            value={groupData.code}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>

                    <div className="input-group mb-5">
                        <label className="input-group-text" htmlFor="year">
                            Academic Year
                        </label>
                        <input
                            className="form-control col-sm-6"
                            type="text"
                            name="year"
                            id="year"
                            required
                            value={groupData.year}
                            onChange={(e) => handleInputChange(e)}
                        />
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

export default AddGroupe;
