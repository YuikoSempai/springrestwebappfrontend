import React, {useState} from 'react';
import {Alert, Collapse, FormControl} from "@mui/material";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";

const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginLoading, setLoginLoading] = useState(false)
    const [registerLoading, setRegisterLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [openErrorAlert, setOpenErrorAlert] = useState(false)
    const [openInfoAlert, setOpenInfoAlert] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const sendData = () => {
        setOpenInfoAlert(false)
        setOpenErrorAlert(false)
        if (username !== "" && password !== "") {
            setLoginLoading(true);
            let http = new XMLHttpRequest();
            const url = 'http://localhost:8080/auth/login';
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            let body = "username=" + username + "&password=" + password
            http.onreadystatechange = () => {
                if (http.status === 200) {
                    dispatch({type: "SET_AUTH_FLAG", payload: true})
                    changeRoute("..")
                } else {
                    setMessage("Wrong username or password, try again")
                    setOpenErrorAlert(true)
                }
                setLoginLoading(false)
            }
            http.send(body)
        } else {
            setMessage("Not all fields are field")
            setOpenInfoAlert(true)
        }
    }

    const changeRoute = (url) => {
        setTimeout(() => navigate(url), 1000)
    }

    const handleRegButton = () => {
        setRegisterLoading(true)
        changeRoute("/../registration")
    }


    return (
        <div>
            <div style={{margin: '100px auto'}}>
                <Typography
                    variant="h3"
                    sx={{display: {mobile: 'none', tablet: 'none', desktop: 'block'}}}
                >
                    Log in
                </Typography>
                <Typography
                    variant="h4"
                    sx={{display: {mobile: 'block', tablet: 'block', desktop: 'none'}}}
                >
                    Log in
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
                        label="Username"
                        fullWidth
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        name="username"
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
                        name="password"
                    />
                </div>
                <div sx={{width: {mobile: "20%", desktop: "40%"}}}>
                    <LoadingButton
                        variant="contained"
                        onClick={sendData}
                        loading={loginLoading}
                        type="submit"
                        id="LoadingButton"
                    >
                        <Typography sx={{display: {mobile: 'none', tablet: 'flex'}}}>Login user</Typography>
                        <Typography sx={{display: {tablet: 'none', mobile: 'flex'}}}>login</Typography>
                    </LoadingButton>
                    <LoadingButton
                        variant="contained"
                        onClick={handleRegButton}
                        loading={registerLoading}
                        id="LoadingButton"
                    >
                        <Typography sx={{display: {mobile: 'none', tablet: 'flex'}}}>register user</Typography>
                        <Typography sx={{display: {tablet: 'none', mobile: 'flex'}}}>Register</Typography>
                    </LoadingButton>
                </div>
            </FormControl>
        </div>
    );
};

export default LoginForm;