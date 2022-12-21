import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const ProfilePage = () => {
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
            User profile page
        </div>
    );
};

export default ProfilePage;