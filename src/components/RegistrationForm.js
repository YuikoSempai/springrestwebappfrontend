import * as React from 'react';
import TextField from '@mui/material/TextField';
import {useState} from "react";
import {Alert, AlertTitle, Button, Dialog, FormControl} from "@mui/material";
import Typography from "@mui/material/Typography";


export default function MyForm() {


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [roles, setRoles] = useState('')
    const url = 'http://localhost:8080/auth/registration'
    const [openSuccess, setOpenSuccess] = React.useState(false)
    const [openWarning, setOpenWarning] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const handleClickSuccess = () => {
        setOpenSuccess(!openSuccess);
    };

    const handleClickWarning = () => {
        setOpenWarning(!openWarning);
    }

    const sendData = function (event) {
        if (username !== '' && password !== '' && roles !== '') {
            event.preventDefault()
            fetch(url, {
                method: "POST", headers: {
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }, body: JSON.stringify({username, password, roles})
            }).then(r => {
                    if (r.status !== 200) {
                        setOpenWarning(true);
                        setMessage("User is exists")
                    } else {
                        setMessage("User was register")
                        setOpenSuccess(true);
                        window.location.href = "http://localhost:8080";
                    }
                }
            ).catch(() => {
                setMessage("Can't connect to the server")
                setOpenWarning(true)
            });
            setUsername('')
            setPassword('')
            setRoles('')
        }
    }

    return (
        <div>
            <div style={{margin: 'auto'}}>
                <h1>Register new user</h1>
            </div>
            <FormControl>
                <div style={{margin: "10px 0 auto"}}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Username"
                        fullWidth
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                </div>
                <div style={{margin: "10px 0 auto"}}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Password"
                        fullWidth
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <div style={{margin: "10px 0 auto"}}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Roles"
                        fullWidth
                        value={roles}
                        onChange={event => setRoles(event.target.value)}
                    />
                </div>
                <Button style={{margin: "10px 0 auto"}} variant="contained" onClick={sendData}>register
                    user</Button>
                <Dialog open={openWarning} onClose={handleClickWarning}>
                    <Alert severity="warning">
                        <AlertTitle>Warning</AlertTitle>
                        {message}
                    </Alert>
                </Dialog>
                <Dialog open={openSuccess} onClose={handleClickSuccess}>
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        {message}
                    </Alert>
                </Dialog>
            </FormControl>
        </div>
    );
}