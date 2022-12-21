import * as React from 'react';
import TextField from '@mui/material/TextField';
import {useState} from "react";
import {Alert, AlertTitle, Dialog, FormControl} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton"
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function RegistrationForm() {


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [openSuccess, setOpenSuccess] = React.useState(false)
    const [openWarning, setOpenWarning] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const [registerLoading, setRegisterLoading] = React.useState(false);
    const [loginLoading, setLoginLoading] = React.useState(false);

    const url = useSelector(state => state.url) + '/auth/registration'
    let navigate = useNavigate()

    const handleClickSuccess = () => {
        setOpenSuccess(!openSuccess);
    };

    const handleClickWarning = () => {
        setOpenWarning(!openWarning);
    }

    const handleLogButton = () => {
        setLoginLoading(true)
        setTimeout(() => navigate("../login"), 1000)
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
                        handleClickSuccess();
                        setMessage("User is exists")
                    } else {
                        setMessage("User was register")
                        handleClickSuccess()
                        navigate("../login")
                    }
                    setRegisterLoading(false)
                }
            ).catch(() => {
                setMessage("Can't connect to the server")
                setRegisterLoading(false)
                handleClickWarning()
            });
            setUsername('')
            setPassword('')
        } else {
            setMessage("Not all fields are field")
            setOpenWarning(true)
        }
    }
    return (
        <div>
            <div style={{margin: '100px auto'}}>
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
                </div>
            </FormControl>
        </div>
    );
}