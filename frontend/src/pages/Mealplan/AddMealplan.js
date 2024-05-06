import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddMeelplan() {
  let navigate = useNavigate();

  const [meelplan, setmeelplan] = useState({
    title: "",
    description: "",
  });

  const { title, description } = meelplan;

  const onInputChange = (e) => {
    setmeelplan({ ...meelplan, [e.target.name]: e.target.value });
  };
  

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/MeelPlan", meelplan);
    navigate("/mealplans");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">ADD MEELPLAN</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">

            </div>
            <div className="mb-3">
              <input type="text"
                placeholder="Meel Plan Name"
                name="title"
                value={title}
                onChange={onInputChange} />
            </div>
            <div className="mb-3">
              <textarea
                placeholder="Meel Plan Description"
                name="description"
                value={description}
                onChange={onInputChange} />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/mealplans">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
