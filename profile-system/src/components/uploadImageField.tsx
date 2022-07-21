import { Grid, Typography, Button, styled, Box, Paper } from "@mui/material";
import { FormikProps } from "formik";
import { isNull, first, isUndefined } from "lodash";
import userPayload from "../models/userPayload";
import convertBase64 from "../utils/convertBase64";

import noImage from "../assets/No-image-found.jpg";

const MB = 1048576;

const Input = styled("input")({
    display: "none",
});

const UploadImageField = (props: { form: FormikProps<userPayload> }) => {
    const { form } = props;
    const handleFileRead = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        console.log(event.target.files);
        if (!isNull(event.target.files)) {
            const file = first(event.target.files);
            if (!isUndefined(file)) {
                if (file.size <= 5 * MB) {
                    const base64 = await convertBase64(file);
                    form.setFieldValue("userProfile.profileImage", base64);
                } else {
                    form.setFieldError(
                        "userProfile.profileImage",
                        "File is too big it should little or equal 5 MB"
                    );
                }
            }
        }
    };

    return (
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
                        src={form.values.userProfile.profileImage || noImage}
                    />
                </Box>
            </Grid>
            <Grid container item justifyContent="center">
                <Typography color="error">
                    {form.errors.userProfile?.profileImage}
                </Typography>
                <label htmlFor="contained-button-file">
                    <Input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={handleFileRead}
                    />
                    <Button variant="contained" component="span">
                        Upload Image
                    </Button>
                </label>
            </Grid>
        </>
    );
};

export default UploadImageField;
