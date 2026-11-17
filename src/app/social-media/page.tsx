
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
    <div className="min-h-screen bg-white text-foreground selection:bg-primary/20 selection:text-primary font-inter overflow-x-hidden">
      <Navbar />
      
      <main className="pb-20 space-y-40">
        {/* Dedicated Hero Section with Enhanced Fade */}
        <section className="relative h-[60vh] md:h-[70vh] flex flex-col items-center justify-center px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/hero.png" 
              alt="Hero Background" 
              fill 
              className="object-cover opacity-50"
              data-ai-hint="social hero"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white" />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center space-y-4 pt-20"
          >
            <h1 className="text-7xl md:text-[140px] font-black tracking-tighter text-green-gradient uppercase leading-none">Reach</h1>
            <p className="text-muted-foreground text-sm md:text-base font-medium uppercase tracking-[0.4em]">Scaling Digital Icons</p>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="max-w-7xl mx-auto px-6 space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-primary">Features</h2>
            <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-3xl mx-auto">
              Real-time updates from the Two Holy Mosques, bridging millions with the sacred heart of Islam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UpdateCard 
              icon={<Mic2 />} 
              title="Khateeb" 
              desc="Designated Jummah Khateeb announcements for Masjid Al-Haram & Masjid An-Nabawi."
            />
            <UpdateCard 
              icon={<Calendar />} 
              title="Taraweeh" 
              desc="Detailed schedule of Imams leading Taraweeh and Tahajjud during Ramadan."
            />
            <UpdateCard 
              icon={<Clock />} 
              title="Salah" 
              desc="Weekly and daily Imam rosters for all five prayers, ensuring global connection."
            />
            <UpdateCard 
              icon={<Star />} 
              title="Special" 
              desc="Updates on Istisqa, Khusoof, and Eid prayers with designated lead Imams."
            />
            <UpdateCard 
              icon={<CloudRain />} 
              title="Weather" 
              desc="Live coverage of rain and atmospheric spiritual moments from the Haramain."
            />
            <UpdateCard 
              icon={<Sparkles />} 
              title="Moments" 
              desc="Curated highlights of the most spiritual events occurring within the holy precincts."
            />
          </div>
        </section>

        {/* YouTube Section */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 order-2 lg:order-none text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 font-black text-[10px] tracking-[0.3em] uppercase mx-auto lg:mx-0">
                <YoutubeIcon className="h-4 w-4" /> Voices of Haram
              </div>
              <h2 className="text-6xl md:text-[100px] font-black tracking-tighter uppercase leading-[0.9] text-red-600">Youtube</h2>
              <p className="text-muted-foreground text-xl leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                A premier digital ecosystem dedicated to global recitations and spiritual tradition.
              </p>
              
              <div className="flex flex-col gap-4 items-center lg:items-start">
                <div className="flex items-center gap-3 text-red-600/60 font-black text-[10px] uppercase tracking-widest">
                  <Mail className="h-4 w-4" /> voicesofharambusiness@yahoo.com
                </div>
                <div className="grid grid-cols-2 gap-10 pt-6">
                  <div className="space-y-1">
                    <span className="text-5xl font-black tracking-tighter text-red-600">30K+</span>
                    <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">Subscribers</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-5xl font-black tracking-tighter text-red-600">5M+</span>
                    <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">Views</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center lg:justify-start pt-10">
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-16 h-20 text-lg font-black tracking-widest uppercase shadow-2xl w-fit">
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

        {/* FB Hub */}
        <section className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-[#F0F2F5] p-8 md:p-24 rounded-[3rem] md:rounded-[5rem] border border-[#1877F2]/10 relative overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1877F2]/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
              <div className="space-y-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] font-black text-[10px] tracking-[0.3em] uppercase mx-auto lg:mx-0">
                  Digital Hub
                </div>
                <h2 className="text-[100px] md:text-[200px] font-black tracking-tighter text-[#1877F2] leading-none">FB</h2>
                <p className="text-xl md:text-2xl text-muted-foreground/80 font-medium max-w-md mx-auto lg:mx-0">
                  Spiritual community of <span className="text-[#1877F2] font-black">25,000+</span> individuals united through technology.
                </p>
                <div className="flex justify-center lg:justify-start pt-10">
                  <Button asChild className="bg-[#1877F2] hover:bg-[#1565C0] rounded-full px-16 h-20 text-lg font-black tracking-widest uppercase shadow-2xl w-fit">
                    <a href="https://facebook.com/voicesofharam.official" target="_blank">VISIT</a>
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <StatBox icon={<Users />} label="Members" count="25K+" />
                <StatBox icon={<Send />} label="Weekly" count="100+" />
                <StatBox icon={<TrendingUp />} label="Impact" count="High" />
                <StatBox icon={<Globe />} label="Scope" count="Global" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Multi-Platform */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <ReachCard icon={<Instagram />} label="Insta" handle="@voicesofharam.official" count="1K+" color="text-[#E1306C]" href="https://instagram.com/voicesofharam.official" />
          <ReachCard icon={<TrendingUp />} label="TikTok" handle="@voicesofharam.official" count="600+" color="text-primary" href="https://tiktok.com/@voicesofharam.official" />
          <ReachCard icon={<Twitter />} label="Threads" handle="@voicesofharam.official" count="6.5K+" color="text-[#7C3AED]" href="https://threads.net/@voicesofharam.official" />
        </section>

        {/* Waleed Section */}
        <section className="py-40 bg-primary/5">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
            <h2 className="text-6xl md:text-[140px] font-black tracking-tighter text-green-gradient uppercase leading-none">Waleed <br/> Al-Shamsan</h2>
            <div className="relative inline-block group">
              <div className="w-64 h-64 md:w-96 md:h-96 rounded-[4rem] p-2 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rotate-6 group-hover:rotate-0 transition-transform">
                <div className="w-full h-full rounded-[3.5rem] border-[10px] border-white overflow-hidden relative -rotate-6 group-hover:rotate-0 transition-transform">
                  <Image src="https://picsum.photos/seed/waleed-pro/800/800" alt="Sheikh Waleed" fill className="object-cover" data-ai-hint="portrait islamic" />
                </div>
              </div>
            </div>
            <div className="space-y-10 px-4 pt-10">
              <div className="inline-flex items-center gap-4 px-6 py-4 rounded-full bg-white shadow-2xl border border-pink-100 max-w-full mx-auto">
                <Instagram className="h-6 w-6 text-[#E1306C] shrink-0" />
                <span className="text-xl md:text-3xl font-black tracking-tighter">7,000+ Followers</span>
              </div>
              <p className="text-xl md:text-3xl font-black tracking-widest text-primary uppercase max-w-[90vw] mx-auto truncate">@sheikh_waleed_al_shamsan</p>
              <div className="flex justify-center pt-10">
                <Button asChild variant="outline" className="rounded-full px-16 h-20 border-pink-200 text-pink-600 font-black tracking-widest text-sm uppercase transition-all hover:scale-105 w-fit">
                  <a href="https://instagram.com/sheikh_waleed_al_shamsan" target="_blank">VISIT</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function UpdateCard({ icon, title, desc }: any) {
  return (
    <div className="p-10 rounded-[3rem] bg-white border border-primary/5 hover:border-primary/20 transition-all hover:shadow-xl group text-center lg:text-left">
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
    <div className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-white shadow-xl border border-primary/5 flex flex-col items-center text-center space-y-4 w-full">
      <div className="text-[#1877F2] shrink-0">{React.cloneElement(icon, { className: "h-6 w-6 md:h-8 md:w-8" })}</div>
      <div className="space-y-1">
        <h4 className="text-xl md:text-2xl font-black tracking-tighter">{count}</h4>
        <p className="text-[7px] md:text-[8px] font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
      </div>
    </div>
  )
}

function ReachCard({ icon, label, handle, count, color, href }: any) {
  return (
    <a href={href} target="_blank" className="p-10 md:p-12 rounded-[4rem] bg-white border border-primary/5 hover:border-primary/20 hover:shadow-2xl transition-all group flex flex-col items-center text-center space-y-6 overflow-hidden">
      <div className={cn("p-6 md:p-8 rounded-full bg-primary/5 group-hover:scale-110 transition-transform shrink-0", color)}>
        {React.cloneElement(icon as React.ReactElement, { className: "h-10 w-10 md:h-12 md:w-12" })}
      </div>
      <div className="space-y-2 min-w-0 w-full">
        <h4 className="text-xl md:text-2xl font-black uppercase tracking-widest truncate">{label}</h4>
        <p className="text-[8px] md:text-[9px] font-bold text-muted-foreground uppercase tracking-widest truncate">{handle}</p>
      </div>
      <div className={cn("text-6xl md:text-7xl font-black tracking-tighter", color)}>{count}</div>
    </a>
  );
}
