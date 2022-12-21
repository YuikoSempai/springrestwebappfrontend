import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useState} from "react";
import {Button} from "@mui/material";

export default function MaterialForm() {

    const [x, setX] = useState('')
    const [y, setY] = useState('')
    const [r, setR] = useState('')

    const sendData = function (event) {
        event.preventDefault()
        fetch('http://localhost:8080/api/dot/add', {
            method: "POST",
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({x: {x}, y: {y}, r: {r}})
        }).then(() => console.log("dot has been sent"))
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1},
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="X coordinate"
                    fullWidth
                    value={x}
                    onChange={event => setX(event.target.value)}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Y coordinate"
                    fullWidth
                    value={y}
                    onChange={event => setY(event.target.value)}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Radius"
                    fullWidth
                    value={r}
                    onChange={event => setR(event.target.value)}
                />
                {/*<TextField*/}

                {/*    id="outlined-number"*/}
                {/*    label="Number"*/}
                {/*    type="number"*/}
                {/*    InputLabelProps={{*/}
                {/*        shrink: true,*/}
                {/*    }}*/}
                {/*/>*/}
                <Button variant="contained" style={{margin: "10px auto"}} onClick={sendData}>Contained</Button>
            </div>
        </Box>
    );
}