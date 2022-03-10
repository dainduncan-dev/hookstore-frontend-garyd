import React from "react";
import Home from "../home";
import AddBook from "../book/addBook";
import Signup from "../auth/signUp";
import Login from "../auth/login";



const routes = {
    '/': () => <Home />,
    '/add': () => <AddBook request={'add'} />,
    '/signup': () => <Signup />,
    '/login': () => <Login />
}

export default routes;