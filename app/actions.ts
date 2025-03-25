"use server"

import { z } from "zod"
import { verifyCaptcha } from "./lib/captcha"
import { sendEmail } from "./lib/mail"

// フォームデータのバリデーションスキーマ
const formSchema = z.object({
  name: z.string().min(1, { message: "名前を入力してください" }),
  email: z.string().email({ message: "有効なメールアドレスを入力してください" }),
  message: z.string().min(1, { message: "メッセージを入力してください" }),
  captchaToken: z.string().min(1, { message: "CAPTCHA認証を完了してください" }),
})

export type FormState = {
  success?: boolean
  message?: string
  errors?: {
    name?: string[]
    email?: string[]
    message?: string[]
    captchaToken?: string[]
  }
}

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  // フォームデータの検証
  const validatedFields = formSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    captchaToken: formData.get("h-captcha-response"),
  })

  // バリデーションエラーがある場合
  if (!validatedFields.success) {
    return {
      success: false,
      message: "フォームの入力内容に問題があります",
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, message, captchaToken } = validatedFields.data

  try {
    // CAPTCHA検証
    const isCaptchaValid = await verifyCaptcha(captchaToken)
    if (!isCaptchaValid) {
      return {
        success: false,
        message: "CAPTCHA認証に失敗しました。もう一度お試しください。",
      }
    }

    // メール送信
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
    })

    if (!result.success) {
      throw new Error("メール送信に失敗しました")
    }

    // 成功レスポンス
    return {
      success: true,
      message: "お問い合わせありがとうございます。メッセージが送信されました。",
    }
  } catch (error) {
    console.error("エラー:", error)
    // エラーレスポンス
    return {
      success: false,
      message: "メッセージの送信中にエラーが発生しました。後でもう一度お試しください。",
    }
  }
}
