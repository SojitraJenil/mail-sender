import nodemailer from "nodemailer";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res
          .status(400)
          .json({ message: "Missing fields in the form data" });
      }

      console.log("Received Data:", { name, email, message }); // Improved logging

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
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
    } catch (error: any) {
      console.error("Error sending email:", error); // Log detailed error
      res
        .status(500)
        .json({ message: "Error sending email", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
