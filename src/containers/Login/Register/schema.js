import { object, ref, string } from 'yup';

export default object().shape({
    userEmail: string()
        .required()
        .email(),
    userPassword: string()
        .required(),
    userConfirmPassword: string()
        .oneOf([ref('userPassword')], 'Passwords do not match')
        .required()
});