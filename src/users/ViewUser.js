import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./viewUser.css"; // Import CSS file for styling

export default function ViewUser() {
  const [user, setUser] = useState({
    name: "",
    muscle: "",
    sett: "",
    time: "",
    image: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/workout/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow custom-cardd">
            <div className="card-bodyy d-flex align-items-center">
              <div className="detailss">
                <h2 className="card-title mb-4 custom-titlee">User Details</h2>
                <p className="detail-items">
                  <span className="detail-labell">ID:</span> {user.id}
                </p>
                <p className="detail-items">
                  <span className="detail-labell">Name:</span> {user.name}
                </p>
                <p className="detail-items">
                  <span className="detail-labell">Muscle:</span> {user.muscle}
                </p>
                <p className="detail-items">
                  <span className="detail-labell">Set:</span> {user.sett}
                </p>
              </div>
              {/* Image part */}
              <div className="user-imagee-container">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={`Image of ${user.name}`}
                    className="user-imagee"
                  />
                ) : (
                  <span>No image</span>
                )}
              </div>
            </div>
            <Link to={"/"} className="btn btn-primary custom-button">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
