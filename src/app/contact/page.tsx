"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { Mail, Github, Youtube, Instagram, Send, MapPin, Phone, CheckCircle2, ArrowRight } from 'lucide-react'
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
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary font-inter overflow-x-hidden">
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
                className="object-cover"
                data-ai-hint="contact hero"
                priority
              />
            </div>
            <div className="md:hidden absolute inset-0">
              <Image 
                src="/hero_mobile.jpg" 
                alt="Contact Hero Mobile" 
                fill 
                unoptimized
                className="object-cover"
                data-ai-hint="contact hero mobile"
                priority
              />
            </div>
            {/* Transition Fade Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center space-y-4 pt-20"
          >
            <h1 className="text-7xl md:text-[140px] font-black tracking-tighter text-green-gradient uppercase leading-none drop-shadow-2xl">Connect</h1>
            <p className="text-primary/80 text-sm md:text-base font-black uppercase tracking-[0.4em]">The Connect Station 2026</p>
          </motion.div>
        </section>

        <div className="max-w-7xl mx-auto px-6 space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 pb-20">
            {/* Form Section */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-green-600/20 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-card p-8 md:p-16 rounded-[3rem] border border-primary/10 shadow-2xl min-h-[500px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div 
                      key="form"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-10"
                    >
                      <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-primary">Message</h2>
                        <p className="text-xs font-black tracking-widest text-muted-foreground uppercase">Initiate Transmition</p>
                      </div>
                      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <Input className="h-14 md:h-16 rounded-2xl border-primary/10 bg-muted/30 font-bold uppercase tracking-widest placeholder:text-muted-foreground/30" placeholder="NAME" required />
                          <Input className="h-14 md:h-16 rounded-2xl border-primary/10 bg-muted/30 font-bold uppercase tracking-widest placeholder:text-muted-foreground/30" placeholder="EMAIL" type="email" required />
                        </div>
                        <Input className="h-14 md:h-16 rounded-2xl border-primary/10 bg-muted/30 font-bold uppercase tracking-widest placeholder:text-muted-foreground/30" placeholder="SUBJECT" required />
                        <Textarea className="min-h-[150px] md:min-h-[200px] rounded-[2rem] border-primary/10 bg-muted/30 font-bold uppercase tracking-widest placeholder:text-muted-foreground/30 p-6" placeholder="VISION..." required />
                        <div className="pt-6 md:pt-10">
                          <Button type="submit" className="w-full h-16 md:h-20 rounded-full bg-primary text-white font-black uppercase shadow-2xl transition-all hover:scale-[1.02] active:scale-95 text-xs md:text-sm tracking-[0.2em]">
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
                      className="text-center space-y-8 py-10"
                    >
                      <div className="flex justify-center">
                        <div className="relative">
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 12, stiffness: 200 }}
                            className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                          >
                            <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16" />
                          </motion.div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-primary">Mission Success</h2>
                        <p className="text-muted-foreground font-black uppercase tracking-[0.2em] text-[10px]">Message Received & Secured</p>
                      </div>
                      <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed text-sm md:text-base">
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
            </div>

            {/* Info Section */}
            <div className="flex flex-col justify-center space-y-12 md:space-y-16 py-8 md:py-12">
              <div className="space-y-8">
                <h3 className="text-[10px] font-black tracking-[0.4em] text-primary uppercase border-l-2 border-primary/20 pl-6">CHANNELS</h3>
                <div className="space-y-4 md:space-y-6">
                  <ContactInfo icon={<Mail />} label="Email" value="itsmuhammadahmad06@gmail.com" />
                  <ContactInfo icon={<Phone />} label="Phone" value="+923434441031" />
                  <ContactInfo icon={<MapPin />} label="Location" value="Faisalabad, PK" />
                </div>
              </div>
              <div className="flex flex-wrap gap-4 md:gap-6 pt-4 justify-center lg:justify-start">
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
    <div className="flex items-center gap-4 md:gap-6 group w-full overflow-hidden p-2">
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shrink-0 transition-all group-hover:bg-primary group-hover:text-white group-hover:scale-105">
        {React.cloneElement(icon as React.ReactElement, { className: "h-5 w-5 md:h-6 md:w-6" })}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[8px] font-black tracking-widest text-muted-foreground uppercase mb-1">{label}</p>
        <p className="text-base md:text-xl font-black tracking-tighter uppercase truncate text-primary">{value}</p>
      </div>
    </div>
  )
}

function SocialCircle({ icon, href }: any) {
  return (
    <a href={href} target="_blank" className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-primary/10 flex items-center justify-center text-primary bg-card hover:bg-primary hover:text-white transition-all shadow-xl shrink-0 hover:scale-110 active:scale-95">
      {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6 md:h-8 md:w-8" })}
    </a>
  )
}
