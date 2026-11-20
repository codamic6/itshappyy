
"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { 
  Trophy, Star, ShieldCheck, Zap, 
  GraduationCap, Award, Medal, BookOpen,
  Youtube as YoutubeIcon, Users, Globe, ExternalLink, Send, Mail, MapPin, Phone,
  TrendingUp, Twitter, Instagram, Mic2, Clock, Calendar, Sparkles, CloudRain, CheckCircle2, ArrowRight
} from 'lucide-react'

export default function PortfolioPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary font-inter overflow-x-hidden transition-colors duration-700 ease-in-out">
      <Navbar />
      
      {/* Hero Section */}
      <section id="hero-home" className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="hidden md:block absolute inset-0">
            <Image 
              src="/hero.jpg" 
              alt="Hero Background PC" 
              fill 
              unoptimized
              className="object-cover object-center"
              data-ai-hint="main hero"
              priority
            />
          </div>
          <div className="md:hidden absolute inset-0">
            <Image 
              src="/hero_mobile.jpg" 
              alt="Hero Background Mobile" 
              fill 
              unoptimized
              className="object-cover object-center"
              data-ai-hint="main hero mobile"
              priority
            />
          </div>
          {/* Subtle Bottom Fade Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-6xl w-full text-center space-y-4 pt-20"
        >
          <div className="flex items-center justify-center px-4">
            <h1 className="text-[60px] sm:text-[100px] md:text-[220px] lg:text-[280px] font-black tracking-tighter text-green-gradient uppercase italic leading-none break-all sm:whitespace-nowrap glowing-text drop-shadow-2xl">
              HAPPY
            </h1>
          </div>
          <p className="text-[10px] sm:text-sm md:text-base text-primary/80 dark:text-white/70 max-w-4xl mx-auto font-black uppercase tracking-[0.1em] px-4 drop-shadow-sm hero-text-shadow">
            WEB DEVELOPMENT | CONTENT CREATION | SOCIAL MEDIA MANAGEMENT | STUDENT | COLLEGE | ISLAM
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-10">
            <Link href="/projects">
              <Button size="lg" className="rounded-full px-12 bg-primary text-white h-14 font-black tracking-widest text-[10px] uppercase shadow-2xl transition-all hover:scale-105">WORK</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-full px-12 border-primary/20 h-14 text-primary font-black tracking-widest text-[10px] uppercase transition-all hover:scale-105">CONNECT</Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Achievement Section */}
      <section id="global-milestone-home" className="py-12 md:py-16 px-4 md:px-6 relative overflow-hidden">
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

      {/* About Section */}
      <section id="about-home" className="py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 text-center lg:text-left">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-primary glowing-text">About</h2>
            <div className="space-y-6 text-muted-foreground dark:text-white/70 text-lg leading-relaxed font-medium">
              <p>My story is built on <span className="text-primary font-bold italic underline decoration-primary/20">Extreme Discipline</span>. In 2023, I completed <span className="text-primary font-bold">Hifz-e-Quran</span> at Masjid-e-Niyaz in just <span className="text-primary font-bold italic">1 Year 9 Months</span>.</p>
              <p>While standard revision takes 6 months, I completed mine in exactly <span className="text-primary font-bold italic">1 Month</span>.</p>
            </div>
            <div className="pt-10">
              <Link href="/about">
                <Button variant="link" className="p-0 text-primary font-black tracking-widest text-[10px] uppercase group">
                  EXPLORE <span className="ml-2 transition-transform group-hover:translate-x-2">→</span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-primary/10 dark:border-white/5 glowing-card">
            <Image src="/my_avt.jpg" alt="About Profile" fill unoptimized className="object-cover" data-ai-hint="portrait professional" />
            <div className="absolute inset-0 bg-primary/10 dark:bg-primary/5" />
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education-home" className="py-40 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-primary glowing-text">Academy</h2>
            <p className="text-muted-foreground dark:text-white/50 font-medium uppercase tracking-[0.2em]">Excellence Over A Decade 2026</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <EduCard icon={<GraduationCap />} year="2026" title="ICS - 11th" institution="Punjab College" desc="Advanced Logic and Digital Architectures." />
            <EduCard icon={<Award />} year="2025" title="Matric - 1st" institution="Al-Faisal School" desc="1st Position: 1165/1200 marks. Board Record." />
            <EduCard icon={<Medal />} year="2024" title="9th Grade" institution="Al-Faisal School" desc="Scored 525/545 marks. Pure Science focus." />
          </div>
          <div className="text-center pt-10">
            <Link href="/education">
              <Button size="lg" variant="outline" className="rounded-full px-12 border-primary/20 h-14 text-primary font-black tracking-widest text-[10px] uppercase transition-all hover:scale-105">VIEW TIMELINE</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="projects-home" className="py-40 px-6 max-w-7xl mx-auto">
        <div className="space-y-20">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-primary glowing-text">Work</h2>
            <p className="text-muted-foreground dark:text-white/50 font-medium uppercase tracking-[0.2em]">Engineering Scalable Futures</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <ProjectFeatured title="Chizzy AI" cat="AI Tools" img="/chizzyai.jpg" href="https://chizzy-two.vercel.app" />
            <ProjectFeatured title="HappyChat" cat="Messaging Platforms" img="/happychat.jpg" href="https://happychat-murex.vercel.app" />
            <ProjectFeatured title="HappyLink" cat="Identity Solutions" img="/happylink.jpg" href="https://happylink-beta.vercel.app" />
          </div>
          <div className="text-center pt-12">
            <Link href="/projects">
              <Button size="lg" className="rounded-full px-12 bg-primary text-white h-16 font-black tracking-widest text-sm uppercase shadow-2xl transition-all hover:scale-105">
                VIEW MORE <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reach Section */}
      <section id="social-home" className="py-40 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-40">
          <div className="text-center space-y-4">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-primary glowing-text">Reach</h2>
            <p className="text-muted-foreground dark:text-white/50 font-medium uppercase tracking-[0.2em]">Scaling Digital Icons 2026</p>
          </div>

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
                  <p className="text-[10px] font-black tracking-widest text-muted-foreground dark:text-white/40 uppercase">Views</p>
                </div>
              </div>
              <div className="flex justify-center lg:justify-start pt-10">
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-16 h-20 text-lg font-black tracking-widest uppercase shadow-2xl w-fit">
                  <a href="https://youtube.com/@VoicesOfHaram" target="_blank">VISIT</a>
                </Button>
              </div>
            </div>
            <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-red-50 dark:border-red-900/20 bg-black glowing-card">
              <iframe 
                className="w-full h-full" 
                src="https://www.youtube.com/embed/VOA8Gc44ZIE" 
                title="VOH Main" 
                frameBorder="0" 
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="bg-[#F0F2F5] dark:bg-blue-950/10 p-8 md:p-24 rounded-[3rem] md:rounded-[5rem] border border-[#1877F2]/10 dark:border-blue-900/20 relative overflow-hidden glowing-card">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
              <div className="space-y-10 text-center lg:text-left">
                <h2 className="text-[100px] md:text-[200px] font-black tracking-tighter text-[#1877F2] leading-none">FB</h2>
                <p className="text-xl md:text-2xl text-muted-foreground/80 dark:text-white/70 font-medium">
                  Community of <span className="text-[#1877F2] font-black">25,000+</span>
                </p>
                <div className="flex justify-center lg:justify-start">
                  <Button asChild className="bg-[#1877F2] hover:bg-[#1565C0] rounded-full px-16 h-20 text-lg font-black tracking-widest uppercase shadow-2xl w-fit">
                    <a href="https://facebook.com/voicesofharam.official" target="_blank">VISIT</a>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <StatBox icon={<Users />} label="Members" count="25K+" fb />
                <StatBox icon={<Send />} label="Weekly" count="100+" fb />
                <StatBox icon={<TrendingUp />} label="Impact" count="High" fb />
                <StatBox icon={<Globe />} label="Scope" count="Global" fb />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section id="contact-home" className="py-40 px-6 max-w-7xl mx-auto space-y-24">
        <div className="text-center space-y-4">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-primary glowing-text">Connect</h2>
          <p className="text-muted-foreground dark:text-white/50 font-medium uppercase tracking-[0.2em]">The Connect Station 2026</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="crystal-panel p-12 md:p-20 rounded-[4rem] relative overflow-hidden min-h-[500px] flex flex-col justify-center glowing-card">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-12"
                >
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input className="h-16 rounded-2xl border-primary/10 bg-white/50 dark:bg-white/5" placeholder="NAME" required />
                      <Input className="h-16 rounded-2xl border-primary/10 bg-white/50 dark:bg-white/5" placeholder="EMAIL" type="email" required />
                    </div>
                    <Input className="h-16 rounded-2xl border-primary/10 bg-white/50 dark:bg-white/5" placeholder="SUBJECT" required />
                    <Textarea className="min-h-[150px] rounded-3xl border-primary/10 bg-white/50 dark:bg-white/5" placeholder="VISION..." required />
                    <Button type="submit" className="w-full h-20 rounded-full bg-primary text-white font-black uppercase shadow-2xl transition-all hover:scale-[1.02]">
                      SUBMIT <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-8"
                >
                  <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto">
                    <CheckCircle2 className="w-16 h-16" />
                  </div>
                  <h2 className="text-5xl font-black tracking-tighter uppercase text-primary">Mission Success</h2>
                  <p className="text-muted-foreground dark:text-white/60 leading-relaxed uppercase tracking-widest text-xs">Message Secured</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-center space-y-12 min-w-0">
            <ContactInfo icon={<Mail />} label="Email" value="itsmuhammadahmad06@gmail.com" />
            <ContactInfo icon={<Phone />} label="Phone" value="+923434441031" />
            <ContactInfo icon={<MapPin />} label="Location" value="Faisalabad, PK" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function EduCard({ icon, year, title, institution, desc }: any) {
  return (
    <div className="p-10 rounded-[3rem] bg-card border border-primary/5 dark:border-white/5 hover:border-primary/20 transition-all hover:shadow-xl group glowing-card">
      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-black text-[9px] mb-6">{year}</span>
      <div className="flex items-center gap-3 mb-4">
        <div className="text-primary">{icon}</div>
        <h3 className="text-2xl font-black tracking-tighter uppercase">{title}</h3>
      </div>
      <p className="text-primary font-bold text-[9px] tracking-widest uppercase mb-4">{institution}</p>
      <p className="text-muted-foreground dark:text-white/60 text-sm font-medium leading-relaxed">{desc}</p>
    </div>
  )
}

function ProjectFeatured({ title, cat, img, href }: any) {
  return (
    <div className="group relative bg-card rounded-[4rem] border border-primary/5 dark:border-white/5 hover:border-primary/20 transition-all hover:shadow-2xl overflow-hidden glowing-card">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image src={img} alt={title} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-700" data-ai-hint="software project" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="px-5 py-1.5 rounded-full bg-primary/5 text-primary font-black text-[9px] uppercase tracking-widest">{cat}</span>
          <a href={href} target="_blank" className="text-primary hover:scale-110 transition-transform"><ExternalLink className="h-5 w-5" /></a>
        </div>
        <h3 className="text-2xl font-black tracking-tighter uppercase text-primary">{title}</h3>
      </div>
    </div>
  )
}

function StatBox({ icon, label, count, fb }: any) {
  return (
    <div className={cn(
      "p-6 rounded-[2rem] bg-white dark:bg-white/[0.05] shadow-xl border border-primary/5 flex flex-col items-center text-center space-y-4",
      fb && "dark:border-blue-900/20"
    )}>
      <div className={fb ? "text-[#1877F2]" : "text-primary"}>
        {icon && React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6" })}
      </div>
      <div className="space-y-1">
        <h4 className="text-xl font-black tracking-tighter">{count}</h4>
        <p className="text-[8px] font-bold text-muted-foreground dark:text-white/40 uppercase tracking-widest">{label}</p>
      </div>
    </div>
  )
}

function ContactInfo({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-6 group w-full overflow-hidden">
      <div className="w-16 h-16 rounded-2xl bg-primary/5 dark:bg-white/[0.05] border border-primary/10 dark:border-white/10 flex items-center justify-center text-primary shrink-0 transition-all group-hover:bg-primary group-hover:text-white dark:group-hover:text-black">
        {icon && React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6" })}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[8px] font-black tracking-widest text-muted-foreground dark:text-white/40 uppercase">{label}</p>
        <p className="text-lg md:text-xl font-black tracking-tighter uppercase truncate dark:text-white">{value}</p>
      </div>
    </div>
  )
}
