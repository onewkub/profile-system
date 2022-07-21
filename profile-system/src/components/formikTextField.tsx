import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import { FormikProps } from 'formik';
import { get, isUndefined } from 'lodash';

export interface FormikTextFieldProps<T> {
    formik: FormikProps<T>;
    name: string;
    selectPlaceholder?: string;
    modifyValue?: (value: any) => string;
}

function FormikTextField<T = any>(
    props: FormikTextFieldProps<T> & TextFieldProps,
) {
    const {
        formik,
        name,
        onChange,
        modifyValue,
        selectPlaceholder,
        children,
        ...other
    } = props;
    return (
        <TextField
            {...other}
            name={name}
            value={
                modifyValue
                    ? modifyValue(get(formik.values, name))
                    : get(formik.values, name) ?? ''
            }
            onBlur={formik.handleBlur}
            onChange={onChange || formik.handleChange}
            error={
                get(formik.touched, name) && Boolean(get(formik.errors, name))
            }
            helperText={get(formik.touched, name) && get(formik.errors, name)}
        >
            {!isUndefined(selectPlaceholder)
                ? [
                      <MenuItem disabled key="-1" value="">
                          {selectPlaceholder}
                      </MenuItem>,
                      children,
                  ]
                : children}{' '}
        </TextField>
    );
}
export default FormikTextField;
