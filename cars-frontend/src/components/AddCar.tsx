import {ChangeEvent, useState} from "react"
import {Car} from "../types.ts"
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material"
import {useMutation, useQueryClient} from "@tanstack/react-query"
import {addCar} from "../api/cars-api.ts"

function AddCar() {
    const [isShowDialog, setShowDialog] = useState(false)
    const handleOpen = () => setShowDialog(true)
    const handleClose = () => setShowDialog(false)

    const [car, setCar] = useState<Car>({
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price: 0,
    })
    const updateCarState = (event: ChangeEvent<HTMLInputElement>) =>
        setCar({
            ...car,
            [event.target.name]: event.target.value,
        })

    const queryClient = useQueryClient()
    const {mutate} = useMutation(addCar, {
        onSuccess: () => {
            queryClient.invalidateQueries(['cars'])
        },
        onError: (err) => {
            console.error(err)
        },
    })
    const handleSave = () => {
        mutate(car)
        setCar({brand: '', model: '', color: '', registrationNumber: '', modelYear: 0, price: 0})
        handleClose()
    }

    return (
        <>
            <button onClick={handleOpen}>New car</button>

            <Dialog open={isShowDialog} onClose={handleClose}>
                <DialogTitle>New car</DialogTitle>
                <DialogContent>
                    <input placeholder={"Brand"} name={"brand"}
                           value={car.brand} onChange={updateCarState}/><br/>
                    <input placeholder={"Model"} name={"model"}
                           value={car.model} onChange={updateCarState}/><br/>
                    <input placeholder={"Color"} name={"color"}
                           value={car.color} onChange={updateCarState}/><br/>
                    <input placeholder={"Year"} name={"modelYear"}
                           value={car.modelYear} onChange={updateCarState}/><br/>
                    <input placeholder={"Reg Nr"} name={"registrationNumber"}
                           value={car.registrationNumber} onChange={updateCarState}/><br/>
                    <input placeholder={"Price"} name={"price"}
                           value={car.price} onChange={updateCarState}/><br/>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddCar
