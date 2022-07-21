import { isUndefined } from "lodash";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { TOKEN_NAME } from "../../constants";
import useAuth from "../../hooks/useAuth";
import { setIsLogout } from "../../redux/reducers/auth";
import Login from "./components/login";

const LoginPage = () => {
    const dispatch = useDispatch();
    const { isAuthenticate, verifyTokenDispatch, isLogout } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();
    const [token] = useCookies([TOKEN_NAME]);

    useEffect(() => {
        const currentToken = token[TOKEN_NAME];
        if (!isUndefined(currentToken)) {
            verifyTokenDispatch(currentToken);
        }
    }, [token, verifyTokenDispatch]);

    useEffect(() => {
        if (isAuthenticate) {
            if (isLogout) {
                dispatch(setIsLogout(false));
                navigate("/", { replace: true });
            } else {
                const state = location.state as { from: Location };
                const redirectPath = "/";
                const from = state
                    ? state.from.pathname + state.from.hash
                    : redirectPath;
                navigate(from, { replace: true });
            }
        }
    }, [isAuthenticate, dispatch, isLogout, location.state, navigate]);
    return <Login />;
};

export default LoginPage;
