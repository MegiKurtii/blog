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
                <Route path="/login" element={
                    <div>
                        <Nav /> <Login />
                    </div>} />
                <Route path="/register" element={
                    <div>
                        <Nav />
                        <Register />
                    </div>
                } />
                <Route path="/about" element={
                    <div>
                        <Nav/>
                        <About />
                    </div>
                } />
                <Route path="*" element={<Navigate to='/' />} />
            </Routes>
        </BrowserRouter>
    );
}
