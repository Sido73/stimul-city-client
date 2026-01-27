import axios from "axios";

export const api = {
  contact: async (name: string, phone: string, message: string) => {
    const response = await axios.post('http://localhost:3000/api/contact', {
      name,
      phone,
      message,
    });
    return response.data;
  },
};