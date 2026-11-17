
"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Mail, Github, Linkedin, Youtube, Instagram, Send, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-foreground selection:bg-primary/20 selection:text-primary font-inter">
      <Navbar />
      
      <main className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="space-y-24"
        >
          <div className="text-center md:text-left space-y-4">
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-green-gradient uppercase">Connect</h1>
            <p className="text-muted-foreground text-xl font-medium uppercase tracking-[0.4em]">The Connect Station</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 pb-20">
            <div className="crystal-panel p-12 md:p-20 rounded-[4rem] space-y-12">
              <h2 className="text-4xl font-black tracking-tighter uppercase">Message</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input className="h-16 rounded-2xl border-primary/10" placeholder="NAME" />
                  <Input className="h-16 rounded-2xl border-primary/10" placeholder="EMAIL" />
                </div>
                <Input className="h-16 rounded-2xl border-primary/10" placeholder="SUBJECT" />
                <Textarea className="min-h-[200px] rounded-3xl border-primary/10" placeholder="VISION..." />
                <div className="pt-10">
                  <Button className="w-full h-20 rounded-full bg-primary text-white font-black uppercase shadow-2xl">
                    VISIT <Send className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            </div>

            <div className="flex flex-col justify-center space-y-16 py-12">
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
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}

function ContactInfo({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-6 group w-full overflow-hidden">
      <div className="w-16 h-16 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shrink-0 transition-all group-hover:bg-primary group-hover:text-white">
        {React.cloneElement(icon, { className: "h-6 w-6" })}
      </div>
      <div className="min-w-0">
        <p className="text-[8px] font-black tracking-widest text-muted-foreground uppercase">{label}</p>
        <p className="text-lg md:text-xl font-black tracking-tighter uppercase truncate">{value}</p>
      </div>
    </div>
  )
}

function SocialCircle({ icon, href }: any) {
  return (
    <a href={href} target="_blank" className="w-20 h-20 rounded-full border border-primary/10 flex items-center justify-center text-primary bg-white hover:bg-primary hover:text-white transition-all shadow-xl shrink-0">
      {React.cloneElement(icon, { className: "h-8 w-8" })}
    </a>
  )
}
