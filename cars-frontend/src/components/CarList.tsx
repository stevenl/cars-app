import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import {deleteCar, getCars} from "../api/cars-api.ts"
import {DataGrid, GridCellParams, GridColDef, GridToolbar} from "@mui/x-data-grid"
import {useState} from "react"
import {Button, IconButton, Snackbar, Stack} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import AddCar from "./AddCar.tsx"
import EditCar from "./EditCar.tsx"

type CarListProps = {
    logout?: () => void,
}

function CarList({logout}: CarListProps) {
    const [isShowDeleteNotification, setShowDeleteNotification] = useState(false)
    const queryClient = useQueryClient()

    const {data, error, isSuccess} = useQuery({
        queryKey: ["cars"],
        queryFn: getCars,
    })

    const {mutate} = useMutation(deleteCar, {
        onSuccess: () => {
            setShowDeleteNotification(true)
            // refresh the page by re-fetching the data
            queryClient.invalidateQueries({queryKey: ['cars']})
        },
        onError: (err) => {
            console.error(err)
        },
    })

    const columns: GridColDef[] = [
        {field: 'brand', headerName: 'Brand', width: 200},
        {field: 'model', headerName: 'Model', width: 200},
        {field: 'color', headerName: 'Color', width: 200},
        {field: 'registrationNumber', headerName: 'Reg.nr', width: 150},
        {field: 'modelYear', headerName: 'Model Year', width: 150},
        {field: 'price', headerName: 'Price', width: 150},
        {
            field: 'edit',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <EditCar carData={params.row}/>
            ),
        },
        {
            field: 'delete',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <IconButton aria-label="delete" size="small" onClick={() => {
                    if (window.confirm(`Are you sure you want to delete ${params.row.brand} ${params.row.model}?`)) {
                        mutate(params.row._links.car.href)
                    }
                }}>
                    <DeleteIcon fontSize={"small"} />
                </IconButton>
            ),
        },
    ]

    if (!isSuccess) {
        return <span>Loading...</span>
    } else if (error) {
        return <span>Error when fetching cars...</span>
    }
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <AddCar/>
                <Button onClick={logout}>Log out</Button>
            </Stack>
            <DataGrid
                rows={data}
                columns={columns}
                getRowId={row => row._links.self.href}
                disableRowSelectionOnClick={true}
                slots={{toolbar: GridToolbar}}
            />
            <Snackbar
                open={isShowDeleteNotification}
                autoHideDuration={2000}
                onClose={() => setShowDeleteNotification(false)}
                message={"Car deleted"}
            />
        </>
    )
}

export default CarList
