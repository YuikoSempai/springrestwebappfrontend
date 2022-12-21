import React, {useEffect} from 'react';
import MyTable from "../components/MyTable";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const TablePage = () => {
    const navigate = useNavigate();
    const state = useSelector(state => state)
    useEffect(isLogin)

    function isLogin() {
        if (!state.auth_flag) {
            navigate("/login")
        }
    }

    return (
        <MyTable/>
    );
};

export default TablePage;