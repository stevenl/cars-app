import {ChangeEvent, useState} from "react"
import {Button, Snackbar, Stack, TextField} from "@mui/material"
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
    const [showNotification, setNotification] = useState(false)
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
            .catch(() => setNotification(true))
    }

    const handleLogout = () => {
        setAuthenticated(false);
        sessionStorage.setItem("jwt", "");
    }

    if (isAuthenticated) {
        return <CarList logout={handleLogout}/>
    }
    return (
        <>
            <Stack spacing={2} alignItems={"center"} mt={2}>
                <TextField name={"username"} label={"Username"} onChange={handleChange}/>
                <TextField name={"password"} label={"Password"} onChange={handleChange}/>
                <Button variant={"outlined"} color={"primary"} onClick={handleLogin}>Login</Button>
            </Stack>
            <Snackbar
                open={showNotification}
                autoHideDuration={3000}
                onClose={() => setNotification(false)}
                message={"Login failed: Check your username and password"}
            />
        </>
    )
}

export default Login
