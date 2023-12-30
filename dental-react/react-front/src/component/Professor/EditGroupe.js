import React, { useState, useEffect, useParams } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const EditGroupe = ({ id, showModal, handleClose }) => {
    // State to manage the form data
    const [groupData, setGroupData] = useState({
        code: "",
        year: ""
    });
    useEffect(() => {
		loadGroup();
	}, []);

    const loadGroup = async () => {
        try {
            const result = await axios.get(`http://localhost:8083/groupe/${id}`);
            setGroupData(result.data);
        } catch (error) {
            console.error("Error loading group:", error);
        }
    };
    // Handler for form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGroupData({
            ...groupData,
            [name]: value
        });
    };

    const updateGroup = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8083/groupe/${id}`, groupData);

            // Close the modal after successful submission
            handleClose();

        } catch (error) {
            console.error("Error update group:", error);
        }
    };


    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={(e) => updateGroup(e)}>
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

export default EditGroupe;
