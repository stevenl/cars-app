import {Car, CarResponse} from "../types.ts";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL

export const getCars = async (): Promise<CarResponse[]> => {
    const response = await axios.get(`${VITE_API_URL}/api/cars`)
    return response.data._embedded.cars
}

export const addCar = async (car: Car): Promise<CarResponse> => {
    const response = await axios.post(
        `${VITE_API_URL}/api/cars`, car, {
            headers: {
                'Content-Type': "application/json",
            },
        },
    )
    return response.data
}

export const deleteCar = async (link: string): Promise<CarResponse> => {
    const response = await axios.delete(link)
    return response.data
}
