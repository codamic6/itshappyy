
"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { Trophy, Star, ShieldCheck, Zap, Youtube as YoutubeIcon, Users, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-foreground selection:bg-primary/20 selection:text-primary font-inter">
      <Navbar />
      
      <main className="pb-20">
        {/* Dedicated Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] flex flex-col items-center justify-center px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* PC Background */}
            <div className="hidden md:block absolute inset-0">
              <Image 
                src="/hero.png" 
                alt="About Hero PC" 
                fill 
                className="object-cover opacity-50"
                data-ai-hint="about hero"
                priority
              />
            </div>
            {/* Mobile Background */}
            <div className="md:hidden absolute inset-0">
              <Image 
                src="/hero_mobile.png" 
                alt="About Hero Mobile" 
                fill 
                className="object-cover opacity-50"
                data-ai-hint="about hero mobile"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white" />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center space-y-4 pt-20"
          >
            <h1 className="text-7xl md:text-[140px] font-black tracking-tighter text-green-gradient uppercase leading-none">About</h1>
            <p className="text-muted-foreground text-sm md:text-base font-medium uppercase tracking-[0.4em]">Extreme Discipline</p>
          </motion.div>
        </section>

        {/* GLOBAL ACHIEVEMENT SECTION - INTEGRATED 2026 */}
        <section className="py-12 md:py-24 px-4 md:px-6 relative overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative p-8 md:p-20 rounded-[3rem] md:rounded-[4rem] bg-white border border-primary/10 shadow-2xl overflow-hidden"
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

                  <div className="pt-8 flex justify-center lg:justify-start">
                    <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-12 h-16 text-lg font-black tracking-widest uppercase shadow-2xl w-full sm:w-fit transition-all hover:scale-105">
                      <a href="https://youtube.com/@VoicesOfHaram" target="_blank">VISIT CHANNEL</a>
                    </Button>
                  </div>
                </div>

                <div className="relative w-full max-w-[400px] mx-auto lg:ml-auto lg:mr-0 flex items-center justify-center py-10">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-red-600/[0.05] blur-[80px] rounded-full scale-150 animate-pulse" />
                    <div className="absolute inset-0 bg-primary/[0.03] blur-[50px] rounded-full scale-125" />
                    <div className="relative p-12 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-[0_0_40px_rgba(220,38,38,0.05)] flex items-center justify-center transition-all group-hover:shadow-[0_0_60px_rgba(220,38,38,0.1)]">
                      <svg viewBox="0 0 24 24" className="w-32 h-32 md:w-48 md:h-48 fill-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)] filter transition-all group-hover:scale-105">
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

        <div className="max-w-7xl mx-auto px-6 space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-primary">Identity</h2>
              <div className="space-y-6 text-muted-foreground text-xl leading-relaxed font-medium">
                <p>My story is built on <span className="text-primary font-bold italic underline decoration-primary/20">Extreme Discipline</span>. I don't believe in average effort; I believe in breaking records through focus.</p>
                <p>In 2023, I completed <span className="text-primary font-bold">Hifz-e-Quran</span> at Masjid-e-Niyaz in just <span className="text-primary font-bold italic">1 Year 9 Months</span>.</p>
                <p>While the standard revision period is 6 months, I completed mine in exactly <span className="text-primary font-bold italic">1 Month</span>.</p>
              </div>
            </div>
            <div className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl border border-primary/10">
              <Image src="/my_avt.png" alt="About Arsalan" fill className="object-cover" data-ai-hint="portrait professional" />
              <div className="absolute inset-0 bg-primary/10" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard icon={<Trophy />} title="RECORD" desc="Hifz revision 6x faster than average." />
            <ValueCard icon={<Star />} title="BRAND" desc="Voices of Haram established 2026." />
            <ValueCard icon={<ShieldCheck />} title="LOGIC" desc="High-performance brand architecting." />
            <ValueCard icon={<Zap />} title="SPEED" desc="Zero to global reach in record time." />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function ValueCard({ icon, title, desc }: any) {
  return (
    <div className="p-10 rounded-[3rem] bg-white border border-primary/5 hover:border-primary/20 transition-all hover:shadow-xl group">
      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
        {React.cloneElement(icon, { className: "h-6 w-6" })}
      </div>
      <h3 className="text-xs font-black tracking-[0.2em] uppercase mb-2 text-primary">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  )
}
