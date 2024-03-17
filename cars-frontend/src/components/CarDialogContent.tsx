import {Car} from "../types.ts"
import {DialogContent} from "@mui/material"
import {ChangeEvent} from "react"

type CarFormProps = {
    car: Car,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

function CarDialogContent({car, onChange}: CarFormProps) {
    return (
        <DialogContent>
            <input placeholder={"Brand"} name={"brand"}
                   value={car.brand} onChange={onChange}/><br/>
            <input placeholder={"Model"} name={"model"}
                   value={car.model} onChange={onChange}/><br/>
            <input placeholder={"Color"} name={"color"}
                   value={car.color} onChange={onChange}/><br/>
            <input placeholder={"Year"} name={"modelYear"}
                   value={car.modelYear} onChange={onChange}/><br/>
            <input placeholder={"Reg Nr"} name={"registrationNumber"}
                   value={car.registrationNumber} onChange={onChange}/><br/>
            <input placeholder={"Price"} name={"price"}
                   value={car.price} onChange={onChange}/><br/>
        </DialogContent>
    )
}

export default CarDialogContent
