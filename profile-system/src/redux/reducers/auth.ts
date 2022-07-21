import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import httpRequest from "../../httpRequest/indext";
import { user } from "../../models";
import authService from "../../services/auth";
import Status from "../enum/status";
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import { TOKEN_NAME } from "../../constants";
import loginPayload from "../../models/loginPayload";
interface authState {
    userProfile?: user;
    isAuthenticate: boolean;
    isLogout: boolean;
    token?: string;
    status: Status;
    error?: any;
}

const initialState: authState = {
    status: Status.idle,
    isAuthenticate: false,
    isLogout: false,
};

export const verifyToken = createAsyncThunk(
    "auth/verify-token",
    async (token: string) => {
        try {
            httpRequest.setAuthorization(`Bearer ${token}`);
            await authService.verifyToken();
            const decoded = jwtDecode<{ userData: user; sub: string }>(token);

            Cookies.set(TOKEN_NAME, token);
            return {
                token,
                userProfile: decoded.userData,
            };
        } catch (error) {
            throw error;
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (payload: loginPayload) => {
        try {
            const { data } = await authService.login(payload);
            const decoded = jwtDecode<{ userData: user; sub: string }>(
                data.token
            );
            console.log(decoded);
            httpRequest.setAuthorization(`Bearer ${data.token}`);

            Cookies.set(TOKEN_NAME, data.token);

            return {
                token: data.token,
                userProfile: decoded?.userData,
            };
        } catch (error) {
            throw error;
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    Cookies.remove(TOKEN_NAME);
    const res = await new Promise((resolve) => {
        setTimeout(() => {
            resolve("logout successfully");
        }, 500);
    });

    return res;
});

export const    authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLogout: (state, action: PayloadAction<boolean>) => {
            state.isLogout = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.status = Status.loading;
            state.error = undefined;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            const { token, ...userProfile } = action.payload;
            state.status = Status.success;
            state.userProfile = userProfile.userProfile;
            state.isAuthenticate = true;
            state.token = token;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.status = Status.error;
            state.error = action.error;
        });
        builder.addCase(verifyToken.pending, (state) => {
            state.status = Status.loading;
            state.error = undefined;
        });
        builder.addCase(verifyToken.fulfilled, (state, action) => {
            const { token, ...userProfile } = action.payload;
            state.status = Status.success;
            state.userProfile = userProfile.userProfile;
            state.isAuthenticate = true;
            state.token = token;
        });
        builder.addCase(verifyToken.rejected, (state, action) => {
            state.status = Status.error;
            state.error = action.error;
        });
        builder.addCase(logout.pending, (state) => {
            state.status = Status.loading;
            state.error = undefined;
            state.isLogout = true;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.status = Status.success;
            state.isAuthenticate = false;
        });
    },
});

export const { setIsLogout,  } = authSlice.actions;

export default authSlice.reducer;
