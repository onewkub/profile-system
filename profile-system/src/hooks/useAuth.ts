import { useCallback } from "react";
import { useDispatch } from "react-redux";
import loginPayload from "../models/loginPayload";
import { useAppSelector } from "../redux/hooks";
import { login, logout, verifyToken } from "../redux/reducers/auth";

const useAuth = () => {
    const { isAuthenticate, userProfile, status, error, isLogout } = useAppSelector(
        (state) => state.auth
    );

    const dispatch = useDispatch();
    const loginDispatch = useCallback(
        (payload: loginPayload) => {
            //@ts-ignore
            dispatch(login(payload));
        },
        [dispatch]
    );

    const verifyTokenDispatch = useCallback(
        (token: string) => {
            //@ts-ignore
            dispatch(verifyToken(token));
        },
        [dispatch]
    );

    const logoutDispatch = useCallback(() => {
        //@ts-ignore
        dispatch(logout());
    }, [dispatch]);

    return {
        status,
        isAuthenticate,
        userProfile,
        isLogout,
        error,
        verifyTokenDispatch,
        logoutDispatch,
        loginDispatch,
    };
};

export default useAuth;
