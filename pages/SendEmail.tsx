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
    <div className="flex justify-center items-center min-h-screen bg-[#cde6dc]">
      <div className="max-w-lg w-full bg-[#fdfdf5] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold font-sans text-center text-gray-600 mb-4">
          Share Your Ideas
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <textarea
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200 bg-[#fffef7] placeholder-gray-500 text-gray-700"
            placeholder="Your message"
          />
          {formik.touched.message && formik.errors.message && (
            <span className="text-red-600">{formik.errors.message}</span>
          )}

          <div className="space-y-3">
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200 bg-[#fffef7] placeholder-gray-500 text-gray-700"
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
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200 bg-[#fffef7] placeholder-gray-500 text-gray-700"
              placeholder="Your email"
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-600">{formik.errors.email}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoader}
            className="w-24 bg-gray-600 text-white font-medium p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-400 ml-auto"
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
