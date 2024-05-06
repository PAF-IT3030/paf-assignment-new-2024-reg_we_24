import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditMealplan() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [mealplan, setMealplan] = useState({
    title: "",
    description: "",
  });

  const { title, description } = mealplan;

  const onInputChange = (e) => {
    setMealplan({ ...mealplan, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadMealplan();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/MeelPlanUpdate/${id}`, mealplan);
    navigate("/mealplans");
  };

  const loadMealplan = async () => {
    const result = await axios.get(`http://localhost:8080/meelplan/${id}`);
    setMealplan(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Mealplan</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the title"
                name="title" // Make sure the name attribute matches the state key
                value={title}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the description"
                name="description" // Make sure the name attribute matches the state key
                value={description}
                onChange={onInputChange}
              />
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
