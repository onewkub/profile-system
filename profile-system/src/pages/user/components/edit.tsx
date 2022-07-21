import {
    Box,
    Button,
    CircularProgress,
    FormControlLabel,
    Grid,
    Paper,
    Switch,
    Typography,
} from "@mui/material";
import { useEffect } from "react";
import useApiRequest, { isLoading } from "../../../hooks/useApiRequest";
import userService from "../../../services/user";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import userPayload from "../../../models/userPayload";
import FormikTextField from "../../../components/formikTextField";
import userProfileValidation from "../../../validations/userProfile.validation";
import UploadImageField from "../../../components/uploadImageField";

const UserEdit = () => {
    const navigate = useNavigate();

    const [update, , status, error] = useApiRequest(userService.updateUser);
    const [getUser, user, fetchStatus] = useApiRequest(
        userService.getCurrentUser
    );

    useEffect(() => {
        getUser();
    }, [getUser]);

    const form = useFormik<
        userPayload & { confirmPassword?: string; changePassword?: boolean }
    >({
        initialValues: {
            username: "",
            password: "",
            confirmPassword: "",
            changePassword: false,
            userProfile: {
                firstName: "",
                lastName: "",
            },
            ...user,
        },
        validationSchema: userProfileValidation,
        enableReinitialize: true,
        onSubmit: async (values) => {
            if (!values.changePassword) {
                delete values.password;
            }
            delete values.confirmPassword;
            delete values.changePassword;
            await update(values.userId || "", values);
            navigate("/user");
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
                    <Typography>Update Profile</Typography>
                </Grid>
                {!isLoading(status) || !isLoading(fetchStatus) ? (
                    <>
                        <UploadImageField form={form} />
                        <Grid item container>
                            <FormControlLabel
                                checked={form.values.changePassword}
                                onChange={(_, check) =>
                                    form.setFieldValue("changePassword", check)
                                }
                                control={<Switch />}
                                label="Change Password"
                            />
                        </Grid>
                        {form.values.changePassword && (
                            <>
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
                            </>
                        )}
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
                        <Grid item container>
                            <Typography color="error">
                                {error?.message || ""}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            container
                            spacing={1}
                            justifyContent="center"
                        >
                            <Grid item xs={12}>
                                <Button
                                    onClick={() => form.submitForm()}
                                    fullWidth
                                >
                                    Save
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

export default UserEdit;
