import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail({
  to,
  from,
  subject,
  text,
}: {
  to: string;
  from: string;
  subject: string;
  text: string;
}) {
  try {
    await transporter.sendMail({
      from: `"お問い合わせフォーム" <${process.env.EMAIL_USER}>`,
      replyTo: from,
      to,
      subject,
      text,
    });
    return { success: true };
  } catch (error) {
    console.error('メール送信エラー:', error);
    return { success: false, error };
  }
}