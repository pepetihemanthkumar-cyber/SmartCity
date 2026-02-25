import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function ServiceDetail() {
  const { name } = useParams();
  const navigate = useNavigate();

  const services =
    JSON.parse(localStorage.getItem("cityServices")) || [];

  const service = services.find(
    s => s.name === name
  );

  if (!service) {
    return (
      <div className="container mt-5">
        <h3>Service not found</h3>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/user")}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-5 text-center">
      <h2>
        {service.icon} {service.name}
      </h2>

      <p className="mt-4">
        This is detailed information about {service.name}.
        Smart City services ensure better public facilities
        and citizen satisfaction.
      </p>

      <button
        className="btn btn-primary mt-4"
        onClick={() => navigate("/user")}
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default ServiceDetail;