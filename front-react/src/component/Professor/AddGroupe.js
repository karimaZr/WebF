import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddGroupe = () => {
    const navigate = useNavigate();

    // State to manage the form data
    const [groupData, setGroupData] = useState({
        code: "",
        year: "",
        professor: { id: 0 },

    });

    // State to store data for dropdowns
    const [professors, setProfessors] = useState([]);

    // Fetch data for dropdowns when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch professors
                const professorsResponse = await axios.get("http://localhost:8083/professor");
                setProfessors(professorsResponse.data);


            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this effect runs once on mount

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
        // Convert groupData to a JSON string
        const groupDataJson = JSON.stringify(groupData);

        // Send the JSON string in the request
        await axios.post("http://localhost:8083/groupe", groupDataJson, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Redirect to the view page after successful submission
        navigate("/view-groups");
    } catch (error) {
        console.error("Error adding group:", error);
    }
};


    return (
        <div className="col-sm-8 py-2 px-5 offset-2 shadow">
            <h2 className="mt-5"> Add Group</h2>
            <form onSubmit={(e) => saveGroup(e)}>
                {/* Group Code */}
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

                {/* Academic Year */}
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

                {/* Professor Dropdown */}
                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="professorId">
                        Professor
                    </label>
                    <select
                        className="form-control col-sm-6"
                        name="professor"
                        id="professor"
                        required
                        value={groupData.professor}
                        onChange={(e) => handleInputChange(e)}
                    >
                        <option value="">Select Professor</option>
                        {professors.map((professor) => (
                            <option key={professor.id} value={professor.id}>
                                {`${professor.firstName} ${professor.lastName}`}
                            </option>
                        ))}
                    </select>
                </div>



                {/* Submit button */}
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
                        <Link
                            to={"/view-groupe"}
                            type="submit"
                            className="btn btn-outline-warning btn-lg"
                        >
                            Cancel
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddGroupe;
