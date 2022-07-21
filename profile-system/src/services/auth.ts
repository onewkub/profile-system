import httpRequest from "../httpRequest/indext";
import loginPayload from "../models/loginPayload";
import userPayload from "../models/userPayload";

const authService = {
    login: (payload: loginPayload) => httpRequest.post("/login", payload),
    register: (payload: userPayload) => httpRequest.post("/register", payload),
    verifyToken: () => httpRequest.get('/verify-token'),
};

export default authService;
