import React from 'react';
import {Route, Routes} from 'react-router-dom';
import FormPage from './FormPage';
import TablePage from './TablePage';
import MainPage from './MainPage';
import AppBarComponent from "../components/AppBarComponent";
import RegistrationPage from "./RegistrationPage";
import LogoutPage from "./LogoutPage";
import ProfilePage from "./ProfilePage";
import LoginPage from "./LoginPage";

const PageSwitcher = function () {

    return (
        <div>
            <AppBarComponent/>
            <Routes>
                <Route exact path='/form' element={<FormPage/>}/>
                <Route exact path='/table' element={<TablePage/>}/>
                <Route exact path='/' element={<MainPage/>}/>
                <Route exact path='/registration' element={<RegistrationPage/>}/>
                <Route exact path='/logout' element={<LogoutPage/>}/>
                <Route exact path='/profile' element={<ProfilePage/>}/>
                <Route exact path='/login' element={<LoginPage/>}/>
            </Routes>
        </div>
    );
}

export default PageSwitcher;