import { object, string } from 'yup';

export default object().shape({
    userEmail: string()
        .required()
        .email(),
    userPassword: string()
        .required()
});