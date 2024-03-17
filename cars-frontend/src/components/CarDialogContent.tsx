import {Car} from "../types.ts"
import {DialogContent, Stack, TextField} from "@mui/material"
import {ChangeEvent} from "react"

type CarFormProps = {
    car: Car,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

function CarDialogContent({car, onChange}: CarFormProps) {
    return (
        <DialogContent>
            <Stack spacing={2} mt={1}>
                <TextField label={"Brand"} name={"brand"}
                           value={car.brand} onChange={onChange}/><br/>
                <TextField label={"Model"} name={"model"}
                           value={car.model} onChange={onChange}/><br/>
                <TextField label={"Color"} name={"color"}
                           value={car.color} onChange={onChange}/><br/>
                <TextField label={"Year"} name={"modelYear"}
                           value={car.modelYear} onChange={onChange}/><br/>
                <TextField label={"Reg Nr"} name={"registrationNumber"}
                           value={car.registrationNumber} onChange={onChange}/><br/>
                <TextField label={"Price"} name={"price"}
                           value={car.price} onChange={onChange}/><br/>
            </Stack>
        </DialogContent>
    )
}

export default CarDialogContent
