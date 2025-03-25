import { NextResponse } from 'next/server';
import { sendEmail } from '@/app/lib/mail';
import { verifyCaptcha } from '@/app/lib/captcha';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, { message: "名前を入力してください" }),
  email: z.string().email({ message: "有効なメールアドレスを入力してください" }),
  message: z.string().min(1, { message: "メッセージを入力してください" }),
  captchaToken: z.string().min(1, { message: "CAPTCHA認証を完了してください" }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedFields = formSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json({
        success: false,
        message: "フォームの入力内容に問題があります",
        errors: validatedFields.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const { name, email, message, captchaToken } = validatedFields.data;

    const isCaptchaValid = await verifyCaptcha(captchaToken);
    if (!isCaptchaValid) {
      return NextResponse.json({
        success: false,
        message: "CAPTCHA認証に失敗しました。もう一度お試しください。",
      }, { status: 400 });
    }

    const result = await sendEmail({
      to: "m.takeuchi@open-face.net",
      from: email,
      subject: `お問い合わせ: ${name}`,
      text: `
お名前: ${name}
メールアドレス: ${email}

メッセージ:
${message}
      `.trim(),
    });

    if (!result.success) {
      throw new Error("メール送信に失敗しました");
    }

    return NextResponse.json({
      success: true,
      message: "お問い合わせありがとうございます。メッセージが送信されました。",
    });
  } catch (error) {
    console.error("エラー:", error);
    return NextResponse.json({
      success: false,
      message: "メッセージの送信中にエラーが発生しました。後でもう一度お試しください。",
    }, { status: 500 });
  }
}
