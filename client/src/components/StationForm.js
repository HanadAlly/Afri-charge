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
});

function StationForm() {
  const initialValues = { name: "", location: "", price: "", type: "" };

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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Station</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={StationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label className="block">Name</label>
              <Field name="name" className="border p-2 w-full" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block">Location</label>
              <Field name="location" className="border p-2 w-full" />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block">Price</label>
              <Field name="price" type="number" className="border p-2 w-full" />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block">Type</label>
              <Field name="type" as="select" className="border p-2 w-full">
                <option value="">Select Type</option>
                <option value="Fast">Fast</option>
                <option value="Slow">Slow</option>
              </Field>
              <ErrorMessage
                name="type"
                component="div"
                className="text-red-500"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white p-2 rounded"
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
