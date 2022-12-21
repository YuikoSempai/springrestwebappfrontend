import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import FormPage from '../pages/FormPage';
import TablePage from '../pages/TablePage';
import MainPage from '../pages/MainPage';
import AppBarComponent from "./AppBarComponent";
import RegistrationPage from "../pages/RegistrationPage";
import LogoutPage from "../pages/LogoutPage";
import ProfilePage from "../pages/ProfilePage";

const PageSwitcher = function () {
    return (
        <BrowserRouter>
            <AppBarComponent/>
            <Routes>
                <Route exact path='/form' element={<FormPage/>}/>
                <Route exact path='/table' element={<TablePage/>}/>
                <Route exact path='/' element={<MainPage/>}/>
                <Route exact path='/registration' element={<RegistrationPage/>}/>
                <Route exact path='/logout' element={<LogoutPage/>}/>
                <Route exact path='/profile' element={<ProfilePage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default PageSwitcher;