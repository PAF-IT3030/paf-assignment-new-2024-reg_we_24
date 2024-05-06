import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewMealplan() {
  const [user, setUser] = useState({
    id: "",
    title: "",
    description: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/meelplan/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">{user.title} Details</h2>

          <div className="card">
            <div className="card-header">
              Details of user id : {user.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Id:</b>
                  {user.id}
                </li>
                <li className="list-group-item">
                  <b>Title:</b>
                  {user.title}
                </li>
                <li className="list-group-item">
                  <b>Description:</b>
                  {user.description}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/mealplans"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
