import {ChangeEvent, useState} from "react"
import {Button, Stack, TextField} from "@mui/material"
import axios from "axios"
import CarList from "./CarList.tsx"

const VITE_API_URL = import.meta.env.VITE_API_URL

type User = {
    username: string
    password: string
}

function Login() {
    const [user, setUser] = useState<User>({
        username: '',
        password: '',
    })
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        })
    }

    const [isAuthenticated, setAuthenticated] = useState(false)
    const handleLogin = () => {
        axios.post(`${VITE_API_URL}/login`, user, {
            headers: {"Content-Type": "application/json"}
        })
        .then(res => {
            const jwtToken = res.headers.authorization
            if (jwtToken !== null) {
                sessionStorage.setItem("jwt", jwtToken)
                setAuthenticated(true)
            }
        })
        .catch(err => console.error(err))
    }

    if (isAuthenticated) {
        return <CarList/>
    }
    return (
        <Stack spacing={2} alignItems={"center"} mt={2}>
            <TextField name={"username"} label={"Username"} onChange={handleChange}/>
            <TextField name={"password"} label={"Password"} onChange={handleChange}/>
            <Button variant={"outlined"} color={"primary"} onClick={handleLogin}>Login</Button>
        </Stack>
    )
}

export default Login
