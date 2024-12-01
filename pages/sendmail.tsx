import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function SendMail() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isMsgSend, setIsMsgSend] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  console.log("Hello");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoader(true);
    setIsMsgSend(false);
    try {
      await axios.post("/api/sendMail", formData);
      setIsMsgSend(true);
      setTimeout(() => {
        setIsMsgSend(false);
      }, 3000);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <>
      <div className="container mt-5 mx-auto p-8 max-w-md bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Send an Email
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 h-32 resize-none"
            required
          />
          <button
            type="submit"
            disabled={isLoader}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg w-full transition duration-300 transform hover:scale-105 shadow-lg"
          >
            {isLoader ? (
              <div role="status" className="text-center">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Send Mail"
            )}
          </button>

          {isMsgSend && (
            <div className="mt-5 text-center text-white bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-lg shadow-lg animate-pulse">
              🎉 Message Sent Successfully!
            </div>
          )}
        </form>
      </div>
    </>
  );
}
