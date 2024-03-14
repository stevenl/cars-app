import {CarResponse} from "../types.ts";
import axios from "axios";

export const getCars = async (): Promise<CarResponse[]> => {
    const VITE_API_URL = import.meta.env.VITE_API_URL
    const response = await axios.get(`${VITE_API_URL}/api/cars`)
    return response.data._embedded.cars
}

export const deleteCar = async (link: string): Promise<CarResponse> => {
    const response = await axios.delete(link)
    return response.data
}
