import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import UserPage from "../pages/user";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register/register";
import RequiredAuth from "./requiredAuth";
import UserEdit from "../pages/user/components/edit";

const AppRouter = () => {
    const { isAuthenticate } = useAuth();
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        isAuthenticate ? (
                            <Navigate to="user" />
                        ) : (
                            <Navigate to="login" />
                        )
                    }
                />
                <Route
                    element={
                        <RequiredAuth>
                            <Outlet />
                        </RequiredAuth>
                    }
                >
                    <Route path="/user" element={<UserPage />} />
                    <Route path="/user/edit" element={<UserEdit />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
