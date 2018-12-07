import { object, ref, string } from 'yup';

export default object().shape({
    username: string()
        .required("Username is required.")
        .email(),
    password: string()
        .required("Password is required."),
    confirmPassword: string()
        .oneOf([ref('password')], 'Passwords do not match')
        .required("Confirm password is required.")
});