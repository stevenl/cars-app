import {useQuery} from "@tanstack/react-query";
import {getCars} from "../api/cars-api.ts";
import {DataGrid, GridColDef} from "@mui/x-data-grid";

function CarList() {
    const {data, error, isSuccess} = useQuery({
        queryKey: ["cars"],
        queryFn: getCars,
    })

    const columns: GridColDef[] = [
        {field: 'brand', headerName: 'Brand', width: 200},
        {field: 'model', headerName: 'Model', width: 200},
        {field: 'color', headerName: 'Color', width: 200},
        {field: 'registrationNumber', headerName: 'Reg.nr', width: 150},
        {field: 'modelYear', headerName: 'Model Year', width: 150},
        {field: 'price', headerName: 'Price', width: 150},
    ]

    if (!isSuccess) {
        return <span>Loading...</span>
    } else if (error) {
        return <span>Error when fetching cars...</span>
    }
    return (
        <DataGrid
            rows={data}
            columns={columns}
            getRowId={row => row._links.self.href}
        />
    )
}

export default CarList
