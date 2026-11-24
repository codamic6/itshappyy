
"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { 
  Youtube as YoutubeIcon, Users, TrendingUp, Globe, Send, Mic2, 
  Clock, Calendar, Sparkles, Instagram as InstagramIcon, 
  ExternalLink, ShieldCheck, Zap, Star, CloudRain
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function SocialMediaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary font-inter overflow-x-hidden">
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
            {/* Transition Fade Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center space-y-4 pt-20"
          >
            <h1 className="text-7xl md:text-[140px] font-black tracking-tighter text-green-gradient uppercase leading-none drop-shadow-2xl">Reach</h1>
            <p className="text-primary/80 text-sm md:text-base font-black uppercase tracking-[0.4em]">Scaling Digital Icons 2026</p>
          </motion.div>
        </section>

        {/* 1. ACHIEVEMENT SECTION (SYNCED WITH HOME PAGE) */}
        <section id="global-milestone-social" className="py-12 md:py-16 px-4 md:px-6 relative overflow-hidden text-center md:text-left">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative p-8 md:p-16 rounded-[3rem] md:rounded-[4rem] bg-card border border-primary/10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/[0.04] rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/[0.04] rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 font-black text-[10px] tracking-[0.3em] uppercase mx-auto lg:mx-0">
                    <YoutubeIcon className="h-4 w-4" /> GLOBAL MILESTONE 2026
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[105px] font-black tracking-tighter uppercase leading-[0.85] flex flex-col break-words">
                      <span className="text-red-600">TOP 25%</span>
                      <span className="text-green-gradient text-nowrap">GLOBALLY</span>
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
                    <div className="absolute inset-0 bg-red-600/[0.05] blur-[80px] rounded-full scale-150" />
                    <div className="relative p-12 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-[0_0_40px_rgba(220,38,38,0.05)] flex items-center justify-center transition-all">
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

        {/* 2. CORE FEATURES */}
        <section id="social-features" className="max-w-7xl mx-auto px-6 space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-primary">FEATURES</h2>
            <p className="text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed uppercase tracking-[0.1em] text-sm md:text-base">
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
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 font-black text-[10px] tracking-[0.3em] uppercase mx-auto lg:mx-0">
                <YoutubeIcon className="h-4 w-4" /> Voices of Haram
              </div>
              <h2 className="text-6xl md:text-[100px] font-black tracking-tighter uppercase leading-[0.9] text-red-600">Youtube</h2>
              <p className="text-lg text-muted-foreground font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Alhamdulillah, Voices of Haram has secured its position in the top creators worldwide.
              </p>
              <div className="grid grid-cols-2 gap-10 pt-6">
                <div className="space-y-1">
                  <span className="text-5xl font-black tracking-tighter text-red-600">30.5K+</span>
                  <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">Subscribers</p>
                </div>
                <div className="space-y-1">
                  <span className="text-5xl font-black tracking-tighter text-red-600">5M+</span>
                  <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">Total Views</p>
                </div>
              </div>
              <div className="flex justify-center lg:justify-start pt-10">
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-16 h-20 text-lg font-black tracking-widest uppercase shadow-2xl w-fit transition-transform hover:scale-105">
                  <a href="https://youtube.com/@VoicesOfHaram" target="_blank">VISIT CHANNEL</a>
                </Button>
              </div>
            </div>
            <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-red-50 bg-black">
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
          <div className="bg-[#F0F2F5] p-8 md:p-24 rounded-[3.5rem] border border-[#1877F2]/10 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
              <div className="space-y-10 text-center lg:text-left">
                <h2 className="text-[100px] md:text-[200px] font-black tracking-tighter text-[#1877F2] leading-none">FB</h2>
                <div className="space-y-4">
                  <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                    Community of <span className="text-[#1877F2] font-black">25,000+ dedicated members.</span>
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

        {/* 5. OTHERS SECTION (REDESIGNED ADVANCED UI) */}
        <section id="others-social-advanced" className="max-w-7xl mx-auto px-6 space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-primary">Global Reach</h2>
            <p className="text-muted-foreground font-medium max-w-xl mx-auto uppercase tracking-[0.2em] text-[10px] md:text-xs">
              Extending the spiritual footprint across the digital horizon 2026.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AdvancedSocialCard 
              icon={<ThreadsIcon />} 
              label="Threads" 
              count="6.5K+" 
              variant="threads"
              href="https://www.threads.net/@voicesofharam.official" 
            />
            <AdvancedSocialCard 
              icon={<InstagramIcon className="h-8 w-8" />} 
              label="Instagram" 
              count="1K+" 
              variant="instagram"
              href="https://www.instagram.com/voicesofharam.official" 
            />
            <AdvancedSocialCard 
              icon={<TikTokIcon />} 
              label="TikTok" 
              count="600+" 
              variant="tiktok"
              href="https://www.tiktok.com/@voicesofharam.official" 
            />
          </div>
        </section>

        {/* 6. SHEIKH WALEED MENTION (GOD-MODE REDESIGN) */}
        <section id="sheikh-shamsan-premium" className="max-w-7xl mx-auto px-6 pb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-6 md:p-24 rounded-[4rem] bg-slate-50 border border-primary/5 shadow-2xl overflow-hidden group"
          >
            {/* Animated Background Mesh */}
            <div className="absolute inset-0 z-0">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px] -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/[0.03] rounded-full blur-[100px] -ml-20 -mb-20" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-8 md:space-y-12">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 blur-[40px] rounded-full scale-150 animate-pulse" />
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-white shadow-2xl border-4 border-white flex items-center justify-center p-2">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center text-white">
                    <InstagramIcon className="w-16 h-16" />
                  </div>
                </div>
              </div>

              <div className="space-y-6 w-full max-w-4xl mx-auto overflow-hidden">
                <h3 className="text-2xl sm:text-4xl md:text-7xl font-black tracking-tighter uppercase text-primary leading-tight break-all whitespace-normal px-2">
                  @sheikh_waleed_al_shamsan
                </h3>
                <div className="flex flex-wrap justify-center items-center gap-4">
                  <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary text-white font-black text-xs tracking-widest uppercase shadow-xl">
                    <Users className="h-4 w-4" /> 8000+ FOLLOWERS
                  </span>
                  <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-primary/10 text-primary font-black text-xs tracking-widest uppercase">
                    <ShieldCheck className="h-4 w-4" /> VERIFIED REACH
                  </span>
                </div>
              </div>

              <div className="pt-4 w-full sm:w-fit">
                <Button asChild className="w-full sm:w-fit rounded-full px-16 h-20 bg-primary text-white font-black uppercase tracking-[0.3em] text-sm shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all hover:scale-105 active:scale-95 group">
                  <a href="https://instagram.com/sheikh_waleed_al_shamsan" target="_blank" className="flex items-center gap-3">
                    VISIT PROFILE <ExternalLink className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function StatBox({ icon, label, count, fb }: any) {
  return (
    <div className={cn(
      "p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] bg-white shadow-xl border border-primary/5 flex flex-col items-center text-center space-y-2 sm:space-y-4 transition-all hover:scale-105",
      fb && "border-blue-100"
    )}>
      <div className={fb ? "text-[#1877F2]" : "text-primary"}>
        {icon && React.cloneElement(icon as React.ReactElement, { className: "h-5 w-5 sm:h-6 sm:w-6" })}
      </div>
      <div className="space-y-1">
        <h4 className="text-xl sm:text-2xl font-black tracking-tighter">{count}</h4>
        <p className="text-[8px] sm:text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
      </div>
    </div>
  )
}

function UpdateCard({ icon, title, desc }: any) {
  return (
    <div className="p-10 rounded-[3rem] bg-card border border-primary/5 hover:border-primary/20 transition-all hover:shadow-2xl group flex flex-col items-center text-center lg:items-start lg:text-left">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
        {icon && React.cloneElement(icon as React.ReactElement, { className: "h-7 w-7" })}
      </div>
      <h3 className="text-2xl font-black tracking-tighter uppercase mb-4 text-primary">{title}</h3>
      <p className="text-muted-foreground text-sm font-medium leading-relaxed">{desc}</p>
    </div>
  )
}

function AdvancedSocialCard({ icon, label, count, variant, href }: any) {
  const styles = {
    threads: "hover:bg-black hover:text-white border-black/5 hover:border-black shadow-black/5",
    instagram: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:text-white border-pink-100 hover:border-transparent",
    tiktok: "hover:bg-[#000000] hover:text-white border-cyan-100 hover:border-[#fe2c55] shadow-cyan-500/10"
  };

  return (
    <motion.a 
      href={href} 
      target="_blank" 
      whileHover={{ y: -10 }}
      className={cn(
        "p-12 rounded-[4rem] bg-white border-2 transition-all duration-500 text-center space-y-8 group relative overflow-hidden",
        styles[variant as keyof typeof styles]
      )}
    >
      <div className="relative z-10 space-y-6">
        <div className="w-20 h-20 rounded-[2.5rem] bg-slate-50 flex items-center justify-center mx-auto transition-transform group-hover:scale-110 group-hover:rotate-6 text-primary">
          {icon}
        </div>
        <div className="space-y-2">
          <h4 className="text-5xl font-black tracking-tighter">{count}</h4>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50 group-hover:opacity-100 transition-opacity">{label}</p>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-20 transition-opacity">
        <Zap className="h-12 w-12" />
      </div>
    </motion.a>
  )
}

function ThreadsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
      <path d="M12 24c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11s-4.925-11-11-11-11 4.925-11 11 4.925 11 11 11zm3.762-11.458c0-.79-.115-1.503-.346-2.138-.232-.635-.558-1.156-.979-1.564s-.95-.713-1.585-.916c-.636-.202-1.353-.304-2.152-.304s-1.516.102-2.152.304c-.635.203-1.164.508-1.585.916s-.747.929-.979 1.564c-.231.635-.346 1.348-.346 2.138s.115 1.503.346 2.138c.232.635.558 1.156.979 1.564s.95.713 1.585.916c.636.202 1.353.304 2.152.304s1.516-.102 2.152-.304c.635-.203 1.164-.508 1.585-.916s.747-.929.979-1.564c.231-.635.346-1.348.346-2.138zM12 7.5c2.485 0 4.5 2.015 4.5 4.5s-2.015 4.5-4.5 4.5-4.5-2.015-4.5-4.5 2.015-4.5 4.5-4.5zm0 1c-1.933 0-3.5 1.567-3.5 3.5s1.567 3.5 3.5 3.5 3.5-1.567 3.5-3.5-1.567-3.5-3.5-3.5z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.386 6.386 0 0 1-1.87-1.5c-.02 3.17-.01 6.34-.02 9.51-.02 1.23-.28 2.48-.87 3.57a6.32 6.32 0 0 1-3.25 3.12c-1.21.47-2.52.62-3.8.44-1.28-.18-2.5-.72-3.48-1.58a6.35 6.35 0 0 1-2.12-4.63c-.02-1.39.27-2.8.93-4.01a6.32 6.32 0 0 1 4.51-3.32c.11-.02.21-.03.32-.05v4.11c-.13.04-.26.07-.38.12a2.23 2.23 0 0 0-1.32 2.37c.07.64.44 1.22.99 1.56.55.34 1.25.4 1.86.15.61-.25 1.05-.8 1.19-1.44.06-.29.08-.59.07-.89V0h.01z" />
    </svg>
  );
}
