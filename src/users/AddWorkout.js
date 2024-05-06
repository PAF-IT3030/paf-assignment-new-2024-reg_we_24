import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./addUser.css"; // Import CSS file for styling

export default function AddWorkout() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    muscle: "",
    sett: "",
    time: "",
    image: ""
  });

  const { name, muscle, sett, time, image } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/workout", user);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow custom-card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4 custom-title">Add Workout Plan</h2>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="custom-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    id="name"
                    name="name"
                    value={name}
                    onChange={onInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="muscle" className="custom-label">
                    Muscle
                  </label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    id="muscle"
                    name="muscle"
                    value={muscle}
                    onChange={onInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sett" className="custom-label">
                    Set
                  </label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    id="sett"
                    name="sett"
                    value={sett}
                    onChange={onInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="time" className="custom-label">
                    Time
                  </label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    id="time"
                    name="time"
                    value={time}
                    onChange={onInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="image" className="custom-label">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    className="form-control custom-input"
                    id="image"
                    name="image"
                    accept=".jpg, .jpeg, .png"
                    value={image}
                    onChange={onInputChange}
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary custom-button">
                    Submit
                  </button>
                  <Link to="/" className="btn btn-secondary custom-button mt-2">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
