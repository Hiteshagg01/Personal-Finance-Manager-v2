import "./styles/app.css";

import { useDispatch, useSelector } from "react-redux";
import {
    createBrowserRouter,
    Link,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { userProfile } from "./redux/user/userSlice";
import Budget from "./pages/Budget";

const App = () => {
    const { authorized } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userProfile());
    }, [dispatch]);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navbar of="home" />,
            errorElement: <Error />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
            ],
        },
        {
            path: "/login",
            element: !authorized ? <Login /> : <Navigate to="/dashboard" />,
            errorElement: <Error redirect="/login" />,
        },
        {
            path: "/register",
            element: !authorized ? <Register /> : <Navigate to="/dashboard" />,
            errorElement: <Error redirect="/register" />,
        },
        {
            path: "/dashboard",
            element: authorized ? (
                <Navbar of="dashboard" />
            ) : (
                <Navigate to="/login" />
            ),
            errorElement: <Error redirect="/dashboard" />,
            children: [
                {
                    index: true,
                    element: <Dashboard />,
                },
                {
                    path: "expense",
                    element: (
                        <div>
                            <h1>expense</h1>
                            <Link to="/">Home</Link>
                        </div>
                    ),
                },
                {
                    path: "income",
                    element: (
                        <div>
                            <h1>income</h1>
                            <Link to="/">Home</Link>
                        </div>
                    ),
                },
                {
                    path: "budget",
                    element: <Budget/>
                },
                {
                    path: "investment",
                    element: (
                        <div>
                            <h1>investment</h1>
                            <Link to="/">Home</Link>
                        </div>
                    ),
                },
                {
                    path: "transactions",
                    element: (
                        <div>
                            <h1>transactions</h1>
                            <Link to="/">Home</Link>
                        </div>
                    ),
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;
