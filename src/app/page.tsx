
"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Github, Linkedin, Mail, ExternalLink, MessageSquare, Link as LinkIcon, Youtube, Instagram, Users, Send, TrendingUp, PlayCircle, Star, Trophy, Clock, Menu, X, Facebook, Twitter, GraduationCap, MapPin, Layout } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

export default function PortfolioPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  // Dynamic Role Logic
  const roles = ["Developer", "Content Creator", "Graphic Designer"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY.current ? "down" : "up";
    if (direction === "down" && latest > 150) {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true);
    }
    lastScrollY.current = latest;
  });

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Voices of Haram', href: '#youtube' },
    { name: 'Hub', href: '#facebook' },
    { name: 'Reach', href: '#reach' },
    { name: 'Contact', href: '#contact' },
  ];

  const projects = [
    {
      id: 1,
      title: "HappyChat",
      category: "Messaging Ecosystem",
      icon: <MessageSquare className="h-5 w-5" />,
      imgSrc: "https://picsum.photos/seed/chat/800/600",
      description: "Secure ultra-fast alternative to mainstream messaging apps.",
      longDescription: "HappyChat is a high-speed messaging ecosystem built for global connectivity. It features end-to-end encryption and a custom-built architecture for zero-latency communication.",
      stack: ['Next.js', 'Firebase', 'Socket.io', 'Tailwind'],
      link: "https://happychat.example.com"
    },
    {
      id: 2,
      title: "HappyLinks",
      category: "Identity Aggregator",
      icon: <LinkIcon className="h-5 w-5" />,
      imgSrc: "https://picsum.photos/seed/links/800/600",
      description: "Premium bio-link solution for massive global media brands.",
      longDescription: "Designed for high-reach content creators, HappyLinks offers deep analytics, customizable themes, and a centralized hub for digital identities.",
      stack: ['React', 'PostgreSQL', 'Tailwind', 'Node.js'],
      link: "https://happylinks.example.com"
    }
  ];

  const educationTimeline = [
    { year: "2026", title: "11th Grade - ICS", institution: "Punjab College Daewoo Road", details: "Currently focusing on Advanced Software Logic and Digital Ecosystems." },
    { year: "2025", title: "Class 10 Board - Matric", institution: "Al-Faisal Grammar School", details: "Academic Peak: 1st Position in School with 1165/1200 marks. (Roll No 484655)" },
    { year: "2024", title: "Class 9 Board", institution: "Al-Faisal Grammar School", details: "Board Distinction: 3rd Position in Faisalabad Board with 525/545 marks. (Roll No 190511)" },
    { year: "Feb 10, 2023", title: "Hifz-e-Quran Completion", institution: "Masjid-e-Niyaz Ahmadabad", details: "Record Achievement: Completed Hifz in 1 Year 9 Months. Record Revision (Duhrai) completed in just 1 Month." },
    { year: "2021-2022", title: "Intensive Hifz Period", institution: "Masjid-e-Niyaz Ahmadabad", details: "Dedicated focus on Quranic memorization at Masjid-e-Niyaz." },
    { year: "2020", title: "Class 5", institution: "Al-Faisal Grammar School", details: "2nd Position with Academic Excellence." },
    { year: "2019", title: "Class 4", institution: "Al-Faisal Grammar School", details: "2nd Position." },
    { year: "2018", title: "Class 3", institution: "Al-Faisal Grammar School", details: "4th Position." },
    { year: "2017", title: "Class 2", institution: "Al-Faisal Grammar School", details: "2nd Position." },
    { year: "2016", title: "Class 1", institution: "Al-Faisal Grammar School", details: "2nd Position." },
    { year: "2015", title: "Prep", institution: "Al-Faisal Grammar School", details: "3rd Position." },
    { year: "2014", title: "Nursery", institution: "Al-Faisal Grammar School", details: "The start of an exceptional academic journey." }
  ];

  return (
    <div className="min-h-screen bg-white text-foreground selection:bg-primary/20 selection:text-primary font-inter overflow-x-hidden">
      
      {/* Animated Background Atmosphere */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] -right-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ x: [0, 20, 0], y: [0, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 left-[20%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[110px]" 
        />
      </div>

      {/* Detached Smart Navbar */}
      <motion.nav 
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: isNavVisible ? 0 : -120, x: "-50%", opacity: isNavVisible ? 1 : 0 }}
        className="fixed top-8 left-1/2 z-[100] w-[90%] max-w-5xl pointer-events-none"
      >
        <div className="glass-white h-20 px-6 md:px-10 flex items-center justify-between rounded-full border border-primary/10 shadow-2xl pointer-events-auto">
          <span className="text-xl md:text-2xl font-black font-syne tracking-widest text-green-gradient uppercase cursor-pointer">ARSALAN</span>
          
          <div className="hidden lg:flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-primary transition-colors">{link.name}</a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button className="hidden sm:flex rounded-full px-6 md:px-8 bg-primary text-white font-black text-[10px] tracking-widest h-12 uppercase transition-transform hover:scale-105">
              HIRE ME
            </Button>
            <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-3 text-primary"><Menu className="h-6 w-6" /></button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[110] lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-[80%] bg-white z-[120] shadow-2xl flex flex-col"
            >
              <div className="p-8 flex items-center justify-between border-b border-primary/5">
                <span className="text-[10px] font-black tracking-widest text-primary uppercase">NAVIGATION</span>
                <button onClick={() => setIsMenuOpen(false)}><X className="h-6 w-6 text-primary" /></button>
              </div>
              <div className="flex-1 p-10 space-y-6 flex flex-col">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-sm font-medium tracking-tight text-foreground hover:text-primary transition-colors uppercase">{link.name}</a>
                ))}
                <div className="mt-auto pt-10">
                  <Button className="w-full rounded-full py-6 bg-primary text-white font-black tracking-widest text-xs uppercase">START A PROJECT</Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl w-full text-center space-y-4"
        >
          <span className="text-sm font-medium text-muted-foreground tracking-[0.2em] uppercase">I&apos;m a</span>
          <div className="h-[80px] md:h-[120px] lg:h-[160px] flex items-center justify-center overflow-visible px-4">
            <AnimatePresence mode="wait">
              <motion.h1 
                key={roles[roleIndex]}
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
                className="text-4xl md:text-[100px] lg:text-[140px] font-black tracking-tighter text-green-gradient uppercase italic leading-none whitespace-nowrap pr-12 md:pr-20"
              >
                {roles[roleIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto font-medium uppercase tracking-tight">
            Engineering scalable futures & scaling digital ecosystems since 2023.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button size="lg" className="rounded-full px-12 bg-primary text-white h-14 font-black tracking-widest text-[10px] uppercase shadow-2xl shadow-primary/20 transition-all hover:scale-105">EXPLORE WORK</Button>
            <Button size="lg" variant="outline" className="rounded-full px-12 border-primary/20 h-14 text-primary font-black tracking-widest text-[10px] uppercase transition-all hover:scale-105">GET IN TOUCH</Button>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-40 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-10">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-green-gradient uppercase">The Identity</h2>
            <div className="space-y-6 text-muted-foreground text-xl leading-relaxed font-medium">
              <p>My story is built on extreme discipline. In 2023, I achieved <span className="text-primary font-bold italic">Hifz-e-Quran</span> at Masjid-e-Niyaz in a record-breaking <span className="text-primary font-bold italic">1 Year 9 Months</span>.</p>
              <p>My record revision (Duhrai) was completed in just <span className="text-primary font-bold italic">1 Month</span>, a feat that typically takes 6 months in the madrasa ecosystem.</p>
              <p>Founded on June 14, 2025, my brand <span className="text-primary font-bold italic">Voices of Haram</span> has scaled to global reach, bridging spiritual excellence with digital engineering.</p>
              <p>Since 2023, I have been building software architectures that scale businesses to their true potential.</p>
            </div>
          </motion.div>
          <div className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl border border-primary/10">
            <Image src="https://picsum.photos/seed/arsalan-prof/1000/1000" alt="Arsalan" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Education Timeline */}
      <section id="education" className="py-40 bg-primary/[0.02] border-y border-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-green-gradient uppercase mb-24 text-center md:text-left">Academic Peak</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {educationTimeline.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, amount: 0.1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: idx * 0.1,
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="group p-10 rounded-[3rem] bg-white border border-primary/5 hover:border-primary/20 hover:shadow-2xl transition-all"
              >
                <span className="px-4 py-1 rounded-full bg-primary/10 text-primary font-black text-[10px] tracking-widest uppercase">{item.year}</span>
                <h3 className="text-2xl md:text-3xl font-black tracking-tighter uppercase mt-6 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-primary font-bold text-sm mt-2">{item.institution}</p>
                <p className="text-muted-foreground mt-4 text-base font-medium leading-relaxed">{item.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section id="youtube" className="py-40 bg-[#1A1A1A] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 mb-24">
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-6xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#FF0000] to-[#990000] uppercase">Voices of Haram</h2>
              <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-[#FF0000]/10 border border-[#FF0000]/20 text-[#FF0000] font-black text-xs tracking-widest uppercase">
                ESTABLISHED 14 JUNE 2025
              </div>
              <p className="text-white/60 text-xl font-medium max-w-xl">
                Global Recitation Ecosystem: Week recitations, Jumuah Khutbah, Ramadan Taraweeh, Tahajjud and Qiyam-ul-Layl.
              </p>
            </div>
            <div className="flex flex-col items-center lg:items-end">
              <span className="text-7xl md:text-[140px] lg:text-[160px] font-black tracking-tighter text-[#FF0000] leading-none">30K+</span>
              <span className="text-xs font-black tracking-[0.5em] text-white/40 uppercase mt-4">GLOBAL SUBSCRIBERS</span>
              <Button asChild className="mt-8 bg-[#FF0000] hover:bg-[#CC0000] rounded-full px-12 h-16 font-black tracking-widest text-xs uppercase shadow-xl shadow-red-500/20">
                <a href="https://youtube.com/@VoicesOfHaram" target="_blank">SUBSCRIBE</a>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="aspect-video bg-black rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl transition-transform hover:scale-105">
              <iframe className="w-full h-full" src="https://www.youtube.com/embed/VOA8Gc44ZIE" title="VOH Main" frameBorder="0" allowFullScreen></iframe>
            </div>
            <div className="aspect-video bg-black rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl transition-transform hover:scale-105">
              <iframe className="w-full h-full" src="https://www.youtube.com/embed/videoseries?list=PL5LTW_BwDVXJI_DVtF5CD80r5K9vx15wb" title="VOH Playlist" frameBorder="0" allowFullScreen></iframe>
            </div>
            <div className="aspect-video bg-black rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl transition-transform hover:scale-105">
              <iframe className="w-full h-full" src="https://www.youtube.com/embed/e5oHwAaDGSQ" title="VOH Special" frameBorder="0" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Hub Section (Facebook Replaced) */}
      <section id="facebook" className="py-40 bg-[#F0F2F5] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/90 backdrop-blur-3xl p-8 md:p-16 lg:p-24 rounded-[4rem] lg:rounded-[6rem] shadow-[0_50px_100px_-20px_rgba(24,119,242,0.15)] border border-[#1877F2]/10 overflow-hidden relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1877F2]/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative">
              <div className="space-y-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] font-black text-[10px] tracking-[0.3em] uppercase">
                  Community Hub
                </div>
                <h2 className="text-7xl md:text-[140px] lg:text-[180px] font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-[#1877F2] via-[#0D47A1] to-[#01579B] uppercase leading-[0.8]">
                  HUB
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground/80 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                  A high-impact ecosystem of <span className="text-[#1877F2] font-black italic">25,000+</span> individuals united by spiritual and digital excellence.
                </p>
                <div className="pt-6">
                  <Button asChild className="bg-[#1877F2] hover:bg-[#1565C0] rounded-full px-16 h-20 text-lg font-black tracking-widest uppercase shadow-2xl shadow-[#1877F2]/30 transition-transform hover:scale-105 active:scale-95">
                    <a href="https://facebook.com/voicesofharam.official" target="_blank">JOIN THE MOVEMENT</a>
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center space-y-8">
                <div className="relative group">
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-tr from-[#1877F2] to-[#4267B2] rounded-[3rem] rotate-12 flex items-center justify-center shadow-2xl relative z-10"
                  >
                    <Facebook className="text-white w-32 h-32 md:w-40 md:h-40 -rotate-12 group-hover:scale-110 transition-transform duration-500" />
                  </motion.div>
                  <div className="absolute -inset-4 bg-[#1877F2]/20 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-4 text-[#1877F2]">
                    <Users className="h-8 w-8 md:h-12 md:w-12" />
                    <span className="text-7xl md:text-9xl font-black tracking-tighter leading-none">25K+</span>
                  </div>
                  <p className="text-[10px] font-black tracking-[0.5em] text-[#1877F2]/40 uppercase">Global Active Followers</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Multi-Platform Reach */}
      <section id="reach" className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-[120px] font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#DB2777] to-[#7C3AED] uppercase mb-32 text-center">Global Footprint</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ReachCard icon={<Instagram />} label="Instagram" handle="@voicesofharam.official" count="1K+" color="text-[#E1306C]" href="https://instagram.com/voicesofharam.official" />
            <ReachCard icon={<TrendingUp />} label="TikTok" handle="@voicesofharam.official" count="600+" color="text-primary" href="https://tiktok.com/@voicesofharam.official" />
            <ReachCard icon={<Twitter />} label="Threads" handle="@voicesofharam.official" count="6.5K+" color="text-[#7C3AED]" href="https://threads.net/@voicesofharam.official" />
          </div>
        </div>
      </section>

      {/* Sheikh Waleed Section */}
      <section className="py-40 bg-primary/5 border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
          <h2 className="text-5xl md:text-[120px] font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#DB2777] to-[#F97316] uppercase leading-none">Sheikh Waleed <br className="hidden md:block"/> Al-Shamsan</h2>
          <div className="relative inline-block">
            <div className="w-56 h-56 md:w-80 md:h-80 rounded-full p-2 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] shadow-3xl">
              <div className="w-full h-full rounded-full border-[10px] border-white overflow-hidden relative">
                <Image src="https://picsum.photos/seed/waleed/600/600" alt="Sheikh Waleed" fill className="object-cover" />
              </div>
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-8 md:px-10 py-4 rounded-full shadow-2xl border border-pink-100 flex items-center gap-4">
              <Instagram className="h-5 w-5 md:h-6 md:w-6 text-[#E1306C]" />
              <span className="font-black text-xl md:text-2xl tracking-tighter">7,000+</span>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-2xl md:text-3xl font-black tracking-tight text-primary uppercase">@sheikh_waleed_al_shamsan</p>
            <Button asChild variant="outline" className="rounded-full px-16 h-20 border-pink-200 text-pink-600 font-black tracking-widest text-sm uppercase transition-all hover:scale-105">
              <a href="https://instagram.com/sheikh_waleed_al_shamsan" target="_blank">FOLLOW PROFILE</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-40 px-6 max-w-7xl mx-auto w-full">
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-green-gradient uppercase mb-24 text-center md:text-left">Architectures</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((p) => (
            <div key={p.id} className="group cursor-pointer bg-white rounded-[3rem] border border-primary/5 hover:border-primary/20 hover:shadow-2xl transition-all overflow-hidden" onClick={() => setSelectedProject(p)}>
              <div className="relative aspect-video w-full overflow-hidden">
                <Image src={p.imgSrc} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-center gap-4">
                  <div className="p-4 bg-primary text-white rounded-2xl">{p.icon}</div>
                  <span className="px-4 py-2 glass-white rounded-full text-[10px] font-black tracking-widest uppercase text-primary">{p.category}</span>
                </div>
              </div>
              <div className="p-10 space-y-4">
                <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tighter group-hover:text-primary transition-colors">{p.title}</h4>
                <p className="text-muted-foreground font-medium text-lg leading-relaxed uppercase">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Station */}
      <footer className="py-40 bg-white border-t border-primary/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 lg:gap-24 mb-32">
            <div className="space-y-8">
              <span className="text-3xl font-black font-syne tracking-widest text-green-gradient uppercase">ARSALAN</span>
              <p className="text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase leading-relaxed">
                Software Architect & Digital Ecosystem Builder.<br />Engineering scalable futures for global icons.
              </p>
            </div>
            <div className="space-y-8">
              <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-primary">ECOSYSTEMS</h4>
              <ul className="space-y-4 text-[10px] font-bold text-muted-foreground tracking-widest uppercase">
                <li><a href="https://youtube.com/@VoicesOfHaram" className="hover:text-primary transition-colors">Voices of Haram</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">HappyChat App</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">HappyLinks App</a></li>
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-primary">CONNECT</h4>
              <div className="flex gap-4">
                <SocialLink icon={<Github />} href="https://github.com/arsalan" />
                <SocialLink icon={<Instagram />} href="https://instagram.com/voicesofharam.official" />
                <SocialLink icon={<Youtube />} href="https://youtube.com/@VoicesOfHaram" />
                <SocialLink icon={<Facebook />} href="https://facebook.com/voicesofharam.official" />
              </div>
            </div>
          </div>
          <div className="pt-20 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black text-muted-foreground tracking-[0.5em] uppercase text-center md:text-left">
            <span>&copy; 2026 ARSALAN GLOBAL ECOSYSTEMS. ALL RIGHTS RESERVED.</span>
            <div className="flex gap-8 md:gap-12">
              <span className="hover:text-primary cursor-pointer transition-colors">PRIVACY POLICY</span>
              <span className="hover:text-primary cursor-pointer transition-colors">TERMS OF SERVICE</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white/95 backdrop-blur-2xl border-primary/10 rounded-[2rem] md:rounded-[4rem]">
          {selectedProject && (
            <div className="flex flex-col">
              <div className="relative aspect-video w-full">
                <Image src={selectedProject.imgSrc} alt={selectedProject.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12">
                  <span className="px-6 py-2 glass-white rounded-full text-xs font-black text-primary uppercase tracking-widest mb-4 inline-block">{selectedProject.category}</span>
                  <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">{selectedProject.title}</h3>
                </div>
              </div>
              <div className="p-8 md:p-16 space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                  <div className="lg:col-span-2 space-y-6">
                    <h4 className="text-[10px] font-black text-primary tracking-[0.4em] uppercase">Architecture Overview</h4>
                    <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">{selectedProject.longDescription}</p>
                  </div>
                  <div className="space-y-10">
                    <div className="space-y-6">
                      <h4 className="text-[10px] font-black text-primary tracking-[0.4em] uppercase">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.stack.map((s: string) => (
                          <span key={s} className="px-4 py-2 rounded-xl bg-primary/5 text-[9px] font-bold text-primary uppercase border border-primary/10">{s}</span>
                        ))}
                      </div>
                    </div>
                    <Button asChild className="w-full h-16 rounded-full bg-primary text-white font-black tracking-widest text-xs uppercase shadow-2xl transition-transform hover:scale-105">
                      <a href={selectedProject.link} target="_blank">LAUNCH PROJECT <ExternalLink className="ml-2 h-4 w-4" /></a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
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
        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{handle}</p>
      </div>
      <div className={cn("text-5xl md:text-7xl font-black tracking-tighter", color)}>{count}</div>
      <span className="text-[8px] font-black text-muted-foreground/30 uppercase tracking-[0.5em]">FOLLOWERS REACH</span>
    </a>
  )
}

function SocialLink({ icon, href }: any) {
  return (
    <a href={href} target="_blank" className="w-12 h-12 md:w-14 md:h-14 rounded-full glass-white flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 transition-all shadow-xl border border-primary/5">
      {React.cloneElement(icon as React.ReactElement, { className: "h-5 w-5 md:h-6 md:w-6" })}
    </a>
  )
}
