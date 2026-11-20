
"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { Youtube as YoutubeIcon, Instagram, Users, TrendingUp, Globe, Send, Mic2, Clock, Calendar, Sparkles, Instagram as InstagramIcon, MessageSquare, Twitter, Radio, Star, CloudRain } from 'lucide-react'
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
                priority
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
                priority
              />
            </div>
            {/* Subtle Bottom Fade Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center space-y-4 pt-20"
          >
            <h1 className="text-7xl md:text-[140px] font-black tracking-tighter text-green-gradient uppercase leading-none glowing-text drop-shadow-2xl">Reach</h1>
            <p className="text-muted-foreground dark:text-white/70 text-sm md:text-base font-medium uppercase tracking-[0.4em]">Scaling Digital Icons 2026</p>
          </motion.div>
        </section>

        {/* 1. ACHIEVEMENT SECTION */}
        <section id="global-milestone-social" className="py-12 md:py-16 px-4 md:px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative p-8 md:p-16 rounded-[3.5rem] bg-card border border-primary/10 shadow-2xl overflow-hidden glowing-card"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="space-y-8 text-center lg:text-left">
                  <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 font-black text-[10px] tracking-[0.3em] uppercase mx-auto lg:mx-0">
                    <TrendingUp className="h-4 w-4" /> GLOBAL MILESTONE 2026
                  </div>
                  <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[105px] font-black tracking-tighter uppercase leading-[0.85] flex flex-col">
                    <span className="text-red-600 dark:text-red-500">TOP 25%</span>
                    <span className="text-green-gradient">GLOBALLY</span>
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground dark:text-white/70 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                    Alhamdulillah, <span className="text-primary font-black italic underline decoration-primary/20">Voices of Haram</span> is recognized as a high-impact global creator.
                  </p>
                </div>
                <div className="relative w-full max-w-[400px] mx-auto lg:ml-auto lg:mr-0 py-10">
                  <div className="relative p-12 bg-white/5 dark:bg-black/20 backdrop-blur-3xl border border-white/10 dark:border-white/5 rounded-[3rem] flex items-center justify-center shadow-2xl">
                    <Sparkles className="w-32 h-32 md:w-48 md:h-48 text-primary drop-shadow-[0_0_15px_rgba(16,185,129,0.25)]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. CORE FEATURES (6 CARD GRID AS PER SAMPLE) */}
        <section id="social-features" className="max-w-7xl mx-auto px-6 space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-primary glowing-text">FEATURES</h2>
            <p className="text-muted-foreground dark:text-white/50 font-medium max-w-2xl mx-auto leading-relaxed uppercase tracking-[0.1em]">
              Real-time updates from the Two Holy Mosques, bridging millions with the sacred heart of Islam.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <UpdateCard icon={<Mic2 />} title="KHATEEB" desc="Designated Jummah Khateeb announcements for Masjid Al-Haram & Masjid An-Nabawi." />
            <UpdateCard icon={<Calendar />} title="TARAWEEH" desc="Detailed schedule of Imams leading Taraweeh and Tahajjud during Ramadan." />
            <UpdateCard icon={<Clock />} title="SALAH" desc="Weekly and daily Imam rosters for all five prayers, ensuring global connection." />
            <UpdateCard icon={<Star />} title="SPECIAL" desc="Updates on Istisqa, Khusoof, and Eid prayers with designated lead Imams." />
            <UpdateCard icon={<CloudRain />} title="WEATHER" desc="Live coverage of rain and atmospheric spiritual moments from the Haramain." />
            <UpdateCard icon={<Sparkles />} title="MOMENTS" desc="Curated highlights of the most spiritual events occurring within the holy precincts." />
          </div>
        </section>

        {/* 3. YOUTUBE SECTION */}
        <section id="youtube-section" className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 order-2 lg:order-none text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 font-black text-[10px] tracking-[0.3em] uppercase mx-auto lg:mx-0">
                <YoutubeIcon className="h-4 w-4" /> Voices of Haram
              </div>
              <h2 className="text-6xl md:text-[100px] font-black tracking-tighter uppercase leading-[0.9] text-red-600 dark:text-red-500">Youtube</h2>
              <div className="grid grid-cols-2 gap-10 pt-6">
                <div className="space-y-1">
                  <span className="text-5xl font-black tracking-tighter text-red-600 dark:text-red-500">30.5K+</span>
                  <p className="text-[10px] font-black tracking-widest text-muted-foreground dark:text-white/40 uppercase">Subscribers</p>
                </div>
                <div className="space-y-1">
                  <span className="text-5xl font-black tracking-tighter text-red-600 dark:text-red-500">5M+</span>
                  <p className="text-[10px] font-black tracking-widest text-muted-foreground dark:text-white/40 uppercase">Total Views</p>
                </div>
              </div>
              <div className="flex justify-center lg:justify-start pt-10">
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-16 h-20 text-lg font-black tracking-widest uppercase shadow-2xl w-fit transition-transform hover:scale-105">
                  <a href="https://youtube.com/@VoicesOfHaram" target="_blank">VISIT CHANNEL</a>
                </Button>
              </div>
            </div>
            <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-red-50 dark:border-red-900/20 bg-black glowing-card">
              <iframe 
                className="w-full h-full" 
                src="https://www.youtube.com/embed/VOA8Gc44ZIE" 
                title="VOH YouTube" 
                frameBorder="0" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

        {/* 4. FACEBOOK HUB */}
        <section id="facebook-hub-social" className="max-w-7xl mx-auto px-6">
          <div className="bg-[#F0F2F5] dark:bg-blue-950/10 p-8 md:p-24 rounded-[3.5rem] border border-[#1877F2]/10 dark:border-blue-900/20 relative overflow-hidden glowing-card">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
              <div className="space-y-10 text-center lg:text-left">
                <h2 className="text-[100px] md:text-[200px] font-black tracking-tighter text-[#1877F2] leading-none">FB</h2>
                <div className="space-y-4">
                  <p className="text-xl md:text-2xl text-muted-foreground dark:text-white/70 font-medium">
                    Community of <span className="text-[#1877F2] font-black">25,000+</span> dedicated members.
                  </p>
                </div>
                <div className="flex justify-center lg:justify-start">
                  <Button asChild className="bg-[#1877F2] hover:bg-[#1565C0] rounded-full px-16 h-20 text-lg font-black tracking-widest uppercase shadow-2xl w-full sm:w-fit transition-transform hover:scale-105">
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

        {/* 5. OTHERS SECTION (WITH UPDATED LINKS) */}
        <section id="others-social" className="max-w-7xl mx-auto px-6 space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-primary glowing-text">Other Platforms</h2>
            <p className="text-muted-foreground dark:text-white/50 font-medium uppercase tracking-[0.2em]">Growing Ecosystem 2026</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <OtherSocialCard icon={<MessageSquare />} label="Threads" count="6.5K+" color="text-white bg-black dark:bg-white/10" href="https://www.threads.net/@voicesofharam.official" />
            <OtherSocialCard icon={<InstagramIcon />} label="Instagram" count="1K+" color="text-pink-600 bg-pink-50 dark:bg-pink-900/20" href="https://www.instagram.com/voicesofharam.official" />
            <OtherSocialCard icon={<Radio />} label="TikTok" count="600+" color="text-cyan-600 bg-cyan-50 dark:bg-cyan-900/20" href="https://www.tiktok.com/@voicesofharam.official" />
          </div>
        </section>

        {/* 6. SPECIAL MENTION: @sheikh_waleed_al_shamsan (RESPONSIVE FIX) */}
        <section id="sheikh-mention" className="max-w-7xl mx-auto px-6 pb-20">
          <div className="p-8 md:p-20 rounded-[3rem] md:rounded-[4rem] bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 relative overflow-hidden glowing-card">
            <div className="absolute top-0 right-0 p-10 opacity-10 hidden md:block">
              <InstagramIcon className="w-40 h-40" />
            </div>
            <div className="relative z-10 flex flex-col items-center text-center space-y-8">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <InstagramIcon className="w-10 h-10 md:w-12 md:h-12" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl md:text-5xl font-black tracking-tighter uppercase text-primary break-all">@sheikh_waleed_al_shamsan</h3>
              </div>
              <div className="flex items-center gap-10">
                <div className="text-center">
                  <span className="text-4xl md:text-5xl font-black text-primary">8000+</span>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2">Followers</p>
                </div>
              </div>
              <Button asChild className="rounded-full px-12 h-16 bg-primary text-white font-black uppercase tracking-widest shadow-2xl transition-transform hover:scale-105 w-full sm:w-fit">
                <a href="https://instagram.com/sheikh_waleed_al_shamsan" target="_blank">FOLLOW PAGE</a>
              </Button>
            </div>
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
    <div className="p-10 rounded-[3rem] bg-card border border-primary/5 hover:border-primary/20 transition-all hover:shadow-2xl group flex flex-col items-center text-center lg:items-start lg:text-left glowing-card">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
        {React.cloneElement(icon, { className: "h-7 w-7" })}
      </div>
      <h3 className="text-2xl font-black tracking-tighter uppercase mb-4 text-primary">{title}</h3>
      <p className="text-muted-foreground dark:text-white/60 text-sm font-medium leading-relaxed">{desc}</p>
    </div>
  )
}

function OtherSocialCard({ icon, label, count, color, href }: any) {
  return (
    <a href={href} target="_blank" className="p-10 rounded-[3.5rem] bg-card border border-primary/5 hover:border-primary/20 transition-all hover:shadow-xl text-center space-y-6 group glowing-card">
      <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center mx-auto transition-transform group-hover:rotate-12", color)}>
        {React.cloneElement(icon, { className: "h-7 w-7" })}
      </div>
      <div className="space-y-1">
        <h4 className="text-4xl font-black tracking-tighter text-primary">{count}</h4>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
      </div>
    </a>
  )
}
