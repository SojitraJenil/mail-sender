import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { name, email, message, additionalEmails } = req.body;

      if (!name || !email || !message) {
        return res
          .status(400)
          .json({ message: "Missing fields in the form data" });
      }

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER as string,
          pass: process.env.EMAIL_PASS as string,
        },
      });

      // Combine primary email with additional emails
      const allRecipients = [email, ...(additionalEmails || [])];

      // Send email to all recipients
      await Promise.all(
        allRecipients.map(async (recipient) => {
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: recipient,
            subject: `New message from ${name}`,
            text: message,
          };

          await transporter.sendMail(mailOptions);
        })
      );

      res.status(200).json({ message: "Emails sent successfully!" });
    } catch (error) {
      console.error("Error sending emails:", error);
      res.status(500).json({
        message: "Error sending emails",
        error: (error as Error).message,
      });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
