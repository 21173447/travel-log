import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useTravelstore } from "../store/travel";

interface Travel {
  _id: string | null;
  name: string;
  price: number;
  image: string;
  location: string;
  description: string;
}

const HomePage = () => {
  const { fetchTravels, travels, updateTravel, deleteTravel } = useTravelstore();
  const [editTravelDetails, setEditTravelDetails] = useState<Travel | null>(null);

  const handleDelete = async (tid: string | null) => {
    if (tid === null) {
      toast.error("Cannot delete travel, invalid ID.");
      return;
    }

    const { success, message } = await deleteTravel(tid);
    if (success) {
      toast.success(message);
    } else {
      toast.error(`Failed to delete travel: ${message}`);
    }
  };

  const handleEdit = (travel: Travel) => {
    setEditTravelDetails({
      ...travel,
      location: travel.location || "",
      description: travel.description || "",
    });
  };

  const handleUpdate = async () => {
    if (editTravelDetails && editTravelDetails._id) {
      const { success, message } = await updateTravel(editTravelDetails._id, editTravelDetails);
      if (success) {
        toast.success("Travel updated successfully");
        setEditTravelDetails(null);
      } else {
        toast.error(`Failed to update travel: ${message}`);
      }
    } else {
      toast.error("Invalid travel ID.");
    }
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).classList.contains("modal-overlay")) {
      setEditTravelDetails(null);
    }
  };

  useEffect(() => {
    fetchTravels();
  }, [fetchTravels]);

  return (
    <section className="dark:bg-blue-900 h-[100vh]">
      <div className="grid place-content-center py-20">
        <h1 className="grid place-content-center">Your Travel Memories 🚀</h1>

        {travels && travels.length > 0 ? (
          <div className="grid grid-cols-4 gap-4 py-10">
            {travels.map((travel: Travel, index: number) => {
              // Skip invalid or undefined travel entries
              if (!travel || !travel.image) {
                console.warn(`Travel item at index ${index} is invalid:`, travel);
                return null;
              }

              return (
                <div key={travel._id || `new-${index}`} className="w-56 p-1 shadow-lg rounded-md">
                  <img
                    src={travel.image}
                    alt={travel.name}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <h2 className="font-thin">{travel.name}</h2>
                  <h2 className="font-thin">{travel.location}</h2>
                
                  <div className="flex space-x-2">
                    <MdDelete
                      className="bg-red-400 text-white text-lg rounded-sm"
                      onClick={() => handleDelete(travel._id)}
                    />
                    <MdEdit
                      className="bg-blue-400 text-white text-lg rounded-sm"
                      onClick={() => handleEdit(travel)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h1>No travel memories found 😥</h1>
        )}

        <div className="font-bold text-blue-400 hover:underline">
          <Link to="/create">Create a new travel memory</Link>
        </div>

        {editTravelDetails && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center modal-overlay"
            onClick={handleOutsideClick}
          >
            <div
              className="bg-white p-8 rounded-lg shadow-lg w-96"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4">Edit Travel</h2>
              <label className="block mb-2">Name</label>
              <input
                type="text"
                value={editTravelDetails?.name}
                onChange={(e) =>
                  setEditTravelDetails({ ...editTravelDetails!, name: e.target.value })
                }
                className="w-full p-2 mb-4 border rounded"
              />
              <label className="block mb-2">Price</label>
              <input
                type="number"
                value={editTravelDetails?.price}
                onChange={(e) =>
                  setEditTravelDetails({ ...editTravelDetails!, price: parseFloat(e.target.value) })
                }
                className="w-full p-2 mb-4 border rounded"
              />
              <label className="block mb-2">Image URL</label>
              <input
                type="text"
                value={editTravelDetails?.image}
                onChange={(e) =>
                  setEditTravelDetails({ ...editTravelDetails!, image: e.target.value })
                }
                className="w-full p-2 mb-4 border rounded"
              />
              <label className="block mb-2">Location</label>
              <input
                type="text"
                value={editTravelDetails?.location}
                onChange={(e) =>
                  setEditTravelDetails({ ...editTravelDetails!, location: e.target.value })
                }
                className="w-full p-2 mb-4 border rounded"
              />
              <label className="block mb-2">Description</label>
              <textarea
                value={editTravelDetails?.description}
                onChange={(e) =>
                  setEditTravelDetails({
                    ...editTravelDetails!,
                    description: e.target.value,
                  })
                }
                className="w-full p-2 mb-4 border rounded"
              />
              <div className="flex space-x-4">
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditTravelDetails(null)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </section>
  );
};

export default HomePage;
