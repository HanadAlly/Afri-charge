// client/src/components/Signup.js

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Validation schema for the signup form
const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters long')
        .required('Username is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required'),
});

function Signup() {
    const navigate = useNavigate();
    const initialValues = { username: '', password: '', confirmPassword: '' };

    const handleSubmit = (values, { setSubmitting }) => {
        // We only need to send username and password to the backend
        const { username, password } = values;

        fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
        .then(res => {
            if (res.status === 201) {
                return res.json();
            } else {
                // Try to get error message from backend
                return res.json().then(err => { throw new Error(err.error || 'Signup failed') });
            }
        })
        .then(data => {
            toast.success('Signup successful! Please log in.');
            navigate('/login'); // Redirect user to login page after successful signup
        })
        .catch(error => {
            toast.error(error.message);
        })
        .finally(() => {
            setSubmitting(false);
        });
    };

    return (
        <div className="p-6 max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-center text-africharge-blue mb-6">Create an Account</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        <div>
                            <label className="block text-africharge-gray">Username</label>
                            <Field name="username" className="w-full p-2 border rounded" />
                            <ErrorMessage name="username" component="div" className="text-red-500 text-sm"/>
                        </div>
                        <div>
                            <label className="block text-africharge-gray">Password</label>
                            <Field name="password" type="password" className="w-full p-2 border rounded" />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <label className="block text-africharge-gray">Confirm Password</label>
                            <Field name="confirmPassword" type="password" className="w-full p-2 border rounded" />
                            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-africharge-blue text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                        >
                            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Signup;