import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import { useEffect } from "react";
import useApiRequest, { isLoading } from "../../../hooks/useApiRequest";
import useAuth from "../../../hooks/useAuth";
import userService from "../../../services/user";
import noImage from "../../../assets/No-image-found.jpg";
import { useNavigate } from "react-router-dom";

const User = () => {
    const { logoutDispatch } = useAuth();
    const [getUser, user, fetchStatus] = useApiRequest(
        userService.getCurrentUser
    );
    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, [getUser]);

    return (
        <>
            <Box
                display="flex"
                width="100vw"
                height="100vh"
                justifyContent="center"
                alignItems="center"
            >
                <Grid
                    p={4}
                    component={Paper}
                    variant="outlined"
                    spacing={2}
                    container
                    width={500}
                >
                    {isLoading(fetchStatus) ? (
                        <CircularProgress />
                    ) : (
                        <>
                            <Grid item container justifyContent="center">
                                <Box
                                    width={180}
                                    height={240}
                                    component={Paper}
                                    variant="outlined"
                                    mb={1}
                                    p={1}
                                    display="flex"
                                    alignItems="center"
                                >
                                    <img
                                        style={{ width: "100%" }}
                                        alt={"patient-img"}
                                        src={
                                            user?.userProfile.profileImage ||
                                            noImage
                                        }
                                    />
                                </Box>
                            </Grid>

                            <Grid item container>
                                <Typography>
                                    Username: {user?.username}{" "}
                                </Typography>
                            </Grid>
                            <Grid item container>
                                <Typography>
                                    First Name: {user?.userProfile.firstName}{" "}
                                </Typography>
                            </Grid>
                            <Grid item container>
                                <Typography>
                                    last Name: {user?.userProfile.lastName}
                                </Typography>
                            </Grid>
                            <Grid item container>
                                <Button
                                    fullWidth
                                    onClick={() => {
                                        navigate("edit");
                                    }}
                                >
                                    Edit
                                </Button>
                            </Grid>
                            <Grid item container>
                                <Button
                                    fullWidth
                                    onClick={() => logoutDispatch()}
                                >
                                    Logout
                                </Button>
                            </Grid>
                        </>
                    )}
                </Grid>
            </Box>
        </>
    );
};

export default User;
