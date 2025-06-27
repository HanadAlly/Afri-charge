// client/src/components/StationForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const StationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  location: Yup.string()
    .matches(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/, "Must be in 'latitude,longitude' format")
    .required('Location is required'),
  price: Yup.number().min(0, 'Price must be positive').required('Price is required'),
  type: Yup.string().required('Type is required'),
});

function StationForm() {
    const navigate = useNavigate();
    const { token } = useAuth();
    const initialValues = { name: '', location: '', price: '', type: '' }; // ownerId removed

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        fetch('/api/stations', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // NEW: Sending the auth token
            },
            body: JSON.stringify(values),
        })
        .then(res => {
          if (res.status === 201) return res.json();
          throw new Error('Failed to create station');
        })
        .then(data => {
            toast.success('Station added successfully!');
            resetForm();
            navigate('/dashboard');
        })
        .catch(error => {
            toast.error(error.message);
        })
        .finally(() => {
            setSubmitting(false);
        });
    };

    // ... The Formik JSX remains largely the same, but with the ownerId field removed ...
    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-3xl font-bold text-center text-africharge-blue mb-6">Add a Charging Station</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={StationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        {/* Name Field */}
                        <div>
                            <label className="block text-africharge-gray">Name</label>
                            <Field name="name" className="w-full p-2 border rounded-md" />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                        </div>
                        {/* Location Field */}
                        <div>
                            <label className="block text-africharge-gray">Location (e.g., -1.286389, 36.817223)</label>
                            <Field name="location" className="w-full p-2 border rounded-md" />
                            <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
                        </div>
                        {/* Price Field */}
                        <div>
                            <label className="block text-africharge-gray">Price (per kWh)</label>
                            <Field name="price" type="number" className="w-full p-2 border rounded-md" />
                            <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
                        </div>
                        {/* Type Field */}
                        <div>
                            <label className="block text-africharge-gray">Charger Type</label>
                            <Field name="type" as="select" className="w-full p-2 border rounded-md">
                                <option value="">Select Type</option>
                                <option value="AC_Level_2">AC Level 2</option>
                                <option value="DC_Fast_Charger">DC Fast Charger</option>
                                <option value="SuperCharger">SuperCharger</option>
                            </Field>
                            <ErrorMessage name="type" component="div" className="text-red-500 text-sm" />
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full bg-africharge-blue text-white p-3 rounded-lg hover:bg-blue-800 disabled:bg-gray-400">
                            {isSubmitting ? 'Submitting...' : 'Add Station'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default StationForm;