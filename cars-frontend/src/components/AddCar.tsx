import {ChangeEvent, useState} from "react"
import {Car} from "../types.ts"
import {Dialog, DialogActions, DialogTitle} from "@mui/material"
import {useMutation, useQueryClient} from "@tanstack/react-query"
import {addCar} from "../api/cars-api.ts"
import CarDialogContent from "./CarDialogContent.tsx"

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
                <CarDialogContent car={car} onChange={updateCarState}/>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddCar
