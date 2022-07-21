import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import loginPayload from "../../../models/loginPayload";
import Status from "../../../redux/enum/status";

const Login = () => {
    const navigate = useNavigate();

    const handleOnClickRegister = () => {
        navigate("/register");
    };

    const { loginDispatch, status, error } = useAuth();

    const form = useFormik<loginPayload>({
        initialValues: {
            username: "",
            password: "",
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            loginDispatch(values);
        },
    });
    console.log(error);

    return (
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
                <Grid item container>
                    <Typography>Profile Management System</Typography>
                </Grid>
                <Grid item container>
                    <TextField
                        {...form.getFieldProps("username")}
                        fullWidth
                        label="Username"
                    />
                </Grid>
                <Grid item container>
                    <TextField
                        {...form.getFieldProps("password")}
                        type="password"
                        fullWidth
                        label="Password"
                    />
                </Grid>
                <Grid item container spacing={1} justifyContent="center">
                    <Typography color="error">{error?.message || ""}</Typography>

                    {!(status === Status.loading) ? (
                        <>
                            <Grid item xs={6}>
                                <Button
                                    onClick={handleOnClickRegister}
                                    fullWidth
                                    variant="text"
                                >
                                    Register
                                </Button>
                            </Grid>
                            <Grid item xs={6} onClick={() => form.submitForm()}>
                                <Button fullWidth>Login</Button>
                            </Grid>
                        </>
                    ) : (
                        <CircularProgress />
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default Login;
