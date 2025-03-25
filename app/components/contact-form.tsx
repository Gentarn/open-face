"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ThankYouPopup } from "@/components/ui/thank-you-popup"
import ReCAPTCHA from "react-google-recaptcha"

interface FormState {
  success?: boolean
  message?: string
  errors?: {
    name?: string[]
    email?: string[]
    message?: string[]
    captchaToken?: string[]
  }
}

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>({})
  const [captchaToken, setCaptchaToken] = useState<string>("")
  const [showThankYou, setShowThankYou] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
          captchaToken: captchaToken
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      setFormState(data)
      if (data.success) {
        setShowThankYou(true)
      }
    } catch (error) {
      setFormState({
        success: false,
        message: "エラーが発生しました。後でもう一度お試しください。",
        errors: {}
      })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <Input name="name" placeholder="Name(氏名)" className="w-full border-gray-300 text-gray-800" />
          {formState.errors?.name && <p className="text-red-500 text-sm mt-1">{formState.errors.name[0]}</p>}
        </div>
        <div>
          <Input name="email" type="email" placeholder="Email" className="w-full border-gray-300 text-gray-800" />
          {formState.errors?.email && <p className="text-red-500 text-sm mt-1">{formState.errors.email[0]}</p>}
        </div>
        <div>
          <Textarea
            name="message"
            placeholder="Message（内容をご記入ください）"
            rows={6}
            className="w-full border-gray-300 text-gray-800"
          />
          {formState.errors?.message && <p className="text-red-500 text-sm mt-1">{formState.errors.message[0]}</p>}
        </div>
        <div className="flex justify-center">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={(token) => setCaptchaToken(token || '')}
          />
        </div>
        {formState.errors?.captchaToken && (
          <p className="text-red-500 text-sm text-center">{formState.errors.captchaToken[0]}</p>
        )}
        <div className="text-center">
          <Button type="submit" className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-12">
            送信 - Send Message
          </Button>
        </div>
      </form>

      {showThankYou && formState.success && (
        <ThankYouPopup
          message={formState.message || "お問い合わせありがとうございます。メッセージが送信されました。"}
          onClose={() => setShowThankYou(false)}
        />
      )}
    </div>
  )
}