import './App.css'
import { Route, Routes} from "react-router-dom";
import Login from "./components/Login.tsx";
import Albums from "./components/Albums.tsx";
import AlbumDetail from "./components/AlbumDetail.tsx";
import AlbumLayout from "./components/AlbumLayout.tsx";

function App() {
    return (
        <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='albums' element={<AlbumLayout/>}>
                <Route index element={<Albums/>}/>
                <Route path=':id' element={<AlbumDetail/>}/>
            </Route>
        </Routes>
    )
}

export default App
