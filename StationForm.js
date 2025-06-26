import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './StationForm.css';

const StationForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      location: '',
      capacity: '',
      solarPowered: false,
      batteryStorage: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Station name is required'),
      location: Yup.string().required('Location is required'),
      capacity: Yup.number()
        .min(1, 'Capacity must be at least 1')
        .required('Capacity is required'),
      batteryStorage: Yup.number()
        .min(0, 'Battery storage cannot be negative')
        .required('Battery storage is required'),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <div className="station-form-container">
      <h2>Add New Charging Station</h2>
      <form onSubmit={formik.handleSubmit} className="station-form">
        <div className="form-group">
          <label htmlFor="name">Station Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={formik.touched.name && formik.errors.name ? 'error' : ''}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error-message">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.location}
            className={formik.touched.location && formik.errors.location ? 'error' : ''}
          />
          {formik.touched.location && formik.errors.location ? (
            <div className="error-message">{formik.errors.location}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="capacity">Capacity (kW)</label>
          <input
            id="capacity"
            name="capacity"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.capacity}
            className={formik.touched.capacity && formik.errors.capacity ? 'error' : ''}
          />
          {formik.touched.capacity && formik.errors.capacity ? (
            <div className="error-message">{formik.errors.capacity}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="solarPowered">
            <input
              id="solarPowered"
              name="solarPowered"
              type="checkbox"
              onChange={formik.handleChange}
              checked={formik.values.solarPowered}
            />
            Solar Powered
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="batteryStorage">Battery Storage (kWh)</label>
          <input
            id="batteryStorage"
            name="batteryStorage"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.batteryStorage}
            className={formik.touched.batteryStorage && formik.errors.batteryStorage ? 'error' : ''}
          />
          {formik.touched.batteryStorage && formik.errors.batteryStorage ? (
            <div className="error-message">{formik.errors.batteryStorage}</div>
          ) : null}
        </div>

        <button type="submit" className="submit-button">
          Add Station
        </button>
      </form>
    </div>
  );
};

export default StationForm;