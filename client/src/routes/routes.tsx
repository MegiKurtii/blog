import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "../pages/home";
import Header from "../components/header";
import Nav from "../components/nav";
import About from "../pages/about";
import Auth from '../components/signin';
import AuthRegister from '../components/auth';

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
                <Route path="/signin" element={
                    <div>
                        <Nav />
                        <Auth />
                    </div>
                } />
                <Route path="/about" element={
                    <div>
                        <Nav/>
                        <About />
                    </div>
                } />
                <Route path="/auth" element={
                    <div>
                        <Nav />
                        <AuthRegister />
                    </div>
                } />
                <Route path="*" element={<Navigate to='/' />} />
            </Routes>
        </BrowserRouter>
    );
}
