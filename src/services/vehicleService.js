import axios from 'axios';
import { toast } from 'react-toastify';

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Get Vehicles profile
export const getVehicles = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/vehicle/all`);

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
    console.log(error);
  }
};
