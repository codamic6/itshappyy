
"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { Youtube as YoutubeIcon, Instagram, Users, TrendingUp, Twitter, Globe, Send, Mic2, Clock, Calendar, Sparkles, CloudRain, Star, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function SocialMediaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary font-inter overflow-x-hidden transition-colors duration-700">
      <Navbar />
      
      <main className="pb-20 space-y-40">
        {/* HERO SECTION */}
        <section id="social-hero" className="relative h-[60vh] md:h-[70vh] flex flex-col items-center justify-center px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="hidden md:block absolute inset-0">
              <Image 
                src="/hero.jpg" 
                alt="Social Hero PC" 
                fill 
                unoptimized
                className="object-cover"
                data-ai-hint="social hero"
              />
            </div>
            <div className="md:hidden absolute inset-0">
              <Image 
                src="/hero_mobile.jpg" 
                alt="Social Hero Mobile" 
                fill 
                unoptimized
                className="object-cover"
                data-ai-hint="social hero mobile"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-background" />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center space-y-4 pt-20"
          >
            <h1 className="text-7xl md:text-[140px] font-black tracking-tighter text-green-gradient uppercase leading-none glowing-text">Reach</h1>
            <p className="text-muted-foreground dark:text-white/70 text-sm md:text-base font-medium uppercase tracking-[0.4em]">Scaling Digital Icons 2026</p>
          </motion.div>
        </section>

        {/* YOUTUBE GLOBAL MILESTONE */}
        <section id="global-milestone-social" className="py-12 md:py-16 px-4 md:px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative p-8 md:p-16 rounded-[3rem] md:rounded-[4rem] bg-card border border-primary/10 shadow-2xl overflow-hidden glowing-card"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/[0.04] rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/[0.04] rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                <div className="space-y-8 text-center lg:text-left">
                  <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 font-black text-[10px] tracking-[0.3em] uppercase mx-auto lg:mx-0">
                    <YoutubeIcon className="h-4 w-4" /> GLOBAL MILESTONE 2026
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[105px] font-black tracking-tighter uppercase leading-[0.85] flex flex-col break-words">
                      <span className="text-red-600 dark:text-red-500">TOP 25%</span>
                      <span className="text-green-gradient text-nowrap">GLOBALLY</span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground dark:text-white/70 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                      Alhamdulillah, <span className="text-primary font-black italic underline decoration-primary/20">Voices of Haram</span> has secured its position in the top creators worldwide.
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-12 md:gap-20 pt-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 justify-center lg:justify-start">
                        <Users className="h-6 w-6 text-red-600" />
                        <span className="text-4xl md:text-5xl font-black text-red-600 dark:text-red-500">30.5K+</span>
                      </div>
                      <p className="text-[10px] font-black tracking-[0.2em] text-muted-foreground dark:text-white/40 uppercase">COMMUNITY MEMBERS</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 justify-center lg:justify-start">
                        <Globe className="h-6 w-6 text-primary" />
                        <span className="text-4xl md:text-5xl font-black text-primary">Global</span>
                      </div>
                      <p className="text-[10px] font-black tracking-[0.2em] text-muted-foreground dark:text-white/40 uppercase">CREATOR RANKING</p>
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
                    <div className="absolute inset-0 bg-red-600/[0.05] blur-[80px] rounded-full scale-150" />
                    <div className="relative p-12 bg-white/5 dark:bg-black/20 backdrop-blur-3xl border border-white/10 dark:border-white/5 rounded-[3rem] shadow-[0_0_40px_rgba(220,38,38,0.05)] flex items-center justify-center transition-all">
                      <svg viewBox="0 0 24 24" className="w-32 h-32 md:w-48 md:h-48 fill-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.25)] filter">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FACEBOOK HUB */}
        <section id="facebook-hub-social" className="max-w-7xl mx-auto px-6">
          <div className="bg-[#F0F2F5] dark:bg-blue-950/10 p-8 md:p-24 rounded-[3rem] md:rounded-[5rem] border border-[#1877F2]/10 dark:border-blue-900/20 relative overflow-hidden glowing-card">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
              <div className="space-y-10 text-center lg:text-left">
                <h2 className="text-[100px] md:text-[200px] font-black tracking-tighter text-[#1877F2] leading-none">FB</h2>
                <div className="space-y-4">
                  <p className="text-xl md:text-2xl text-muted-foreground dark:text-white/70 font-medium">
                    Community of <span className="text-[#1877F2] font-black">25,000+</span> dedicated members.
                  </p>
                  <p className="text-muted-foreground dark:text-white/50 text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
                    Sharing high-frequency updates and spiritual insights daily with a global audience.
                  </p>
                </div>
                <div className="flex justify-center lg:justify-start">
                  <Button asChild className="bg-[#1877F2] hover:bg-[#1565C0] rounded-full px-16 h-20 text-lg font-black tracking-widest uppercase shadow-2xl w-full sm:w-fit transition-all hover:scale-105">
                    <a href="https://facebook.com/voicesofharam.official" target="_blank">VISIT HUB</a>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <StatBox icon={<Users />} label="Members" count="25K+" fb />
                <StatBox icon={<Send />} label="Weekly Posts" count="100+" fb />
                <StatBox icon={<TrendingUp />} label="Impact" count="Extreme" fb />
                <StatBox icon={<Globe />} label="Scope" count="Global" fb />
              </div>
            </div>
          </div>
        </section>

        {/* MASJID UPDATES FEATURES */}
        <section id="social-features" className="max-w-7xl mx-auto px-6 space-y-20 pb-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-primary">Core Updates</h2>
            <p className="text-muted-foreground dark:text-white/50 font-medium uppercase tracking-[0.2em]">Real-time Spiritual Intelligence</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UpdateCard icon={<Mic2 />} title="Khateeb" desc="Designated Jummah Khateeb announcements for Masjid Al-Haram." />
            <UpdateCard icon={<Calendar />} title="Taraweeh" desc="Detailed schedule of Imams leading Taraweeh and Tahajjud." />
            <UpdateCard icon={<Clock />} title="Salah" desc="Weekly and daily Imam rosters for all five prayers." />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function StatBox({ icon, label, count, fb }: any) {
  return (
    <div className={cn(
      "p-8 rounded-[2.5rem] bg-white dark:bg-white/[0.05] shadow-xl border border-primary/5 flex flex-col items-center text-center space-y-4 transition-all hover:scale-105",
      fb && "dark:border-blue-900/20"
    )}>
      <div className={fb ? "text-[#1877F2]" : "text-primary"}>
        {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6" })}
      </div>
      <div className="space-y-1">
        <h4 className="text-2xl font-black tracking-tighter">{count}</h4>
        <p className="text-[9px] font-bold text-muted-foreground dark:text-white/40 uppercase tracking-widest">{label}</p>
      </div>
    </div>
  )
}

function UpdateCard({ icon, title, desc }: any) {
  return (
    <div className="p-12 rounded-[3.5rem] bg-card border border-primary/5 hover:border-primary/20 transition-all hover:shadow-2xl group text-center lg:text-left glowing-card">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform mx-auto lg:mx-0">
        {React.cloneElement(icon, { className: "h-7 w-7" })}
      </div>
      <h3 className="text-2xl font-black tracking-tighter uppercase mb-4 text-primary">{title}</h3>
      <p className="text-muted-foreground dark:text-white/60 text-sm font-medium leading-relaxed">{desc}</p>
    </div>
  )
}
