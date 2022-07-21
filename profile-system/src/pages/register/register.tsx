import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import FormikTextField from "../../components/formikTextField";
import UploadImageField from "../../components/uploadImageField";
import useApiRequest, { isLoading } from "../../hooks/useApiRequest";
import userPayload from "../../models/userPayload";
import authService from "../../services/auth";
import registerValidation from "../../validations/register.validation";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [register, , status] = useApiRequest(authService.register);

    const form = useFormik<userPayload & { confirmPassword?: string }>({
        initialValues: {
            username: "",
            password: "",
            confirmPassword: "",
            userProfile: {
                firstName: "",
                lastName: "",
            },
        },
        validationSchema: registerValidation,
        enableReinitialize: true,
        onSubmit: async (values) => {
            delete values.confirmPassword;
            await register(values);
            navigate("/login");
        },
    });

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
                    <Typography>Register</Typography>
                </Grid>
                {!isLoading(status) ? (
                    <>
                        <UploadImageField form={form} />
                        <Grid item container>
                            <FormikTextField
                                name="username"
                                formik={form}
                                fullWidth
                                label="Username"
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item container>
                            <FormikTextField
                                name="password"
                                formik={form}
                                type="password"
                                fullWidth
                                label="Password"
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item container>
                            <FormikTextField
                                name="confirmPassword"
                                formik={form}
                                type="password"
                                fullWidth
                                label="Confirm Password"
                            />
                        </Grid>
                        <Grid item container>
                            <FormikTextField
                                name="userProfile.firstName"
                                formik={form}
                                fullWidth
                                label="First Name"
                            />
                        </Grid>
                        <Grid item container>
                            <FormikTextField
                                name="userProfile.lastName"
                                formik={form}
                                fullWidth
                                label="Last Name"
                            />
                        </Grid>
                        <Grid
                            item
                            container
                            spacing={1}
                            justifyContent="center"
                        >
                            <Grid item xs={12}>
                                <Button onClick={form.submitForm} fullWidth>
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <CircularProgress />
                )}
            </Grid>
        </Box>
    );
};

export default RegisterPage;
