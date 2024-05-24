import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Header from "../components/header";
import Nav from "../components/nav";
import About from "../pages/about";

export default function MainRoutes() {
    return (

        <BrowserRouter>

            <Routes>
                <Route path="/" element={
                    <div>
                        <Nav />
                        <Header />
                        <Home />
                    </div>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={
                    <Register />
                } />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Navigate to='/' />} />
            </Routes>
        </BrowserRouter>
    );
}
