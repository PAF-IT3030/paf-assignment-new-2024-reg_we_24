import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./workouthome.css"; // Import new CSS file for styling

export default function WorkOutHome() {
  const [users, setUsers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/workouts");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/workout/${id}`);
    loadUsers();
  };

  return (
    <div className="container">
      <div className="row">
        {users.map((user, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card home-card">
              <img
                src={user.image}
                className="card-img-top"
                alt={`Image of ${user.name}`}
              />
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">Muscle: {user.muscle}</p>
                <p className="card-text">Sets: {user.sett}</p>
                <p className="card-text">Time: {user.time}</p>
                <div className="button-group">
                  <Link
                    className="btn btn-primary custom-btn"
                    to={`/viewuser/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary custom-btn"
                    to={`/edituser/${user.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger custom-btn"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
