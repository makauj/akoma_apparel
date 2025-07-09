import nodemailer from "nodemailer";

const isTestEnv = process.env.NODE_ENV === "test";

interface SendEmailProps {
  to: string;
  subject: string;
  text: string;
}

export const sendEmail = async ({ to, subject, text }: SendEmailProps) => {
  if (isTestEnv) {
    console.log(`Mock email sent to ${to}: ${subject}`);
    return Promise.resolve();
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.ETHEREAL_USER,
      pass: process.env.ETHEREAL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: "\"Akoma Apparel\" <no-reply@akoma.com>",
    to,
    subject,
    text,
  });

  console.log("Message sent: %s", info.messageId);
  return info;
};
