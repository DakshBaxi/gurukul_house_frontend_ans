import axios from 'axios';

const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const fetchHostelsData = async () => {
    try {
        const response = await axios.get(`${api}/api/hostels`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching hostels data:", error);
        throw error;
    }   
};


export const fetchHostelData = async (id: string) => {
    try {
        const response = await axios.get(`${api}/api/hostels/${id}`);
        return response.data;
    }
    catch (error) {
        console.error(`Error fetching hostel data for ID ${id}:`, error);
        throw error;
    }
};