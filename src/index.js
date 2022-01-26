import React from 'react';
import './index.css';
import App from './App';
import { render } from "react-dom";
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Auth from "./auth/auth"
import Patients from "./patients/patients"
import Smoker from "./smoker/smoker";

const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="auth" element={<Auth />} />
            <Route path="patients" element={<Patients />} />
            <Route path="patient" element={<Smoker />} />
        </Routes>
    </BrowserRouter>,
    rootElement
);
reportWebVitals();
