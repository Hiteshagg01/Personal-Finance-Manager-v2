import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Budget from "./pages/Budget";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Expense from "./pages/Expense";
import Home from "./pages/Home";
import Income from "./pages/Income";
import Investments from "./pages/Investments";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import { userProfile } from "./redux/user/userSlice";

const App = () => {
    const { authenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userProfile());
    }, [dispatch]);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navbar />,
            errorElement: <Error redirect="/" />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
            ],
        },
        {
            element: (
                <ProtectedRoute
                    isAuthenticated={!authenticated}
                    redirect="/dashboard"
                />
            ),
            errorElement: <Error redirect="/" />,
            children: [
                {
                    path: "/login",
                    element: <Login />,
                    errorElement: <Error redirect="/login" />,
                },
                {
                    path: "/register",
                    element: <Register />,
                    errorElement: <Error redirect="/register" />,
                },
            ],
        },
        {
            element: (
                <ProtectedRoute
                    isAuthenticated={authenticated}
                    redirect="/login"
                />
            ),
            errorElement: <Error redirect="/dashboard" />,
            children: [
                {
                    path: "/",
                    element: <Sidebar />,
                    errorElement: <Error redirect="/dashboard" />,
                    children: [
                        {
                            path: "dashboard",
                            element: <Dashboard />,
                        },
                        {
                            path: "expense",
                            element: <Expense />,
                        },
                        {
                            path: "income",
                            element: <Income />,
                        },
                        {
                            path: "budget",
                            element: <Budget />,
                        },
                        {
                            path: "investments",
                            element: <Investments />,
                        },
                        {
                            path: "transactions",
                            element: "Brewing",
                        },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;
