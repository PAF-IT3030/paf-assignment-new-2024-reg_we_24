import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Check() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(`http://localhost:8080/users?q=${searchTerm}`);
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/user/${id}`);
    loadUsers();
  };

  const handleSearch = async () => {
    loadUsers();
  };

  return (
    <div className="container">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary ml-2" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="row">
        {users.map((user, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card">
              <img
                src={user.image}
                className="card-img-top"
                alt={`Image of ${user.name}`}
              />
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">Username: {user.username}</p>
                <p className="card-text">Email: {user.email}</p>
                <div className="btn-group" role="group">
                  <Link
                    className="btn btn-primary"
                    to={`/viewuser/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary"
                    to={`/edituser/${user.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
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
