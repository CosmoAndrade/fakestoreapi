import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomMenu from "../components/menu";
import { useContext } from 'react'
import Login from "../pages/login"
import Produto from "../pages/produtos";

import { AuthContext } from '../contexts/auth';



const RoutesApp = () => {

    const {
        logged
    } = useContext(AuthContext)


    return (
        <BrowserRouter>

            {logged && <CustomMenu />}

            <Routes>
                <Route path="/" element={<Login />} />

                <Route path="/products" element={<Produto />} />

            </Routes>


        </BrowserRouter>
    );
}

export default RoutesApp;