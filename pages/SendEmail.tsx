import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

function SendMail() {
  const [isMsgSend, setIsMsgSend] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter your name"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Please enter your email"),
      message: Yup.string().required("Please enter your message"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoader(true);
        setIsMsgSend(false);
        await axios.post("/api/sendMail", values);

        setIsMsgSend(true);
        setTimeout(() => setIsMsgSend(false), 3000);
        formik.resetForm();
      } catch (error) {
        console.error("Error sending mail:", error);
      } finally {
        setIsLoader(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-600">
          Share Your Ideas
        </h2>
        <h3 className="text-xl font-medium text-center mb-6 text-gray-700">
          Contact us
        </h3>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <textarea
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Your message"
          />
          {formik.touched.message && formik.errors.message && (
            <span className="text-red-600">{formik.errors.message}</span>
          )}

          <div className="space-y-2">
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Your name"
            />
            {formik.touched.name && formik.errors.name && (
              <span className="text-red-600">{formik.errors.name}</span>
            )}

            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Your email"
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-600">{formik.errors.email}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoader}
            className="w-full bg-blue-500 text-white font-medium p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {isLoader ? "Sending..." : "Send"}
          </button>
        </form>

        {isMsgSend && (
          <div className="mt-4 text-green-600 text-center">
            🎉 Message Sent Successfully!
          </div>
        )}
      </div>
    </div>
  );
}

export default SendMail;
