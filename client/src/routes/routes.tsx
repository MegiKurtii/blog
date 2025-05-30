import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home";
import Header from "../components/header";
import Nav from "../components/nav";
import About from "../pages/about";
import Auth from '../components/signin';
import AuthRegister from '../pages/signup';
import PostDetails from '../components/postDetails';
import Account from "../pages/account";
import EditAccount from "../pages/edit";

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
                <Route path="/page/:pageNumber" element={
                    <div>
                        <Nav />
                        <Header />
                        <Home />
                    </div>} />
                <Route path="/posts/search" element={
                    <div>
                        <Nav />
                        <Header />
                        <Home />
                    </div>} />
                <Route path="/posts/:id" element={
                    <div>
                        <Nav />
                        <PostDetails />
                    </div>} />
                <Route path="/signin" element={
                    <div>
                        <Nav />
                        <Auth />
                    </div>
                } />
                <Route path="/about" element={
                    <div>
                        <Nav />
                        <About />
                    </div>
                } />
                <Route path="/edit" element={
                    <div>
                        <Nav />
                        <EditAccount />
                    </div>
                } />
                <Route path="/account" element={
                    <div>
                        <Nav />
                        <Account />
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