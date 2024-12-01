import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res
          .status(400)
          .json({ message: "Missing fields in the form data" });
      }

      console.log("Received Data:", { name, email, message });

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER as string,
          pass: process.env.EMAIL_PASS as string,
        },
      });

      const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `New message from ${name}`,
        text: message,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({
        message: "Error sending email",
        error: (error as Error).message,
      });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
