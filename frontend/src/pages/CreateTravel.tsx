import React, { useState } from "react";
import { useTravelstore } from "../store/travel";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTravel: React.FC = () => {
  const [newTravel, setNewTravel] = useState({
    image: "",
    name: "",
    location: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const { createTravel } = useTravelstore();
  const navigate = useNavigate();

  const handleAddTravel = async (e: React.FormEvent) => {
    e.preventDefault();

    const travelData = {
      ...newTravel,
      price: Number(newTravel.price),
      _id: null,  
    };

    setLoading(true);
    try {
      const { success, message } = await createTravel(travelData);
      if (success) {
        toast.success(message);
        navigate("/"); 
        toast.error(message);
      }
    } catch (error) {
      toast.error("Error creating travel: " + error);
      console.error("Error creating travel:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10">
      <form className="space-y-4" onSubmit={handleAddTravel}>
        <h1 className="text-2xl font-bold">CREATE TRAVEL LOG</h1>

        <div>
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            required
            value={newTravel.image}
            onChange={(e) =>
              setNewTravel({ ...newTravel, image: e.target.value })
            }
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={newTravel.name}
            onChange={(e) => setNewTravel({ ...newTravel, name: e.target.value })}
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            required
            value={newTravel.location}
            onChange={(e) =>
              setNewTravel({ ...newTravel, location: e.target.value })
            }
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            required
            value={newTravel.price}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || !isNaN(Number(value))) {
                setNewTravel({ ...newTravel, price: value });
              }
            }}
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            required
            value={newTravel.description}
            onChange={(e) =>
              setNewTravel({ ...newTravel, description: e.target.value })
            }
            className="border rounded p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className={`bg-blue-500 text-white rounded p-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
 disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default CreateTravel;