"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Twitter, Linkedin, Facebook, MapPin, Mail, Heart, Menu, X } from "lucide-react"
import { ContactForm } from "@/app/components/contact-form"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const MenuItems = () => (
    <>
      <a
        href="#services"
        className="font-serif hover:text-gold transition-colors block md:inline"
        onClick={closeMenu}
      >
        OUR SERVICE
      </a>
      <a
        href="#about"
        className="font-serif hover:text-gold transition-colors block md:inline"
        onClick={closeMenu}
      >
        ABOUT US
      </a>
      <a
        href="#contact"
        className="font-serif hover:text-gold transition-colors block md:inline"
        onClick={closeMenu}
      >
        CONTACT
      </a>
    </>
  )

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* ヘッダー */}
      <header className="bg-white text-gray-800 px-4 py-6 border-b relative">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="h-10">
              <img
                src="/images/logo.png"
                alt="OPEN FACE LLC"
                className="h-full w-auto"
              />
            </div>
            <span className="font-serif text-2xl">OPEN FACE LLC</span>
          </div>
          
          {/* モバイルメニューボタン */}
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="メニュー"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* デスクトップメニュー */}
          <nav className="hidden md:flex space-x-8">
            <MenuItems />
          </nav>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <nav className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg z-50">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <MenuItems />
            </div>
          </nav>
        )}
      </header>

      {/* ヒーローセクション */}
      <section className="relative w-full">
        <div className="container mx-auto">
          <div className="mx-auto my-[60px] max-w-[91vw] sm:max-w-full px-4 sm:px-[125px]">
            <div className="relative w-full h-[800px] overflow-hidden">
              <div className="relative h-full">
                <video
                  className="w-full h-full object-cover rounded-lg"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/images/topmov.mp4" type="video/mp4" />
                </video>
                <h1 className="hero-text font-serif font-bold">We've got Solution!</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <p className="text-2xl text-center font-serif">ビジネス変革のためクラウド価値を最大化するパートナー</p>
          </div>
        </div>
      </section>

      {/* What's Open Face セクション */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center mb-12">What&apos;s Open Face</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-700 leading-relaxed mb-8">
              新型コロナの影響により、働き方や業務のあり方が変わってきた今日となりました。これに伴い、「モバイルワーク環境」「クラウドファースト」「モバイルファースト」とお客様お持ちの課題も変革してきました。中小企業においても、この時代に適応を図る動きがありますが、弊社は設立当初から「クラウドインテグレーター」を標榜し、お客様とともに解決の道筋とソリューションを提供してまいりました。
            </p>
            <p className="text-gray-700 leading-relaxed">
              これまでにさまざま業態の企業、業務系パッケージ導入、およびクラウドソーシングによるコンサルティングのノウハウを活かし、システム開発と業界課題を踏まえたビジネスモデルへの対応力の強化し、最適化とクラウド化を総合的にご提案いたします。
            </p>
          </div>
          <div className="text-center mt-12">
            <a href="#contact" onClick={closeMenu}>
              <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-8">お問い合わせ</Button>
            </a>
          </div>
        </div>
      </section>

      {/* サービスセクション */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">OUR SERVICES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <Card className="bg-white shadow-md service-card">
              <CardContent className="p-6">
                <img
                  src="/images/BPM.png"
                  alt="業務プロセス改善"
                  className="w-[150px] h-[150px] mx-auto mb-6 rounded-full object-cover"
                />
                <h3 className="font-serif font-bold text-xl mb-4 text-center">業務プロセス改善</h3>
                <p className="text-gray-700 text-left">
                  業務課程の分析・見直しによる改善、ITを活用する分野の選定など、お客様の業務改善をご支援いたします。
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md service-card">
              <CardContent className="p-6">
                <img
                  src="/images/CloudMigration.jpeg"
                  alt="ロードマップ/メニュー作成"
                  className="w-[150px] h-[150px] mx-auto mb-6 rounded-full object-cover"
                />
                <h3 className="font-serif font-bold text-xl mb-4 text-center">ロードマップ/メニュー作成</h3>
                <p className="text-gray-700 text-left">クラウド化の課題を整理し、段階的な移行計画を立案いたします。</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md service-card">
              <CardContent className="p-6">
                <img
                  src="/images/ITmanage.jpeg"
                  alt="クラウド移行サポート"
                  className="w-[150px] h-[150px] mx-auto mb-6 rounded-full object-cover"
                />
                <h3 className="font-serif font-bold text-xl mb-4 text-center">クラウド移行サポート</h3>
                <p className="text-gray-700 text-left">
                  クラウド移行における課題やリスクを分析し、最適な移行方法をご提案いたします。
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md service-card">
              <CardContent className="p-6">
                <img
                  src="/images/LowCode.jpeg"
                  alt="IA対策"
                  className="w-[150px] h-[150px] mx-auto mb-6 rounded-full object-cover"
                />
                <h3 className="font-serif font-bold text-xl mb-4 text-center">AI対策</h3>
                <p className="text-gray-700 text-left">
                  情報システムを活用した業務改善やデータ分析による効率化をご支援いたします。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* チームセクション */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">OUR TEAM</h2>
          <div className="max-w-sm mx-auto text-center">
            <div className="mb-6">
              <img
                src="/images/Masanori.jpeg"
                alt="MASANORI TAKEUCHI - Managing Director"
                className="w-[200px] h-[200px] rounded-full mx-auto shadow-lg object-cover"
              />
            </div>
            <h3 className="font-serif font-bold text-2xl mb-2">MASANORI TAKEUCHI</h3>
            <p className="text-gray-700 mb-6 font-serif italic">Managing Director</p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* コンタクトセクション */}
      <section id="contact" className="teal-bg py-20 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">LET&apos;S GET IN TOUCH</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-4">MEET US IN PERSON</h3>
              <p>東京都調布市飛田給1-24-1</p>
              <p>Tobitakyu Chofu-si Tokyo Japan</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-4">THE TRADITIONAL WAY</h3>
              <p>Contact below</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-4">LET&apos;S GET SOCIAL</h3>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-white hover:text-gray-200 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-white hover:text-gray-200 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-white hover:text-gray-200 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* コンタクトフォーム */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-xl">
          <ContactForm />
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-white py-8 border-t">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600">Copyright © 2025 OpenFace LLC All rights reserved</p>
        </div>
      </footer>

      {/* Thank You ポップアップ */}
      {showThankYou && state.success && (
        <ThankYouPopup
          message={state.message || "お問い合わせありがとうございます。メッセージが送信されました。"}
          onClose={() => setShowThankYou(false)}
        />
      )}
    </div>
  )
}
