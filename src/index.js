import React from 'react';
import './index.css';
import { render } from "react-dom";
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Main from "./main/main"
import Apologize from "./apologize/apologize";

const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="lab2" element={<Main />} />
            <Route path="lab2/apologize" element={<Apologize />} />
        </Routes>
    </BrowserRouter>,
    rootElement
);
reportWebVitals();
