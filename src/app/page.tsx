
"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Trophy, Star, ShieldCheck, Zap, 
  GraduationCap, Award, Medal, BookOpen,
  Youtube as YoutubeIcon, Users, Globe, Play
} from 'lucide-react'

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white text-foreground selection:bg-primary/20 selection:text-primary font-inter overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="hidden md:block absolute inset-0">
            <Image 
              src="/hero.png" 
              alt="Hero Background PC" 
              fill 
              className="object-cover object-center opacity-50"
              data-ai-hint="main hero"
              priority
            />
          </div>
          <div className="md:hidden absolute inset-0">
            <Image 
              src="/hero_mobile.png" 
              alt="Hero Background Mobile" 
              fill 
              className="object-cover object-center opacity-50"
              data-ai-hint="main hero mobile"
              priority
            />
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-6xl w-full text-center space-y-4 pt-20"
        >
          <div className="flex items-center justify-center overflow-visible px-4">
            <h1 className="text-[60px] sm:text-[100px] md:text-[220px] lg:text-[280px] font-black tracking-tighter text-green-gradient uppercase italic leading-none break-all sm:whitespace-nowrap">
              HAPPY
            </h1>
          </div>
          <p className="text-[10px] sm:text-sm md:text-base text-muted-foreground max-w-4xl mx-auto font-medium uppercase tracking-[0.1em] px-4">
            WEB DEVELOPMENT | CONTENT CREATION | SOCIAL MEDIA MANAGEMENT | STUDENT | COLLEGE | ISLAM
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-10">
            <Link href="/projects">
              <Button size="lg" className="rounded-full px-12 bg-primary text-white h-14 font-black tracking-widest text-[10px] uppercase shadow-2xl transition-all hover:scale-105">VISIT</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-full px-12 border-primary/20 h-14 text-primary font-black tracking-widest text-[10px] uppercase transition-all hover:scale-105">VISIT</Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* GLOBAL ACHIEVEMENT SECTION - STATIC NEON UI */}
      <section id="global-milestone-home" className="py-12 md:py-16 px-4 md:px-6 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-8 md:p-16 rounded-[3rem] md:rounded-[4rem] bg-white border border-primary/10 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/[0.04] rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/[0.04] rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
              <div className="space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 font-black text-[10px] tracking-[0.3em] uppercase mx-auto lg:mx-0">
                  <YoutubeIcon className="h-4 w-4" /> GLOBAL MILESTONE 2026
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[95px] font-black tracking-tighter uppercase leading-[0.85] flex flex-col break-words">
                    <span className="text-red-600">TOP 25%</span>
                    <span className="text-green-gradient">GLOBALLY</span>
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                    Alhamdulillah, <span className="text-primary font-black italic underline decoration-primary/20">Voices of Haram</span> has secured its position in the top creators worldwide.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-12 md:gap-20 pt-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                      <Users className="h-6 w-6 text-red-600" />
                      <span className="text-4xl md:text-5xl font-black text-red-600">30.5K+</span>
                    </div>
                    <p className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">COMMUNITY MEMBERS</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                      <Globe className="h-6 w-6 text-primary" />
                      <span className="text-4xl md:text-5xl font-black text-primary">Global</span>
                    </div>
                    <p className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">CREATOR RANKING</p>
                  </div>
                </div>

                <div className="pt-4 flex justify-center lg:justify-start">
                  <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-12 h-16 text-lg font-black tracking-widest uppercase shadow-2xl w-full sm:w-fit transition-all hover:scale-105">
                    <a href="https://youtube.com/@VoicesOfHaram" target="_blank">VISIT CHANNEL</a>
                  </Button>
                </div>
              </div>

              <div className="relative w-full max-w-[400px] mx-auto lg:ml-auto lg:mr-0 flex items-center justify-center py-10">
                <div className="relative group">
                  <div className="absolute inset-0 bg-red-600/[0.05] blur-[80px] rounded-full scale-150 animate-pulse" />
                  <div className="relative p-12 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-[0_0_40px_rgba(220,38,38,0.05)] flex items-center justify-center transition-all">
                    <svg viewBox="0 0 24 24" className="w-32 h-32 md:w-48 md:h-48 fill-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)] filter transition-all duration-500 group-hover:scale-105">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <div className="absolute -top-4 -right-4 bg-white border border-red-50 shadow-xl rounded-full p-3 animate-bounce">
                      <Star className="h-5 w-5 text-red-600 fill-red-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 text-center lg:text-left">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-primary">About</h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed font-medium">
              <p>My story is built on <span className="text-primary font-bold italic underline decoration-primary/20">Extreme Discipline</span>. In 2023, I completed <span className="text-primary font-bold">Hifz-e-Quran</span> at Masjid-e-Niyaz in just <span className="text-primary font-bold italic">1 Year 9 Months</span>.</p>
              <p>While standard revision takes 6 months, I completed mine in exactly <span className="text-primary font-bold italic">1 Month</span>.</p>
            </div>
            <div className="pt-10">
              <Link href="/about">
                <Button variant="link" className="p-0 text-primary font-black tracking-widest text-[10px] uppercase group">
                  VISIT <span className="ml-2 transition-transform group-hover:translate-x-2">→</span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-primary/10">
            <Image src="/my_avt.png" alt="About Profile" fill className="object-cover" data-ai-hint="portrait professional" />
            <div className="absolute inset-0 bg-primary/10" />
          </div>
        </div>
      </section>

      {/* Academy Highlights */}
      <section id="education-home" className="py-40 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-primary">Academy</h2>
            <p className="text-muted-foreground font-medium uppercase tracking-[0.2em]">Excellence Over A Decade</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <EduCard icon={<GraduationCap />} year="2026" title="ICS - 11th" institution="Punjab College" desc="Advanced Logic and Digital Architectures." />
            <EduCard icon={<Award />} year="2025" title="Matric - 1st" institution="Al-Faisal School" desc="1st Position: 1165/1200 marks. Board Record." />
            <EduCard icon={<Medal />} year="2024" title="9th Grade" institution="Al-Faisal School" desc="Scored 525/545 marks. Pure Science focus." />
          </div>
          <div className="text-center pt-10">
            <Link href="/education">
              <Button size="lg" variant="outline" className="rounded-full px-12 border-primary/20 h-14 text-primary font-black tracking-widest text-[10px] uppercase transition-all hover:scale-105">VISIT</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
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
