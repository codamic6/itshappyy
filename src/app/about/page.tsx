
"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { Trophy, Star, ShieldCheck, Zap } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-foreground selection:bg-primary/20 selection:text-primary font-inter">
      <Navbar />
      
      <main className="pb-20">
        {/* Dedicated Hero Section with Responsive Image Switching & Fade */}
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
              <Image src="https://picsum.photos/seed/happy-identity/1000/1000" alt="About" fill className="object-cover" />
              <div className="absolute inset-0 bg-primary/10" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard icon={<Trophy />} title="RECORD" desc="Hifz revision 6x faster than average." />
            <ValueCard icon={<Star />} title="BRAND" desc="Voices of Haram established 2025." />
            <ValueCard icon={<ShieldCheck />} title="LOGIC" desc="High-performance brand architecting." />
            <ValueCard icon={<Zap />} title="SPEED" desc="Zero to global reach in record time." />
          </div>

          <div className="crystal-panel p-12 md:p-20 rounded-[4rem] space-y-10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-primary">Vision</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-muted-foreground font-medium text-lg leading-relaxed">
              <p>Founded in 2025, <span className="text-primary font-bold">Voices of Haram</span> serves as a global ecosystem bridging spiritual tradition with digital engineering.</p>
              <p>As a software architect, I build systems that scale. Every project is a testament to precision and focus.</p>
            </div>
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
