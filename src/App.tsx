import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
// import Login from "./components/Login.tsx";
import Albums from "./components/Albums.tsx";
import AlbumDetail from "./components/AlbumDetail.tsx";
import Home from "./components/Home.tsx";
import Login from "./components/Login.tsx";

// import React from "react";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}>
                    <Route index element={<Login/>}></Route>
                    <Route path='albums' element={<Albums/>}/>
                    <Route path='albums/:id' element={<AlbumDetail/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
