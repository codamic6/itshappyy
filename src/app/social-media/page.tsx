
"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import Image from 'next/image'
import { Youtube, Instagram, Users, TrendingUp, Facebook, Twitter, Globe, Send, Mic2, Clock, Calendar, Sparkles, CloudRain, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function SocialMediaPage() {
  return (
    <div className="min-h-screen bg-white text-foreground selection:bg-primary/20 selection:text-primary font-inter overflow-x-hidden">
      <Navbar />
      
      <main className="pt-40 pb-20 space-y-40">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-green-gradient uppercase">Global Footprint</h1>
          <p className="text-muted-foreground text-xl font-medium uppercase tracking-[0.4em]">Scaling Digital Icons</p>
        </div>

        {/* Haramain Live Ecosystem */}
        <section className="max-w-7xl mx-auto px-6 space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-primary">Haramain Intel</h2>
            <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-3xl mx-auto">
              We provide the most comprehensive real-time updates from the Two Holy Mosques, bridging millions with the sacred heart of Islam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UpdateCard 
              icon={<Mic2 />} 
              title="Jummah Khateeb" 
              desc="Real-time announcements of the designated Khateeb for Friday prayers at Masjid Al-Haram and Masjid An-Nabawi."
            />
            <UpdateCard 
              icon={<Calendar />} 
              title="Taraweeh Schedule" 
              desc="Detailed rosters of Imams leading Taraweeh and Tahajjud prayers during the blessed month of Ramadan."
            />
            <UpdateCard 
              icon={<Clock />} 
              title="Salah Schedules" 
              desc="Weekly and daily Imam schedules for all five prayers, ensuring global followers stay connected."
            />
            <UpdateCard 
              icon={<Star />} 
              title="Special Prayers" 
              desc="Official updates on Istisqa (Rain), Khusoof (Eclipse), and Eid prayers with designated Imams."
            />
            <UpdateCard 
              icon={<CloudRain />} 
              title="Weather Updates" 
              desc="Live coverage of rain and atmospheric moments from the Haramain, captured in high definition."
            />
            <UpdateCard 
              icon={<Sparkles />} 
              title="Haramain Moments" 
              desc="Curated highlights of the most spiritual and historic moments occurring within the holy precincts."
            />
          </div>
        </section>

        {/* Voices of Haram Detailed */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 order-2 lg:order-none text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 font-black text-[10px] tracking-[0.3em] uppercase mx-auto lg:mx-0">
                <Youtube className="h-4 w-4" />
                ESTABLISHED 14 JUNE 2025
              </div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">Voices of <br/> Haram</h2>
              <p className="text-muted-foreground text-xl leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                A premier digital ecosystem dedicated to global recitations and spiritual content. We bridge high-end engineering with sacred tradition.
              </p>
              
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-1">
                  <span className="text-5xl font-black tracking-tighter text-red-600">30K+</span>
                  <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">Subscribers</p>
                </div>
                <div className="space-y-1">
                  <span className="text-5xl font-black tracking-tighter text-red-600">5M+</span>
                  <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">Impressions</p>
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-16 h-20 text-lg font-black tracking-widest uppercase shadow-2xl shadow-red-500/20 w-fit">
                  <a href="https://youtube.com/@VoicesOfHaram" target="_blank">VISIT</a>
                </Button>
              </div>
            </div>

            <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-red-50 bg-black group">
              <iframe 
                className="w-full h-full" 
                src="https://www.youtube.com/embed/VOA8Gc44ZIE" 
                title="VOH Main" 
                frameBorder="0" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

        {/* FB Detailed */}
        <section className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-[#F0F2F5] p-16 md:p-24 rounded-[5rem] border border-[#1877F2]/10 relative overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1877F2]/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
              <div className="space-y-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] font-black text-[10px] tracking-[0.3em] uppercase mx-auto lg:mx-0">
                  Digital Hub
                </div>
                <h2 className="text-[120px] md:text-[200px] font-black tracking-tighter text-[#1877F2] leading-none">FB</h2>
                <p className="text-2xl text-muted-foreground/80 font-medium max-w-md mx-auto lg:mx-0">
                  A spiritual community of <span className="text-[#1877F2] font-black">25,000+</span> individuals united through technology.
                </p>
                <div className="flex justify-center lg:justify-start">
                  <Button asChild className="bg-[#1877F2] hover:bg-[#1565C0] rounded-full px-16 h-20 text-lg font-black tracking-widest uppercase shadow-2xl shadow-[#1877F2]/20 w-fit">
                    <a href="https://facebook.com/voicesofharam.official" target="_blank">VISIT</a>
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <StatBox icon={<Users />} label="Members" count="25K+" />
                <StatBox icon={<Send />} label="Weekly Posts" count="100+" />
                <StatBox icon={<TrendingUp />} label="Engagement" count="High" />
                <StatBox icon={<Globe />} label="Reach" count="Global" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Multi-Platform Reach */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <ReachCard icon={<Instagram />} label="Instagram" handle="@voicesofharam.official" count="1K+" color="text-[#E1306C]" href="https://instagram.com/voicesofharam.official" />
          <ReachCard icon={<TrendingUp />} label="TikTok" handle="@voicesofharam.official" count="600+" color="text-primary" href="https://tiktok.com/@voicesofharam.official" />
          <ReachCard icon={<Twitter />} label="Threads" handle="@voicesofharam.official" count="6.5K+" color="text-[#7C3AED]" href="https://threads.net/@voicesofharam.official" />
        </section>

        {/* Sheikh Waleed Section */}
        <section className="py-40 bg-primary/5">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
            <h2 className="text-6xl md:text-[140px] font-black tracking-tighter text-green-gradient uppercase leading-none">Sheikh Waleed <br/> Al-Shamsan</h2>
            <div className="relative inline-block group">
              <div className="w-64 h-64 md:w-96 md:h-96 rounded-[4rem] p-2 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] shadow-3xl rotate-6 group-hover:rotate-0 transition-transform">
                <div className="w-full h-full rounded-[3.5rem] border-[10px] border-white overflow-hidden relative -rotate-6 group-hover:rotate-0 transition-transform">
                  <Image src="https://picsum.photos/seed/waleed-pro/800/800" alt="Sheikh Waleed" fill className="object-cover" />
                </div>
              </div>
            </div>
            <div className="space-y-10 px-4">
              <div className="inline-flex items-center gap-4 px-6 md:px-10 py-4 rounded-full bg-white shadow-2xl border border-pink-100 max-w-full mx-auto">
                <Instagram className="h-6 md:h-8 w-6 md:w-8 text-[#E1306C] shrink-0" />
                <span className="text-xl md:text-3xl font-black tracking-tighter truncate">7,000+ Followers</span>
              </div>
              <p className="text-xl md:text-3xl font-black tracking-widest text-primary uppercase max-w-[90vw] mx-auto truncate">@sheikh_waleed_al_shamsan</p>
              <div className="flex justify-center">
                <Button asChild variant="outline" className="rounded-full px-16 h-20 border-pink-200 text-pink-600 font-black tracking-widest text-sm uppercase transition-all hover:scale-105 w-fit">
                  <a href="https://instagram.com/sheikh_waleed_al_shamsan" target="_blank">VISIT</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function UpdateCard({ icon, title, desc }: any) {
  return (
    <div className="p-10 rounded-[3rem] bg-white border border-primary/5 hover:border-primary/20 transition-all hover:shadow-2xl group text-center lg:text-left">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform mx-auto lg:mx-0">
        {React.cloneElement(icon, { className: "h-6 w-6" })}
      </div>
      <h3 className="text-xl font-black tracking-tighter uppercase mb-4 text-primary">{title}</h3>
      <p className="text-muted-foreground text-sm font-medium leading-relaxed">{desc}</p>
    </div>
  )
}

function StatBox({ icon, label, count }: any) {
  return (
    <div className="p-6 md:p-8 rounded-[2.5rem] bg-white shadow-xl border border-primary/5 flex flex-col items-center text-center space-y-4">
      <div className="text-[#1877F2]">{React.cloneElement(icon, { className: "h-6 w-6 md:h-8 md:w-8" })}</div>
      <div className="space-y-1">
        <h4 className="text-xl md:text-2xl font-black tracking-tighter">{count}</h4>
        <p className="text-[7px] md:text-[8px] font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
      </div>
    </div>
  )
}

function ReachCard({ icon, label, handle, count, color, href }: any) {
  return (
    <a href={href} target="_blank" className="p-10 md:p-12 rounded-[4rem] bg-white border border-primary/5 hover:border-primary/20 hover:shadow-2xl transition-all group flex flex-col items-center text-center space-y-6">
      <div className={cn("p-6 md:p-8 rounded-full bg-primary/5 group-hover:scale-110 transition-transform", color)}>
        {React.cloneElement(icon as React.ReactElement, { className: "h-10 w-10 md:h-12 md:w-12" })}
      </div>
      <div className="space-y-2">
        <h4 className="text-xl md:text-2xl font-black uppercase tracking-widest">{label}</h4>
        <p className="text-[8px] md:text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{handle}</p>
      </div>
      <div className={cn("text-6xl md:text-7xl font-black tracking-tighter", color)}>{count}</div>
    </a>
  );
}
