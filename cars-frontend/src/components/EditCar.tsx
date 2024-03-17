import {Car, CarResponse} from "../types.ts"
import {ChangeEvent, useState} from "react"
import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material"
import CarDialogContent from "./CarDialogContent.tsx"
import {useMutation, useQueryClient} from "@tanstack/react-query"
import {updateCar} from "../api/cars-api.ts"

type FormProps = {
    carData: CarResponse
}

function EditCar({carData}: FormProps) {
    const [isShowDialog, setShowDialog] = useState(false)
    const handleOpen = () => setShowDialog(true)
    const handleClose = () => setShowDialog(false)

    const [car, setCar] = useState<Car>({
        brand: carData.brand,
        model: carData.model,
        color: carData.color,
        registrationNumber: carData.registrationNumber,
        modelYear: carData.modelYear,
        price: carData.price,
    })
    const updateCarState = (event: ChangeEvent<HTMLInputElement>) => {
        setCar({
            ...car,
            [event.target.name]: event.target.value,
        })
    }

    const queryClient = useQueryClient()
    const {mutate} = useMutation(updateCar, {
        onSuccess: () => {
            queryClient.invalidateQueries(['cars'])
        },
        onError: (err) => {
            console.error(err)
        },
    })
    const handleSave = () => {
        const url = carData._links.self.href
        mutate({car, url})
        handleClose()
    }

    return (
        <>
            <Button size="small" onClick={handleOpen}>Edit</Button>

            <Dialog open={isShowDialog} onClose={handleClose}>
                <DialogTitle>Edit car</DialogTitle>
                <CarDialogContent car={car} onChange={updateCarState}/>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditCar
