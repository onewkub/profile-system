import httpRequest from "../httpRequest/indext";
import userPayload from "../models/userPayload";

const userService = {
    getCurrentUser: () => httpRequest.get<userPayload>("/users/current"),
    updateUser: (userId: string, payload: userPayload) =>
        httpRequest.put(`/users/${userId}`, payload),
};

export default userService;
