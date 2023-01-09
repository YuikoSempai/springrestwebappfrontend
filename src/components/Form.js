import * as React from 'react';
import TextField from '@mui/material/TextField';
import {useState, useEffect} from "react";
import {Alert, Button, Collapse, FormControl, Paper} from "@mui/material";
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from "@mui/material/TableHead";
import LoadingButton from "@mui/lab/LoadingButton";
import {useDispatch, useSelector} from "react-redux";
import Typography from "@mui/material/Typography";

function TablePaginationActions(props) {
    const theme = useTheme();
    const {count, page, rowsPerPage, onPageChange} = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };


    return (
        <Box sx={{flexShrink: 0, ml: 2.5}}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>

        </Box>
    );
}

//TODO:попробовать убрать задний фон при перерисовке
export default function Form() {
    let canvasFlag = useSelector(state => state.canvas_flag);
    const [loading, setLoading] = useState(false);
    const [x, setX] = useState(0)
    const [y, setY] = useState('')
    const [r, setR] = useState(0)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = useState([])
    const url = useSelector(state => state.url) + '/api/dot'
    const [message, setMessage] = useState('')
    const [openErrorAlert, setOpenErrorAlert] = useState(false)
    const [openInfoAlert, setOpenInfoAlert] = useState(false)
    const dispatch = useDispatch();

    const loadDots = () => {
        fetch(url, {
            method: 'GET'
        }).then((response) => {
            if (!response.ok && response.status !== 404) throw new Error(response.status.toString())
            if (response.status === 404) {
                setRows([{x, y, r}])
            } else response.json().then(response => setRows(response))
        })
    }

    const handleRChange = (radius) => {
        if (radius < 0) {
            setMessage("It's cool variant, but radius can't be less then 0")
            setOpenErrorAlert(false)
            setOpenInfoAlert(true)
        } else {
            setOpenErrorAlert(false)
            setOpenInfoAlert(false)
            setR(radius)
            loadDots()
            drawField()
        }
    }

    function deleteDot(id) {
        fetch(url + '/' + id, {
            method: 'DELETE'
        }).then((response) => {
            loadDots(response)
        })

    }

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sendData = function () {
        console.log(x, y, r)
        if (x !== '' && y !== '' && r !== '') {
            setLoading(true);
            checkAndSend(x, y, r);
        } else {
            setMessage("Not all fields are field")
            setOpenInfoAlert(true)
            setOpenErrorAlert(false)
        }
    }


    useEffect(drawField)
    // useEffect(addEventListenerToCanvas)

    function drawField() { // drawing grid
        let canvas = document.getElementById('image');
        if (canvas.getContext) {
            let ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = "rgba(256, 256, 256, 1)"; // background fill
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 2;
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            for (let x = 40; x < 361; x += 40) { // gird
                ctx.moveTo(x, 0);
                ctx.lineTo(x, 400);
            }
            for (let y = 40; y < 361; y += 40) {
                ctx.moveTo(0, y);
                ctx.lineTo(400, y);
            }
            ctx.strokeStyle = "grey";
            ctx.stroke();

            ctx.strokeStyle = 'black'; //axis
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, 200);
            ctx.lineTo(400, 200);
            ctx.moveTo(200, 0);
            ctx.lineTo(200, 400);
            ctx.stroke();
        }
        drawGraphic(r)
    }


    const drawGraphic = (radius) => {
        let canvas = document.getElementById('image');
        if (canvas.getContext) {
            let ctx = canvas.getContext('2d');
            ctx.fillStyle = 'rgb(25,118,210)'; //area

            //circle
            ctx.moveTo(200, 200);
            ctx.arc(200, 200, radius * 20, 3 * Math.PI / 2, 0);
            ctx.fill();

            //rectangle
            ctx.fillRect(200 - radius * 20, 200 - radius * 40, radius * 20, radius * 40);
            ctx.moveTo(200, 200)
            ctx.lineTo(200, 200 - radius * 40)
            ctx.lineTo(200 - radius * 20, 200 - radius * 40)
            ctx.lineTo(200 - radius * 20, 200)
            // ctx.lineTo(200)

            //triangle
            ctx.moveTo(200 - radius * 20, 200);
            ctx.lineTo(200, 200 + radius * 20);
            ctx.lineTo(200, 200);
            ctx.fill();

            ctx.strokeStyle = "black";
            ctx.stroke();
            drawDots(r)
        }
    }
    const drawDots = (radius) => {
        if (rows.length > 0) {
            rows.map(row => {
                if (parseInt(row.r) === parseInt(radius)) {
                    const canvas = document.getElementById('image');
                    const ctx = canvas.getContext('2d');
                    const circle = new Path2D();
                    circle.moveTo(200 + row.x * 40, 200 - row.y * 40);
                    circle.arc(200 + row.x * 40, 200 - row.y * 40, 10, 0, 2 * Math.PI)
                    if (row.status === "true") {
                        //green
                        ctx.fillStyle = 'green';
                    } else {
                        //red
                        ctx.fillStyle = 'red';
                    }
                    ctx.fill(circle);
                }
                return row
            })
        }
    }

    function addEventListenerToCanvas() {

        const canvas = document.querySelector('canvas');
        console.log(canvasFlag)
        if (!canvasFlag) {
            canvas.addEventListener('mousedown', function (e) {
                getAndSendCursorPosition(canvas, e);
            })
            dispatch({type:"SET_CANVAS_FLAG",payload:true})
        }
    }

    function getAndSendCursorPosition(canvas, event) {
        if (r !== "") {
            const rect = canvas.getBoundingClientRect()
            let x = rounded((-1) * (200 - (event.clientX - rect.left)) / 40)
            let y = rounded((200 - (event.clientY - rect.top)) / 40)
            let r = document.getElementById('rValue');
            console.log(x,y,parseInt(r.innerText))
            checkAndSend(x, y, parseInt(r.innerText))
        } else {
            setMessage("Select radius first")
            setOpenErrorAlert(true)
            setOpenInfoAlert(false)
        }
    }

    const rounded = function (number) {
        return +number.toFixed(2);
    }

    function checkAndSend(x, y, r) {
        if (x <= 4 && x >= -4 && y >= -3 && y <= 3 && r >= -4 && r <= 4) {
            fetch(url, {
                method: "POST", headers: {
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }, body: JSON.stringify({x, y, r})
            }).then(() => {
                loadDots()
                setLoading(false);
            })
                .catch(() => {
                    setLoading(false)
                });
        } else {
            setMessage("Wrong input data")
            setLoading(false)
            setOpenInfoAlert(false)
            setOpenErrorAlert(true)
        }
    }

    const buttonInput1 = [-4, -3, -2]
    const buttonInput2 = [-1, 0, 1]
    const buttonInput3 = [2, 3, 4]

    return (
        <div>
            <div style={{margin: '20px auto'}}>
                <Typography
                    variant="h3"
                    sx={{display: {mobile: 'none', tablet: 'none', desktop: 'block'}}}
                >
                    Add dot
                </Typography>
                <Typography
                    variant="h4"
                    sx={{display: {mobile: 'block', tablet: 'block', desktop: 'none'}}}
                >
                    Add dot
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
            <div sx={{display: {desktop: 'block', tablet: 'grid'}}}>
                <FormControl sx={{margin: "0 50px  0"}}>
                    <Paper elevation={3}>
                        <Typography>X coordinate</Typography>
                        <div>
                            {
                                buttonInput1.map(inputData => (
                                    <Button
                                        sx={{margin: "5px 5px 5px", align: "center"}}
                                        size="small"
                                        variant="contained"
                                        onClick={() => setX(inputData)}
                                        key={inputData}
                                    >
                                        {inputData}
                                    </Button>
                                ))
                            }
                        </div>
                        <div>
                            {
                                buttonInput2.map(inputData => (
                                    <Button
                                        sx={{margin: "5px 5px 5px", align: "center"}}
                                        size="small"
                                        variant="contained"
                                        onClick={() => setX(inputData)}
                                        key={inputData}
                                    >
                                        {inputData}
                                    </Button>
                                ))
                            }
                        </div>
                        <div>
                            {
                                buttonInput3.map(inputData => (
                                    <Button
                                        sx={{margin: "5px 5px 5px", align: "center"}}
                                        size="small"
                                        variant="contained"
                                        onClick={() => setX(inputData)}
                                        key={inputData}
                                    >
                                        {inputData}
                                    </Button>
                                ))
                            }
                        </div>
                        <Typography>X = {x}</Typography>
                    </Paper>
                    <Paper elevation={3} style={{margin: "10px 0 auto", height: "100px"}}>

                        <TextField
                            sx={{margin: "20px 0 auto", width: "90%"}}
                            required
                            id="y"
                            label="Y coordinate"
                            value={y}
                            onChange={event => setY(parseInt(event.target.value))}
                        />
                    </Paper>
                    <Paper elevation={3} style={{margin: "10px 0 auto"}}>
                        <Typography>Radius</Typography>
                        <div>
                            {
                                buttonInput1.map(inputData => (
                                    <Button
                                        sx={{margin: "5px 5px 5px", align: "center"}}
                                        size="small"
                                        variant="contained"
                                        onClick={() => handleRChange(inputData)}
                                        key={inputData}
                                    >
                                        {inputData}
                                    </Button>
                                ))
                            }
                        </div>
                        <div>
                            {
                                buttonInput2.map(inputData => (
                                    <Button
                                        sx={{margin: "5px 5px 5px", align: "center"}}
                                        size="small"
                                        variant="contained"
                                        onClick={() => handleRChange(inputData)}
                                        key={inputData}
                                    >
                                        {inputData}
                                    </Button>
                                ))
                            }
                        </div>
                        <div>
                            {
                                buttonInput3.map((inputData) => (
                                    <Button
                                        sx={{margin: "5px 5px 5px", align: "center"}}
                                        size="small"
                                        variant="contained"
                                        onClick={() => handleRChange(inputData)}
                                        key={inputData}
                                    >
                                        {inputData}
                                    </Button>
                                ))
                            }
                        </div>
                        <Typography id="rValue">{r}</Typography>
                    </Paper>
                    <div style={{margin: "10px 0 auto"}}>
                        <LoadingButton
                            variant="outlined"
                            sx={{margin: "10px 0 auto", width: '100%'}}
                            onClick={sendData}
                            loading={loading}
                        >
                            Send dot to server
                        </LoadingButton>
                    </div>
                </FormControl>
                <Typography sx={{display: {mobile: 'flex', table: 'flex', desktop: 'none'}}}></Typography>
                <canvas
                    onMouseEnter={addEventListenerToCanvas}
                    style={{margin: "60px 0 0"}}
                    width="400"
                    height="400"
                    id="image"
                />
            </div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 500}} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" style={{width: 160}}>ID</TableCell>
                            <TableCell align="right" style={{width: 160}}>X coordinate</TableCell>
                            <TableCell align="right" style={{width: 160}}>Y coordinate</TableCell>
                            <TableCell align="right" style={{width: 160}}>Radius</TableCell>
                            <TableCell align="right" style={{width: 160}}>Status</TableCell>
                            <TableCell align="right" style={{width: 160}}>Delete</TableCell>
                            <TableCell align="right" style={{width: 160}}>View</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                        ).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell style={{width: 160}} align="right">
                                    {row.x}
                                </TableCell>
                                <TableCell style={{width: 160}} align="right">
                                    {row.y}
                                </TableCell>
                                <TableCell style={{width: 160}} align="right">
                                    {row.r}
                                </TableCell>
                                <TableCell style={{width: 160}} align="right">
                                    {row.status}
                                </TableCell>
                                <TableCell style={{width: 160}} align="right">
                                    <Button style={{margin: "10px 0 auto"}} variant="outlined"
                                            onClick={() => deleteDot(row.id)}>Delete</Button>
                                </TableCell>
                                <TableCell style={{width: 160}} align="right">
                                    <Button style={{margin: "10px 0 auto"}} variant="outlined">View</Button>
                                </TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{height: 53 * emptyRows}}>
                                <TableCell colSpan={8}/>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                colSpan={5}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
}