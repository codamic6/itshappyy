"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
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
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-green-gradient uppercase">Contact</h1>
            <p className="text-muted-foreground text-xl font-medium uppercase tracking-[0.4em]">The Connect Station</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Form */}
            <div className="crystal-panel p-12 md:p-20 rounded-[4rem] space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-black tracking-tighter uppercase">Start a Project</h2>
                <p className="text-muted-foreground font-medium">Ready to scale your brand? Let's engineer something iconic.</p>
              </div>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest uppercase text-primary ml-1">Name</label>
                    <Input className="h-16 rounded-2xl bg-white/50 border-primary/10 focus:ring-primary/20" placeholder="YOUR NAME" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest uppercase text-primary ml-1">Email</label>
                    <Input className="h-16 rounded-2xl bg-white/50 border-primary/10 focus:ring-primary/20" placeholder="YOUR EMAIL" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest uppercase text-primary ml-1">Subject</label>
                  <Input className="h-16 rounded-2xl bg-white/50 border-primary/10 focus:ring-primary/20" placeholder="PROJECT TYPE" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest uppercase text-primary ml-1">Message</label>
                  <Textarea className="min-h-[200px] rounded-3xl bg-white/50 border-primary/10 focus:ring-primary/20" placeholder="TELL ME ABOUT YOUR VISION..." />
                </div>
                <Button className="w-full h-20 rounded-full bg-primary text-white font-black tracking-widest text-lg uppercase shadow-2xl transition-transform hover:scale-105">
                  SEND COMMAND <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>

            {/* Direct Connect */}
            <div className="flex flex-col justify-center space-y-16">
              <div className="space-y-8">
                <h3 className="text-[10px] font-black tracking-[0.5em] uppercase text-primary">DIRECT CHANNELS</h3>
                <div className="space-y-6">
                  <ContactInfo icon={<Mail />} label="Email" value="arsalan@example.com" />
                  <ContactInfo icon={<MapPin />} label="Location" value="Faisalabad, Pakistan" />
                  <ContactInfo icon={<Phone />} label="Status" value="Available for Projects" />
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-[10px] font-black tracking-[0.5em] uppercase text-primary">ECOSYSTEM REACH</h3>
                <div className="flex flex-wrap gap-4">
                  <SocialCircle icon={<Youtube />} href="https://youtube.com/@VoicesOfHaram" />
                  <SocialCircle icon={<Instagram />} href="https://instagram.com/voicesofharam.official" />
                  <SocialCircle icon={<Github />} href="https://github.com/arsalan" />
                  <SocialCircle icon={<Linkedin />} href="#" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

function ContactInfo({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-6 group">
      <div className="w-16 h-16 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
        {React.cloneElement(icon, { className: "h-6 w-6" })}
      </div>
      <div>
        <p className="text-[8px] font-black tracking-widest text-muted-foreground uppercase">{label}</p>
        <p className="text-xl font-black tracking-tighter uppercase">{value}</p>
      </div>
    </div>
  )
}

function SocialCircle({ icon, href }: any) {
  return (
    <a href={href} target="_blank" className="w-20 h-20 rounded-full border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all hover:scale-110 shadow-xl">
      {React.cloneElement(icon, { className: "h-8 w-8" })}
    </a>
  )
}