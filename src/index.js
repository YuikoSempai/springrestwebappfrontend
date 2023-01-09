import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import {createStore} from "redux";
import {Provider} from "react-redux";


const defaultState = {
    auth_flag: false,
    url: "http://localhost:24900",
    canvas_flag: false,
}


const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_AUTH_FLAG":
            return {...state, auth_flag: action.payload}
        case "SET_CANVAS_FLAG":
            return {...state, canvas_flag: action.payload}
        default:
            return state
    }
}

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

