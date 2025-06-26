import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const StationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  location: Yup.string().required("Location is required"),
  price: Yup.number()
    .min(0, "Price must be positive")
    .required("Price is required"),
  type: Yup.string().required("Type is required"),
  ownerId: Yup.number().required("Owner ID is required"),
});

function StationForm() {
  const initialValues = {
    name: "",
    location: "",
    price: "",
    type: "",
    ownerId: "",
  };

  const handleSubmit = (values) => {
    fetch("http://localhost:5555/api/stations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-3xl font-bold text-africharge-blue mb-6">
        Add a Charging Station
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={StationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-africharge-gray">Name</label>
              <Field name="name" className="w-full p-2 border rounded" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-africharge-gray">
                Location (lat,long)
              </label>
              <Field name="location" className="w-full p-2 border rounded" />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-africharge-gray">Price ($)</label>
              <Field
                name="price"
                type="number"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-africharge-gray">Type</label>
              <Field
                name="type"
                as="select"
                className="w-full p-2 border rounded"
              >
                <option value="">Select Type</option>
                <option value="Fast">Fast</option>
                <option value="Slow">Slow</option>
              </Field>
              <ErrorMessage
                name="type"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-africharge-gray">Owner ID</label>
              <Field
                name="ownerId"
                type="number"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="ownerId"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-africharge-blue text-white p-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default StationForm;
