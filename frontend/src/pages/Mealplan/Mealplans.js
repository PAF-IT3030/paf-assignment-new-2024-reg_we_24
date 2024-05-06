import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Mealplans() {
  const [mealplan, setMealplan] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadMealplan();
  }, []);

  const loadMealplan = async () => {
    const result = await axios.get("http://localhost:8080/MeelPlans");
    setMealplan(result.data);
  };

  const deleteMealplan = async (id) => {
    await axios.delete(`http://localhost:8080/MeelPlanDel/${id}`);
    loadMealplan();
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {mealplan.map((meal, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{meal.title}</td>
                <td>{meal.description}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewmealplan/${meal.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editmealplan/${meal.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteMealplan(meal.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
