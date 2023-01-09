import * as React from 'react';
import TextField from '@mui/material/TextField';
import {useState} from "react";
import {Alert, Collapse, FormControl} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton"
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function RegistrationForm() {


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [registerLoading, setRegisterLoading] = React.useState(false);
    const [loginLoading, setLoginLoading] = React.useState(false);
    const [message, setMessage] = React.useState('')
    const [openErrorAlert, setOpenErrorAlert] = useState(false)
    const [openInfoAlert, setOpenInfoAlert] = useState(false)

    const url = useSelector(state => state.url) + '/auth/registration'
    let navigate = useNavigate()

    const handleLogButton = () => {
        setLoginLoading(true)
        navigate("../login")
    }

    const sendData = function (event) {
        if (username !== '' && password !== '') {
            const roles = 0
            setRegisterLoading(true);
            event.preventDefault()
            fetch(url, {
                method: "POST", headers: {
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }, body: JSON.stringify({username, password, roles})
            }).then(r => {
                    if (r.status !== 200) {
                        setMessage("User is exists")
                        setOpenInfoAlert(true)
                    } else {
                        setMessage("User was register")
                        setOpenInfoAlert(true)
                        navigate("../login")
                    }
                    setRegisterLoading(false)
                }
            ).catch(() => {
                setMessage("Can't connect to the server")
                setOpenErrorAlert(true)
                setRegisterLoading(false)
            });
            setUsername('')
            setPassword('')
        } else {
            setMessage("Not all fields are field")
            setOpenInfoAlert(true)
        }
    }
    return (
        <div>
            <div style={{margin: '50px auto'}}>
                <Typography
                    variant="h3"
                    sx={{display: {mobile: 'none', tablet: 'none', desktop: 'block'}}}
                >
                    Registration
                </Typography>
                <Typography
                    variant="h4"
                    sx={{display: {mobile: 'block', tablet: 'block', desktop: 'none'}}}
                >
                    Registration
                </Typography>
            </div>
            <div>
                <Collapse in={openErrorAlert}>
                    <Alert severity="error">{message}</Alert>
                </Collapse>
                <Collapse in={openInfoAlert}>
                    <Alert severity="info">{message}</Alert>
                </Collapse>
            </div>
            <FormControl sx={{width: {mobile: "30%", desktop: "50%"}}}>
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
                        label="Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <div sx={{width: {mobile: "20%", desktop: "40%"}}}>
                    <LoadingButton
                        variant="contained"
                        onClick={sendData}
                        loading={registerLoading}
                        id="LoadingButton"
                    >
                        <Typography sx={{display: {mobile: 'none', tablet: 'flex'}}}>register user</Typography>
                        <Typography sx={{display: {tablet: 'none', mobile: 'flex'}}}>Register</Typography>
                    </LoadingButton>
                    <LoadingButton
                        variant="contained"
                        onClick={handleLogButton}
                        loading={loginLoading}
                        id="LoadingButton"
                    >
                        <Typography sx={{display: {mobile: 'none', tablet: 'flex'}}}>Login Page</Typography>
                        <Typography sx={{display: {tablet: 'none', mobile: 'flex'}}}>login</Typography>
                    </LoadingButton>
                </div>
            </FormControl>
        </div>
    );
}