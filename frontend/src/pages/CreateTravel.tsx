import React, { useState } from "react";
import { useTravelstore } from "../store/travel";
import { Link } from "react-router-dom";

const CreateTravel: React.FC = () => {
  const [newTravel, setNewTravel] = useState({
    image: "",
    name: "",
    location: "",
    price: "",
    description: "",
  });

  const { createTravel } = useTravelstore();

  const handleAddTravel = async (e: React.FormEvent) => {
    e.preventDefault();

    const travelData = {
      ...newTravel,
      price: Number(newTravel.price),
      _id: null,  // _id is null for new travel entries
    };

    try {
      const { success, message } = await createTravel(travelData);
      if (success) {
        console.log(message);
      } else {
        console.error(message);
      }
    } catch (error) {
      console.error("Error creating travel:", error);
    }
  };

  return (
    <form className="space-y-4 py-10" onSubmit={handleAddTravel}>
      <h1>CREATE TRAVEL LOG</h1>

      <div>
        <label>Image URL:</label>
        <input
          type="text"
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
        <label>Name:</label>
        <input
          type="text"
          name="name"
          required
          value={newTravel.name}
          onChange={(e) => setNewTravel({ ...newTravel, name: e.target.value })}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <label>Location:</label>
        <input
          type="text"
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
        <label>Price:</label>
        <input
          type="number"
          name="price"
          required
          value={newTravel.price}
          onChange={(e) =>
            setNewTravel({ ...newTravel, price: e.target.value })
          }
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          name="description"
          required
          value={newTravel.description}
          onChange={(e) =>
            setNewTravel({ ...newTravel, description: e.target.value })
          }
          className="border rounded p-2 w-full"
        />
      </div>

      <Link to={"/"}>
        <button type="submit" className="bg-blue-500 text-white rounded p-2">
          Submit
        </button>
      </Link>
    </form>
  );
};

export default CreateTravel;
