import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
    username: Yup.string().trim().required('put in your username! pay attention.'),
    password: Yup.string().required('you think you didnt put in a password?')
})

const signupSchema = Yup.object().shape({
    username: Yup.string().trim().required('You need a username. what are you doing?').min(3,'minimum 3 characters').max(30,'max, 30 characters'),
    password: Yup.string().trim().required('You need a password. what are you doing?').min(5,'minimum 5 characters').max(200,'max, 200 characters'),
    phone_number: Yup.string().trim().required('You need a phone number. what are you doing?').min(7,'minimum 7 characters').max(15,'max, 15 characters')
})

export default signupSchema;
//otherwise {loginSchema}