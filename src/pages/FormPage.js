import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Form from "../components/Form";

const FormPage = () => {

    const navigate = useNavigate();
    const state = useSelector(state => state)
    useEffect(isLogin)
    function isLogin(){
        if(!state.auth_flag){
           navigate("../login")
        }
    }

    return (
        <div>
            <Form/>
        </div>
    );
};

export default FormPage;