import { create } from "zustand";

interface Travel {
  _id: string | null;
  image: string;
  name: string;
  location: string;
  price: number;
  description: string;
}

interface TravelStore {
  travels: Travel[];
  setTravels: (travels: Travel[]) => void;
  createTravel: (newTravel: Travel) => Promise<{ success: boolean; message: string }>;
  fetchTravels: () => Promise<void>;
  deleteTravel: (tid: string) => Promise<{ success: boolean; message: string }>;
  updateTravel: (tid: string, updateTravel: Travel) => Promise<{ success: boolean; message: string }>;
}

export const useTravelstore = create<TravelStore>((set) => ({
  travels: [],
  setTravels: (travels) => set({ travels }),

  createTravel: async (newTravel) => {
    // Validate that all fields are filled
    if (!newTravel.name || !newTravel.image || !newTravel.location || !newTravel.price || !newTravel.description) {
      return { success: false, message: "Please fill in all required fields." };
    }

    try {
      const res = await fetch("/api/travel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTravel),
      });

      const data = await res.json();
      set((state) => ({ travels: [...state.travels, data.data] }));
      return { success: true, message: "Travel created successfully." };
    } catch (error) {
      console.error("Failed to create travel:", error);
      return { success: false, message: "Error creating travel." };
    }
  },

  fetchTravels: async () => {
    try {
      const res = await fetch("/api/travel");
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      set({ travels: data.data });
    } catch (error) {
      console.error("Failed to fetch travels:", error);
    }
  },

  deleteTravel: async (tid) => {
    try {
      const res = await fetch(`/api/travel/${tid}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        return { success: false, message: errorData.message };
      }

      const data = await res.json();
      set((state) => ({ travels: state.travels.filter((travel) => travel._id !== tid) }));
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Failed to delete travel:", error);
      return { success: false, message: "Error deleting travel." };
    }
  },

  updateTravel: async (tid, updateTravel) => {
    try {
      const res = await fetch(`/api/travel/${tid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateTravel),
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        travels: state.travels.map((travel) =>
          travel._id === tid ? data.data : travel
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Failed to update travel:", error);
      return { success: false, message: "Error updating travel." };
    }
  },
}));
