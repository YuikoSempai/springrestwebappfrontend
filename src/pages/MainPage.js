import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import Main from "../components/Main"
const MainPage = () => {
    const navigate = useNavigate();
    const state = useSelector(state => state)
    useEffect(isLogin)

    function isLogin() {
        if (!state.auth_flag) {
            navigate("/login")
        }
    }

    return (
        <div>
            <div>
                <Typography
                    variant="h3"
                    sx={{display: {mobile: 'none', tablet: 'none', desktop: 'block'}}}
                >
                    Dots v 1.0
                </Typography>
                <Typography
                    variant="h4"
                    sx={{display: {mobile: 'block', tablet: 'block', desktop: 'none'}}}
                >
                    Dots v 1.0
                </Typography>
                <Main/>
            </div>
        </div>
    );
};

export default MainPage;