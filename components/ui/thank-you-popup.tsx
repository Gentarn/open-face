"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ThankYouPopupProps {
  message: string
  onClose: () => void
}

export function ThankYouPopup({ message, onClose }: ThankYouPopupProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
        <div className="text-center">
          <div className="mb-4 bg-green-100 text-green-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Thank You!</h3>
          <p className="mb-4">{message}</p>
          <Button onClick={onClose} className="bg-primary hover:bg-primary-dark text-white">
            閉じる
          </Button>
        </div>
      </div>
    </div>
  )
}

