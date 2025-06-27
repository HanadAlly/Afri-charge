import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const initialValues = { username: '', password: '' };

    const handleSubmit = (values, { setSubmitting }) => {
        fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        })
        .then(res => res.ok ? res.json() : Promise.reject('Invalid credentials'))
        .then(data => {
            toast.success(`Welcome, ${data.user.username}!`);
            login(data);
            navigate('/dashboard');
        })
        .catch(error => {
            toast.error(error.message || 'Login failed. Please try again.');
        })
        .finally(() => {
            setSubmitting(false);
        });
    };

    return (
        <div className="p-6 max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-center text-africharge-blue mb-6">Login</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={LoginSchema}
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
                      <Field name="password" type="password" className="w-full p-2 border rounded"/>
                      <ErrorMessage name="password" component="div" className="text-red-500 text-sm"/>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-africharge-blue text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400">
                      {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                  </Form>
                )}
            </Formik>
        </div>
    );
}

export default Login;