import {Car, CarEntry, CarResponse} from "../types.ts";
import axios, {AxiosRequestConfig} from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL

export const getCars = async (): Promise<CarResponse[]> => {
    const response = await axios.get(`${VITE_API_URL}/api/cars`, getRequestConfig())
    return response.data._embedded.cars
}

export const addCar = async (car: Car): Promise<CarResponse> => {
    const response = await axios.post(
        `${VITE_API_URL}/api/cars`, car, getRequestConfig()
    )
    return response.data
}

export const updateCar = async (carEntry: CarEntry): Promise<CarResponse> => {
    const response = await axios.put(
        carEntry.url, carEntry.car, getRequestConfig()
    )
    return response.data
}

export const deleteCar = async (link: string): Promise<CarResponse> => {
    const response = await axios.delete(link, getRequestConfig())
    return response.data
}

function getRequestConfig(): AxiosRequestConfig {
    const token =  sessionStorage.getItem("jwt")
    return {
        headers: {
            'Content-Type': "application/json",
            Authorization: token,
        }
    }
}
