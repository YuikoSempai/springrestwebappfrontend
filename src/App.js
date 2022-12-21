import React from 'react';
import PageSwitcher from "./pages/PageSwitcher";
import './styles/App.css';
import {useSelector} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme/themeOptions"

function App() {
    console.log(useSelector(state => state.auth_flag))
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <PageSwitcher/>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}

export default App;
