import * as yup from "yup";

const registerValidation = yup.object({
    username: yup
        .string()
        .required("Username is required")
        .min(4)
        .max(12)
        .matches(/^[A-Za-z0-9_.]+$/, {
            message: "Username should have only A-Z, a-z, 0-9 and _",
        }),
    password: yup
        .string()
        .required("Password is required.")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
            message:
                "Password should have minimum six characters, at least one uppercase letter, one lowercase letter and one number",
        })
        .test((value) => {
            const digitPattern = ["123456", "234567", "345678", "456789"];
            const characterPattern = [
                "abcdef",
                "bcdefg",
                "cdefgh",
                "defghj",
                "efghji",
                "fghjil",
                "ghjilm",
                "hjilmn",
                "jilmno",
                "ilmnop",
                "lmnopq",
                "mnopqr",
                "nopqrs",
                "opqrst",
                "pqrstu",
                "qrstuv",
                "rstuvw",
                "stuvwx",
                "tuvwxy",
                "uvwxyz",
            ];
            if (digitPattern.some((i) => value?.includes(i))) return false;
            else if (characterPattern.some((i) => value?.includes(i)))
                return false;

            return true;
        }),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match").required('Confirm Password is Required'),
    userProfile: yup
        .object({
            firstName: yup.string().required('First name is required.'),
            lastName: yup.string(),
            profileImage: yup.string().required('Profile Image is required.'),
        })
        .required(),
});

export default registerValidation;
