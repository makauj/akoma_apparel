import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.ETHEREAL_USER,
    pass: process.env.ETHEREAL_PASS,
  },
});

interface SendEmailProps {
  to: string;
  subject: string;
  text: string;
}

export const sendEmail = async ({ to, subject, text }: SendEmailProps) => {
  const info = await transporter.sendMail({
    from: '"Akoma Apparel" <no-reply@akoma.com>',
    to,
    subject,
    text,
  });

  console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
};
