import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import { IoMdClose } from "react-icons/io";
import * as Yup from "yup";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function SendMail() {
  const [isMsgSend, setIsMsgSend] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter a Name"),
      email: Yup.string()
        .email("Enter a valid Email")
        .required("Enter an Email"),
      message: Yup.string().required("Enter a Message"),
    }),
    onSubmit: async (values: FormData) => {
      try {
        setIsLoader(true);
        setIsMsgSend(false);
        await axios.post("/api/sendMail", values);
        setIsMsgSend(true);
        setTimeout(() => setIsMsgSend(false), 3000);
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setIsLoader(false);
      }
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  const HandleFormClear = () => {
    formik.resetForm();
  };

  return (
    <div className="container mt-5 mx-auto p-8 max-w-md bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Send an Email
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formik.values.name}
          onChange={(e) => {
            formik.handleChange(e);
            formik.setFieldError("name", "");
          }}
          onBlur={formik.handleBlur}
          className="border border-gray-300 p-3 w-full rounded-lg mb-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {formik.touched.name && formik.errors.name && (
          <span className="text-red-600">{formik.errors.name}</span>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={(e) => {
            formik.handleChange(e);
            formik.setFieldError("email", "");
          }}
          onBlur={formik.handleBlur}
          className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {formik.touched.email && formik.errors.email && (
          <span className="text-red-600">{formik.errors.email}</span>
        )}

        <textarea
          name="message"
          placeholder="Message"
          value={formik.values.message}
          onChange={(e) => {
            formik.handleChange(e);
            formik.setFieldError("message", "");
          }}
          onBlur={formik.handleBlur}
          className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 h-32 resize-none"
        />
        {formik.touched.message && formik.errors.message && (
          <span className="text-red-600">{formik.errors.message}</span>
        )}

        <button
          type="submit"
          disabled={isLoader}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg w-full transition duration-300 transform hover:scale-105 shadow-lg"
        >
          {isLoader ? (
            <div className="flex justify-center">
              <div className="w-7 h-7 border-2 border-t-red-500 border-gray-100 rounded-full animate-spin"></div>
            </div>
          ) : (
            "Send Mail"
          )}
        </button>
      </form>

      {(formik.values.name || formik.values.email || formik.values.message) && (
        <button
          onClick={HandleFormClear}
          className="bg-red-400 my-5 flex align-middle text-white px-4 rounded-md"
        >
          <IoMdClose className="pe-0 h-5 w-5 align-middle my-auto" />
          <span className="align-middle my-auto">Clear</span>
        </button>
      )}

      {isMsgSend && (
        <div className="mt-5 text-center text-white bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-lg shadow-lg animate-pulse">
          🎉 Message Sent Successfully!
        </div>
      )}
    </div>
  );
}
