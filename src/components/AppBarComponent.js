import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PsychologyIcon from '@mui/icons-material/Psychology';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
export default function AppBarComponent() {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const url = useSelector(state => state.url)
    const authFlag = useSelector(state => state.auth_flag)
    const routeChange = function (url) {
        navigate(url);
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const switchToFormPage = function () {
        handleCloseNavMenu()
        routeChange("form")
    };
    const switchToMainPage = function () {
        handleCloseNavMenu()
        routeChange("/")
    };
    const switchToTablePage = function () {
        handleCloseNavMenu()
        routeChange("table")
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogoutButton = () => {
        setAnchorElUser(null);
        let http = new XMLHttpRequest();
        http.open('GET', url + "/auth/logout", true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.send()
        dispatch({type:"SET_AUTH_FLAG", payload: false})
        routeChange("login")
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <PsychologyIcon sx={{display: {mobile: 'none', tablet: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: {mobile: 'none', tablet: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        YUIKO
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {mobile: 'flex', tablet: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {mobile: 'block', tablet: 'none'},
                            }}
                        >
                            <MenuItem key='Main' onClick={switchToMainPage} disabled={!authFlag}>
                                <Typography textAlign="center">Main</Typography>
                            </MenuItem>
                            <MenuItem key='Form' onClick={switchToFormPage} disabled={!authFlag}>
                                <Typography textAlign="center">Form</Typography>
                            </MenuItem>
                            <MenuItem key='Table' onClick={switchToTablePage} disabled={!authFlag}>
                                <Typography textAlign="center">Table</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <PsychologyIcon sx={{display: {mobile: 'flex', tablet: 'none'}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: {mobile: 'flex', tablet: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        YUIKO
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {mobile: 'none', tablet: 'flex'}}}>
                        <Button
                            disabled={!authFlag}
                            key='Main'
                            onClick={switchToMainPage}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            Main
                        </Button>
                        <Button
                            disabled={!authFlag}
                            key='Form'
                            onClick={switchToFormPage}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            Form
                        </Button>
                        <Button
                            disabled={!authFlag}
                            key='Table'
                            onClick={switchToTablePage}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            Table
                        </Button>
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open menu">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="Remy Sharp" src="./../images/5.jpg"/> 
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key="Logout" onClick={handleLogoutButton} disabled={!authFlag}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
