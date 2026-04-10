import axiosInstance from "@/lib/axios"; // import ตัวที่เราตั้งค่าไว้
import { create } from "domain";

export const homeService = {
  getHomeData: async () => {
    try {
      const response = await axiosInstance.get("/home");
      return response.data;
    } catch (error) {
      // จัดการ Error เฉพาะส่วนของ Service
      throw error;
    }
  },
  createHome: async (homeData) => {
    try {
      const response = await axiosInstance.post("/home", homeData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateHome: async (homeId, homeData) => {
    try {
      const response = await axiosInstance.put(`/home/${homeId}`, homeData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
