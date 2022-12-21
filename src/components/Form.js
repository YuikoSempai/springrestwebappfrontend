import * as React from 'react';
import TextField from '@mui/material/TextField';
import {useState, useEffect} from "react";
import {Button, FormControl, Paper} from "@mui/material";
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
import {useSelector} from "react-redux";
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
    const [canvasFlag, setCanvasFlag] = useState(false)
    const [loading, setLoading] = useState(false);
    const [x, setX] = useState('')
    const [y, setY] = useState('')
    const [r, setR] = useState('')
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = useState([])
    const url = useSelector(state => state.url) + '/api/dot'

    const loadDots = () => {
        fetch(url, {
            method: 'GET'
        }).then((response) => {
            if (!response.ok && response.status !== 404) throw new Error(response.status.toString())
            if (response.status === 404) {
                let x = 1
                let y = 1
                let r = 1
                setRows([{x, y, r}])
            } else response.json().then(response => setRows(response))
        })
    }

    const handleRChange = (radius) => {
        setR(radius)
        drawGraphic(radius)
    }

    function deleteDot(id) {
        fetch(url + '/' + id, {
            method: 'DELETE'
        }).then((response) => {
            setTimeout(() => loadDots(response), 200)
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
        let x = document.getElementById('x').value
        let y = document.getElementById('y').value
        let r = document.getElementById('r').value
        console.log(x, y,r)
        if (x !== '' && y !== '' && r !== '') {
            setLoading(true);

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
            setX('')
            setY('')
            handleRChange(r)
        }
    }

    useEffect(drawField)


    function drawField() { // drawing grid
        let canvas = document.getElementById('image');
        if (canvas.getContext) {
            let ctx = canvas.getContext('2d');
            ctx.lineWidth = 2;
            ctx.fillStyle = "rgba(256, 256, 256, 0.8)"; // background fill
            ctx.fillRect(0, 0, canvas.width, canvas.height);
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
            ctx.arc(200, 200, radius * 40, 0, Math.PI / 2);
            ctx.fill();

            //rectangle
            ctx.fillRect(200 - radius * 40, 200 - radius * 20, radius * 40, radius * 20);
            ctx.moveTo(200, 200)
            ctx.lineTo(200, 200 - radius * 20)
            ctx.lineTo(200 - radius * 40, 200 - radius * 20)
            ctx.lineTo(200, 200 - radius * 20)

            //triangle
            ctx.moveTo(200, 200 - radius * 40);
            ctx.lineTo(200 + radius * 20, 200);
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
                    if (row.status) {
                        //green
                        ctx.fillStyle = 'green';
                    } else {
                        //black
                        ctx.fillStyle = 'red';
                    }
                    ctx.fill(circle);
                }
                return row
            })
        }
    }

    function addEventListenerToCanvas() {
        handleRChange(r)
        const canvas = document.querySelector('canvas');

        if (!canvasFlag) {
            canvas.addEventListener('mousedown', function (e) {
                getAndSendCursorPosition(canvas, e);
            })
            setCanvasFlag(true)
        }
    }

    function getAndSendCursorPosition(canvas, event) {
        let radius = document.getElementById('r');
        if (radius.value !== "") {
            const rect = canvas.getBoundingClientRect()
            let x = rounded((-1) * (200 - (event.clientX - rect.left)) / 40)
            let y = rounded((200 - (event.clientY - rect.top)) / 40)
            let r = radius.value
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
            alert("Select radius first")
        }
    }
    useEffect(loadDots, [loadDots])
    const rounded = function (number) {
        return +number.toFixed(2);
    }


    return (<div>
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
            <div sx={{display: {desktop: 'block', tablet: 'grid'}}}>
                <FormControl sx={{margin: "50px 50px 50px"}}>
                    <div style={{margin: "10px 0 auto"}}>
                        <TextField
                            required
                            id="x"
                            label="X coordinate"
                            value={x}
                            onChange={event => setX(event.target.value)}
                        />
                    </div>
                    <div style={{margin: "10px 0 auto"}}>
                        <TextField
                            required
                            id="y"
                            label="Y coordinate"

                            value={y}
                            onChange={event => setY(event.target.value)}
                        />
                    </div>
                    <div style={{margin: "10px 0 auto"}}>
                        <TextField
                            required
                            id="r"
                            label="Radius"
                            value={r}
                            onChange={event => handleRChange(event.target.value)}
                        />
                    </div>
                    <div style={{margin: "10px 0 auto"}}>
                        <LoadingButton
                            variant="contained"
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
                    onMouseEnter={() => addEventListenerToCanvas()}
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