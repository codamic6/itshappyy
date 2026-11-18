
"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { Mail, Github, Linkedin, Youtube, Instagram, Send, MapPin, Phone, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-foreground selection:bg-primary/20 selection:text-primary font-inter overflow-x-hidden">
      <Navbar />
      
      <main className="pb-20">
        <section className="relative h-[60vh] md:h-[70vh] flex flex-col items-center justify-center px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="hidden md:block absolute inset-0">
              <Image 
                src="/hero.jpg" 
                alt="Contact Hero PC" 
                fill 
                unoptimized
                className="object-cover opacity-50"
                data-ai-hint="contact hero"
              />
            </div>
            <div className="md:hidden absolute inset-0">
              <Image 
                src="/hero_mobile.jpg" 
                alt="Contact Hero Mobile" 
                fill 
                unoptimized
                className="object-cover opacity-50"
                data-ai-hint="contact hero mobile"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white" />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center space-y-4 pt-20"
          >
            <h1 className="text-7xl md:text-[140px] font-black tracking-tighter text-green-gradient uppercase leading-none">Connect</h1>
            <p className="text-muted-foreground text-sm md:text-base font-medium uppercase tracking-[0.4em]">The Connect Station 2026</p>
          </motion.div>
        </section>

        <div className="max-w-7xl mx-auto px-6 space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 pb-20">
            <div className="crystal-panel p-12 md:p-20 rounded-[4rem] relative overflow-hidden min-h-[600px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-12"
                  >
                    <h2 className="text-4xl font-black tracking-tighter uppercase">Message</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input className="h-16 rounded-2xl border-primary/10 bg-white/50" placeholder="NAME" required />
                        <Input className="h-16 rounded-2xl border-primary/10 bg-white/50" placeholder="EMAIL" type="email" required />
                      </div>
                      <Input className="h-16 rounded-2xl border-primary/10 bg-white/50" placeholder="SUBJECT" required />
                      <Textarea className="min-h-[200px] rounded-3xl border-primary/10 bg-white/50" placeholder="VISION..." required />
                      <div className="pt-10">
                        <Button type="submit" className="w-full h-20 rounded-full bg-primary text-white font-black uppercase shadow-2xl transition-all hover:scale-[1.02] active:scale-95">
                          SUBMIT <Send className="ml-2 h-5 w-5" />
                        </Button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-8"
                  >
                    <div className="flex justify-center">
                      <div className="relative">
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 12, stiffness: 200 }}
                          className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                        >
                          <CheckCircle2 className="w-16 h-16" />
                        </motion.div>
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-full border-2 border-primary/20"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-5xl font-black tracking-tighter uppercase text-primary">Mission Success</h2>
                      <p className="text-muted-foreground font-medium uppercase tracking-[0.2em]">Message Received & Secured</p>
                    </div>
                    <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
                      Alhamdulillah, your vision has been transmitted to the core system. Arsalan will analyze and respond shortly.
                    </p>
                    <div className="pt-8">
                      <Button asChild variant="outline" className="rounded-full px-12 h-14 border-primary/20 text-primary font-black uppercase tracking-widest text-[10px]">
                        <Link href="/">RETURN HOME <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col justify-center space-y-16 py-12 min-w-0">
              <div className="space-y-8">
                <h3 className="text-[10px] font-black tracking-widest uppercase text-primary">CHANNELS</h3>
                <div className="space-y-6">
                  <ContactInfo icon={<Mail />} label="Email" value="itsmuhammadahmad06@gmail.com" />
                  <ContactInfo icon={<Phone />} label="Phone" value="+923434441031" />
                  <ContactInfo icon={<MapPin />} label="Location" value="Faisalabad, PK" />
                </div>
              </div>
              <div className="flex flex-wrap gap-6 pt-4 pb-12">
                <SocialCircle icon={<Youtube />} href="https://youtube.com/@VoicesOfHaram" />
                <SocialCircle icon={<Instagram />} href="https://instagram.com/voicesofharam.official" />
                <SocialCircle icon={<Github />} href="https://github.com/codamic6" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function ContactInfo({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-6 group w-full overflow-hidden">
      <div className="w-16 h-16 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shrink-0 transition-all group-hover:bg-primary group-hover:text-white">
        {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6" })}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[8px] font-black tracking-widest text-muted-foreground uppercase">{label}</p>
        <p className="text-lg md:text-xl font-black tracking-tighter uppercase truncate">{value}</p>
      </div>
    </div>
  )
}

function SocialCircle({ icon, href }: any) {
  return (
    <a href={href} target="_blank" className="w-20 h-20 rounded-full border border-primary/10 flex items-center justify-center text-primary bg-white hover:bg-primary hover:text-white transition-all shadow-xl shrink-0">
      {React.cloneElement(icon as React.ReactElement, { className: "h-8 w-8" })}
    </a>
  )
}
