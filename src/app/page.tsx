
"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Trophy, Star, ShieldCheck, Zap, 
  GraduationCap, Award, Medal, BookOpen,
  Youtube, Users, TrendingUp, Instagram, Send, Globe,
  Mail, MapPin, Phone, Mic2, Clock, Calendar, CloudRain, Sparkles
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white text-foreground selection:bg-primary/20 selection:text-primary font-inter overflow-x-hidden">
      <Navbar />
      
      {/* Atmosphere */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] -right-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
      </div>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl w-full text-center space-y-4"
        >
          <div className="flex items-center justify-center overflow-visible px-4">
            <h1 className="text-[100px] md:text-[220px] lg:text-[280px] font-black tracking-tighter text-green-gradient uppercase italic leading-none whitespace-nowrap">
              HAPPY
            </h1>
          </div>
          <p className="text-sm md:text-base text-muted-foreground max-w-4xl mx-auto font-medium uppercase tracking-tight">
            WEB DEVELOPMENT | CONTENT CREATION | SOCIAL MEDIA MANAGEMENT | STUDENT | COLLEGE | ISLAM
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-10">
            <Link href="/projects">
              <Button size="lg" className="rounded-full px-12 bg-primary text-white h-14 font-black tracking-widest text-[10px] uppercase shadow-2xl transition-all hover:scale-105">EXPLORE WORK</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-full px-12 border-primary/20 h-14 text-primary font-black tracking-widest text-[10px] uppercase transition-all hover:scale-105">GET IN TOUCH</Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Identity Summary */}
      <section id="about" className="py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-primary">Identity</h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed font-medium">
              <p>My story is built on <span className="text-primary font-bold italic underline decoration-primary/20">Extreme Discipline</span>. In 2023, I completed <span className="text-primary font-bold">Hifz-e-Quran</span> at Masjid-e-Niyaz in just <span className="text-primary font-bold italic">1 Year 9 Months</span>.</p>
              <p>While standard revision takes 6 months, I completed mine in exactly <span className="text-primary font-bold italic">1 Month</span>.</p>
            </div>
            <Link href="/about">
              <Button variant="link" className="p-0 text-primary font-black tracking-widest text-[10px] uppercase group">
                READ THE FULL STORY <span className="ml-2 transition-transform group-hover:translate-x-2">→</span>
              </Button>
            </Link>
          </div>
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-primary/10">
            <Image src="https://picsum.photos/seed/happy-identity/800/800" alt="Identity" fill className="object-cover" />
            <div className="absolute inset-0 bg-primary/10" />
          </div>
        </div>
      </section>

      {/* Features (Intel) Summary */}
      <section className="py-40 px-6 bg-primary/[0.02]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-none grid grid-cols-2 gap-4">
            <FeatureIconBox icon={<Mic2 />} label="Khateeb Intel" />
            <FeatureIconBox icon={<Clock />} label="Salah Logs" className="mt-8" />
            <FeatureIconBox icon={<Calendar />} label="Imam Roster" />
            <FeatureIconBox icon={<CloudRain />} label="Live Moments" className="mt-8" />
          </div>
          <div className="space-y-10 text-center lg:text-left">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-primary leading-[0.9]">Features</h2>
            <p className="text-muted-foreground text-xl font-medium">Real-time Khutbah schedules, Imam rosters, Salah updates, and live atmospheric moments from the Two Holy Mosques.</p>
            <Link href="/social-media">
              <Button size="lg" className="rounded-full px-12 bg-primary text-white font-black tracking-widest text-[10px] uppercase transition-all hover:scale-105">EXPLORE INTEL</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Academy Summary */}
      <section id="education" className="py-40 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-primary">Academy</h2>
            <p className="text-muted-foreground font-medium uppercase tracking-[0.2em]">Consistency Over A Decade</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <EduCard icon={<GraduationCap />} year="2026" title="ICS - 11th" institution="Punjab College" desc="Focus on Advanced Logic & Data Structures." />
            <EduCard icon={<Award />} year="2025" title="Matric - 1st" institution="Al-Faisal School" desc="1st Position: 1165/1200 marks (Roll 484655)." />
            <EduCard icon={<Medal />} year="2024" title="9th - 3rd" institution="FSD Board" desc="3rd Position in FSD Board (Roll 190511)." />
          </div>
          <div className="text-center pt-10">
            <Link href="/education">
              <Button size="lg" variant="outline" className="rounded-full px-12 border-primary/20 h-14 text-primary font-black tracking-widest text-[10px] uppercase transition-all hover:scale-105">VIEW TIMELINE</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reach Summary */}
      <section id="social-media" className="py-40 space-y-40">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 font-black text-[10px] tracking-[0.3em] uppercase mx-auto lg:mx-0">
                <Youtube className="h-4 w-4" /> Voices of Haram
              </div>
              <h3 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">Reach</h3>
              <p className="text-muted-foreground text-xl font-medium">Bridging engineering with spiritual tradition since 2025.</p>
              <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-16 h-20 text-lg font-black tracking-widest uppercase w-full sm:w-fit shadow-2xl">
                <a href="https://youtube.com/@VoicesOfHaram" target="_blank">VISIT</a>
              </Button>
            </div>
            <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl bg-black">
              <iframe className="w-full h-full" src="https://www.youtube.com/embed/VOA8Gc44ZIE" title="VOH" frameBorder="0" allowFullScreen></iframe>
            </div>
          </div>

          <div className="bg-[#F0F2F5] p-12 md:p-24 rounded-[5rem] border border-[#1877F2]/10 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10 text-center lg:text-left">
              <div className="space-y-8">
                <h3 className="text-[100px] md:text-[180px] font-black tracking-tighter text-[#1877F2] leading-none">FB</h3>
                <p className="text-2xl text-muted-foreground font-medium max-w-md mx-auto lg:mx-0">Spiritual community of <span className="text-[#1877F2] font-black">25,000+</span> members.</p>
                <div className="flex justify-center lg:justify-start">
                  <Button asChild className="bg-[#1877F2] hover:bg-[#1565C0] rounded-full px-16 h-20 text-lg font-black tracking-widest uppercase shadow-2xl w-fit">
                    <a href="https://facebook.com/voicesofharam.official" target="_blank">VISIT</a>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <MiniStat count="25K+" label="MEMBERS" />
                <MiniStat count="Global" label="REACH" />
              </div>
            </div>
          </div>
        </div>

        <div className="py-40 bg-primary/5 text-center space-y-16">
          <h2 className="text-6xl md:text-[120px] font-black tracking-tighter text-green-gradient uppercase leading-none">Waleed <br/> Al-Shamsan</h2>
          <div className="relative inline-block">
             <div className="w-48 h-48 md:w-80 md:h-80 rounded-[3rem] p-2 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rotate-6 mx-auto">
                <div className="w-full h-full rounded-[2.5rem] border-8 border-white overflow-hidden relative -rotate-6">
                  <Image src="https://picsum.photos/seed/waleed-pro/600/600" alt="Sheikh Waleed" fill className="object-cover" />
                </div>
             </div>
          </div>
          <div className="space-y-6 px-4">
            <p className="text-xl md:text-3xl font-black tracking-widest text-primary uppercase max-w-[90vw] mx-auto truncate">@sheikh_waleed_al_shamsan</p>
            <div className="flex justify-center">
              <Button asChild variant="outline" className="rounded-full px-12 border-primary/20 h-14 text-primary font-black tracking-widest text-[10px] uppercase transition-all hover:scale-105 w-fit">
                <a href="https://instagram.com/sheikh_waleed_al_shamsan" target="_blank">VISIT</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Summary */}
      <section id="contact" className="py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="crystal-panel p-10 md:p-16 rounded-[4rem] space-y-10">
            <h2 className="text-4xl font-black tracking-tighter uppercase">Connect</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="NAME" className="h-16 rounded-2xl border-primary/10" />
                <Input placeholder="EMAIL" className="h-16 rounded-2xl border-primary/10" />
              </div>
              <Textarea placeholder="TELL ME ABOUT YOUR VISION..." className="min-h-[200px] rounded-3xl border-primary/10" />
              <Button className="w-full h-20 rounded-full bg-primary text-white font-black tracking-widest uppercase">SEND</Button>
            </form>
          </div>
          <div className="flex flex-col justify-center space-y-12">
            <ContactInfo icon={<Mail />} label="EMAIL" value="arsalan@example.com" />
            <ContactInfo icon={<MapPin />} label="LOCATION" value="Faisalabad, PK" />
            <div className="pt-10 flex gap-4">
              <Link href="/contact">
                <Button size="lg" className="rounded-full px-12 bg-primary text-white font-black tracking-widest text-[10px] uppercase">ALL CHANNELS</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 border-t border-primary/5 text-center">
        <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">&copy; 2026 HAPPY | ALL RIGHTS RESERVED</p>
      </footer>
    </div>
  )
}

function FeatureIconBox({ icon, label, className }: any) {
  return (
    <div className={cn("p-8 rounded-[2.5rem] bg-white border border-primary/5 shadow-xl space-y-4", className)}>
      <div className="text-primary h-8 w-8">{icon}</div>
      <h4 className="text-[10px] font-black tracking-widest uppercase text-primary">{label}</h4>
    </div>
  )
}

function EduCard({ icon, year, title, institution, desc }: any) {
  return (
    <div className="p-10 rounded-[3rem] bg-white border border-primary/5 hover:border-primary/20 transition-all hover:shadow-xl group">
      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-black text-[9px] mb-6">{year}</span>
      <div className="flex items-center gap-3 mb-4">
        <div className="text-primary">{icon}</div>
        <h3 className="text-2xl font-black tracking-tighter uppercase">{title}</h3>
      </div>
      <p className="text-primary font-bold text-[9px] tracking-widest uppercase mb-4">{institution}</p>
      <p className="text-muted-foreground text-sm font-medium leading-relaxed">{desc}</p>
    </div>
  )
}

function MiniStat({ count, label }: any) {
  return (
    <div className="p-8 rounded-[2rem] bg-white shadow-xl flex flex-col items-center justify-center text-center space-y-2">
      <span className="text-3xl font-black text-[#1877F2] tracking-tighter">{count}</span>
      <span className="text-[8px] font-black tracking-widest text-muted-foreground uppercase">{label}</span>
    </div>
  )
}

function ContactInfo({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-6">
      <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">{icon}</div>
      <div>
        <p className="text-[8px] font-black tracking-widest text-muted-foreground uppercase">{label}</p>
        <p className="text-xl font-black tracking-tighter uppercase">{value}</p>
      </div>
    </div>
  )
}
