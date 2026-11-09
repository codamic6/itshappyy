
"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Github, Linkedin, Mail, ExternalLink, Code2, MessageSquare, Link as LinkIcon, Youtube, Instagram, Globe, Award, Sparkles, Zap, ChevronRight, Laptop, Brain, Menu, X, Facebook, Twitter, GraduationCap, MapPin, Send, TrendingUp, Users, PlayCircle, Rocket, Layers, BookOpen, Star, Trophy, Clock, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import placeholderData from '@/app/lib/placeholder-images.json'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export default function PortfolioPage() {
  const images = placeholderData.placeholderImages;
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
    { name: 'Projects', href: '#projects' },
    { name: 'Voices of Haram', href: '#youtube' },
    { name: 'Community', href: '#facebook' },
    { name: 'Contact', href: '#contact' },
  ];

  const projects = [
    {
      id: 1,
      title: "HappyChat",
      category: "WhatsApp Alternative",
      icon: <MessageSquare className="h-5 w-5" />,
      imgSrc: images[1]?.imageUrl,
      description: "A high-speed messaging ecosystem built for global connectivity.",
      longDescription: "HappyChat is a revolutionary messaging platform designed to provide a secure and ultra-fast alternative to mainstream apps. It features end-to-end encryption and custom-built socket architecture.",
      stack: ['Next.js', 'Firebase', 'Socket.io', 'Tailwind'],
      link: "#"
    },
    {
      id: 2,
      title: "HappyLinks",
      category: "Linktree Alternative",
      icon: <LinkIcon className="h-5 w-5" />,
      imgSrc: images[2]?.imageUrl,
      description: "Premium identity aggregator for massive global media brands.",
      longDescription: "HappyLinks provides a centralized hub for digital identities. Designed specifically for high-reach content creators, it offers deep analytics and customizable themes.",
      stack: ['React', 'PostgreSQL', 'Tailwind', 'Node.js'],
      link: "#"
    }
  ];

  const educationTimeline = [
    { year: "2025-Current", title: "11th Grade - ICS", institution: "Punjab College Daewoo Road", details: "Specializing in Computer Sciences and Software Logic." },
    { year: "2025", title: "Class 10 Board - Matric", institution: "Faisalabad Board", details: "Massive Achievement: 1165/1200 marks. (Roll No 484655)" },
    { year: "2024", title: "Class 9 Board", institution: "Faisalabad Board", details: "3rd Position in Faisalabad Board with 525/545 marks. (Roll No 190511)" },
    { year: "Feb 2023", title: "Completion of Hifz-e-Quran", institution: "Independent Study", details: "Achieved record Hifz in 1 Year 9 Months. Record Revision (Duhrai) completed in just 1 Month (Normal: 6 months)." },
    { year: "2021-2022", title: "Hifz Focus", institution: "Al-Faisal Grammar School", details: "Dedicated sabbatical for intensive Hifz-e-Quran study." },
    { year: "2020", title: "Class 5", institution: "Al-Faisal Grammar School", details: "2nd Position with Academic Excellence." },
    { year: "2019", title: "Class 4", institution: "Al-Faisal Grammar School", details: "2nd Position - Consistent High Performer." },
    { year: "2018", title: "Class 3", institution: "Al-Faisal Grammar School", details: "4th Position - Strong competitive standing." },
    { year: "2017", title: "Class 2", institution: "Al-Faisal Grammar School", details: "2nd Position - Continued excellence." },
    { year: "2016", title: "Class 1", institution: "Al-Faisal Grammar School", details: "2nd Position - Early academic promise." },
    { year: "2015", title: "Prep", institution: "Al-Faisal Grammar School", details: "3rd Position - Foundation of success." },
    { year: "2014", title: "Nursery", institution: "Al-Faisal Grammar School", details: "The beginning of the educational journey." }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-primary/10 overflow-x-hidden w-full select-none text-foreground relative">
      
      {/* Animated Background Bubbles */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="bubble w-[600px] h-[600px] -top-20 -left-20 animate-float opacity-30 bg-primary/10" />
        <div className="bubble w-[500px] h-[500px] top-[40%] -right-20 animate-float opacity-20 bg-primary/5" style={{ animationDelay: '2s' }} />
        <div className="bubble w-[400px] h-[400px] -bottom-20 left-[20%] animate-float opacity-30 bg-primary/10" style={{ animationDelay: '4s' }} />
      </div>

      {/* Floating Smart Navbar */}
      <motion.nav 
        animate={{ y: isNavVisible ? 0 : -120, opacity: isNavVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 left-6 right-6 z-50 flex items-center justify-center pointer-events-none"
      >
        <div className="max-w-6xl w-full glass-white h-20 px-8 flex items-center justify-between rounded-[2rem] border border-primary/10 pointer-events-auto shadow-2xl shadow-black/5">
          <div className="flex items-center">
            <span className="text-2xl font-bold tracking-tight font-syne text-green-gradient uppercase cursor-pointer">ARSALAN</span>
          </div>
          
          <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-primary transition-colors cursor-pointer">
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button className="hidden sm:flex rounded-full px-8 bg-primary text-white hover:bg-primary/90 font-black text-[10px] tracking-[0.2em] h-12 uppercase shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              HIRE ME
            </Button>
            
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-3 text-primary hover:bg-primary/5 rounded-full transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer (80% Width) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-[60] md:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[80%] bg-white z-[70] border-l border-primary/10 flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="p-8 flex items-center justify-between border-b border-primary/5">
                <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">DIRECTORY</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-3 text-primary hover:bg-primary/5 rounded-full">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 p-8 space-y-10 overflow-y-auto">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a 
                      key={link.name} 
                      href={link.href} 
                      onClick={() => setIsMenuOpen(false)}
                      className="text-[10px] font-medium text-foreground hover:text-primary tracking-[0.1em] uppercase transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-8 border-t border-primary/5 bg-primary/5 mt-auto">
                <Button className="w-full rounded-full py-6 bg-primary text-white font-bold text-[10px] tracking-[0.2em] uppercase">
                  START A PROJECT
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden py-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl text-center w-full relative z-10"
        >
          <div className="space-y-0">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg md:text-xl font-light text-muted-foreground tracking-widest uppercase block mb-2"
            >
              I&apos;m a
            </motion.span>
            
            <div className="h-[80px] sm:h-[120px] md:h-[160px] flex items-center justify-center overflow-visible">
              <AnimatePresence mode="wait">
                <motion.h1 
                  key={roles[roleIndex]}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="text-5xl sm:text-7xl md:text-8xl lg:text-[120px] font-black tracking-tighter leading-none text-green-gradient uppercase italic py-2 overflow-visible px-4"
                >
                  {roles[roleIndex]}
                </motion.h1>
              </AnimatePresence>
            </div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.6 }}
            className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed uppercase tracking-tight mt-2"
          >
            From Development to Content Creation. Scaling massive digital ecosystems since 2023.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button size="lg" className="rounded-full px-12 bg-primary text-white hover:scale-105 active:scale-95 font-black text-[11px] tracking-[0.4em] h-16 uppercase shadow-2xl transition-all">
              EXPLORE WORK
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-12 border-primary/20 glass-white hover:scale-105 active:scale-95 font-black text-[11px] tracking-[0.4em] h-16 text-primary uppercase transition-all">
              GET IN TOUCH
            </Button>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-8">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-green-gradient uppercase">The Journey</h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed font-medium">
              <p>My journey is a testament to discipline and record-breaking focus. On <span className="text-primary font-bold">February 10, 2023</span>, I achieved the monumental milestone of <span className="text-primary font-bold">Hifz-e-Quran</span>, completing the entire Holy Book in just 1 Year and 9 Months.</p>
              <p>Setting a new record at my Madrasa, I completed the <span className="text-primary font-bold">Duhrai (Revision)</span> in only 1 Month—a task that typically takes 6 months for most students. This same intensity is what I bring to the computer field, which I entered in 2023 with a vision for online dominance.</p>
              <p>Founded on <span className="text-primary font-bold">June 14, 2025</span>, my brand <span className="text-primary font-bold">Voices of Haram</span> has scaled to global reach, bridging spiritual excellence with digital engineering.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl border border-primary/10">
            <Image src="https://picsum.photos/seed/arsalan-profile/800/800" alt="Arsalan Profile" fill className="object-cover" data-ai-hint="professional architect profile" />
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-32 px-6 max-w-7xl mx-auto w-full">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-green-gradient uppercase mb-24">Academic Record</h2>
        <div className="grid grid-cols-1 gap-8">
          {educationTimeline.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 md:p-12 rounded-[3rem] bg-white border border-primary/5 hover:border-primary/20 hover:shadow-2xl transition-all relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-1 rounded-full bg-primary/10 text-primary font-black text-[10px] tracking-widest uppercase">{item.year}</span>
                    <Star className="h-4 w-4 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">{item.title}</h3>
                  <p className="text-primary font-bold tracking-tight">{item.institution}</p>
                </div>
                <div className="max-w-md text-muted-foreground font-medium text-lg italic md:text-right">
                  {item.details}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 max-w-7xl mx-auto w-full">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-green-gradient uppercase mb-24">Engineering</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              {...project} 
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </section>

      {/* Project Details Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white/95 backdrop-blur-xl border-primary/10 rounded-[3rem]">
          {selectedProject && (
            <div className="flex flex-col">
              <div className="relative aspect-video w-full">
                <Image 
                  src={selectedProject.imgSrc} 
                  alt={selectedProject.title} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <span className="px-4 py-2 rounded-full glass-white text-[10px] font-black text-primary uppercase tracking-widest border border-white/20">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-4xl md:text-6xl font-black text-white mt-4 uppercase tracking-tighter">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>
              <div className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="md:col-span-2 space-y-4">
                    <h4 className="text-xs font-black text-primary tracking-[0.3em] uppercase">Overview</h4>
                    <p className="text-muted-foreground text-lg font-medium leading-relaxed">
                      {selectedProject.longDescription}
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-primary tracking-[0.3em] uppercase">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.stack.map((s: string) => (
                          <span key={s} className="px-3 py-1 rounded-lg bg-primary/5 text-[10px] font-bold text-primary uppercase border border-primary/10">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full rounded-full bg-primary text-white font-black tracking-widest text-xs h-14 uppercase shadow-xl">
                      VIEW LIVE PROJECT <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* YouTube Section */}
      <section id="youtube" className="py-32 bg-[#1A1A1A] w-full text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-red-gradient uppercase">Voices of Haram</h2>
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#FF0000]/10 border border-[#FF0000]/20 text-[#FF0000] font-black text-xs tracking-widest uppercase">
                Established 14 June 2025
              </div>
              <p className="text-white/60 text-lg font-medium max-w-xl">
                Global Recitation Network: Week Schedule, Recitation, Jummah Khutbah, Ramadan Taraweeh, Duas, Tahajjud, and Qiyam-ul-Layl.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <span className="text-6xl md:text-8xl font-black tracking-tighter text-[#FF0000]">30K+</span>
              <span className="text-[10px] font-black tracking-[0.5em] text-white/40 uppercase">Subscribers</span>
              <Button asChild className="mt-4 bg-[#FF0000] text-white hover:bg-[#CC0000] rounded-full px-10 h-14 font-black tracking-[0.3em] text-[10px]">
                <a href="https://youtube.com/@VoicesOfHaram" target="_blank">SUBSCRIBE NOW</a>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="aspect-video relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <iframe className="w-full h-full" src="https://www.youtube.com/embed/VOA8Gc44ZIE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
            <div className="aspect-video relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <iframe className="w-full h-full" src="https://www.youtube.com/embed/videoseries?list=PL5LTW_BwDVXJI_DVtF5CD80r5K9vx15wb" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
            <div className="aspect-video relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <iframe className="w-full h-full" src="https://www.youtube.com/embed/e5oHwAaDGSQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Facebook Section */}
      <section id="facebook" className="py-32 bg-[#F0F2F5] w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 bg-white p-12 md:p-20 rounded-[4rem] shadow-xl border border-blue-100 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 opacity-[0.03]">
              <Facebook className="w-96 h-96 text-[#1877F2]" />
            </div>
            <div className="space-y-6 relative z-10 text-center md:text-left">
              <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-blue-gradient uppercase">Community</h2>
              <p className="text-xl font-bold text-muted-foreground uppercase tracking-widest">Join our 25,000+ Strong Facebook Presence</p>
              <Button asChild className="bg-[#1877F2] text-white hover:bg-[#1565C0] rounded-full px-12 h-16 font-black tracking-widest text-xs uppercase shadow-xl shadow-blue-500/20">
                <a href="https://facebook.com/voicesofharam.official" target="_blank">VIEW PAGE</a>
              </Button>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2 relative z-10">
              <div className="flex items-center gap-4 text-[#1877F2]">
                <Users className="h-10 w-10" />
                <span className="text-7xl md:text-9xl font-black tracking-tighter">25K+</span>
              </div>
              <span className="text-xs font-black tracking-[0.5em] text-[#1877F2]/40 uppercase">Active Followers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Others Section */}
      <section className="py-32 bg-white w-full">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-pink-gradient uppercase mb-20 text-center">Platform Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard icon={<Instagram />} label="Instagram" handle="@voicesofharam.official" count="1K+" color="text-[#E1306C]" href="https://instagram.com/voicesofharam.official" />
            <StatCard icon={<TrendingUp />} label="TikTok" handle="@voicesofharam.official" count="600+" color="text-[#C13584]" href="https://tiktok.com/@voicesofharam.official" />
            <StatCard icon={<Twitter />} label="Threads" handle="@voicesofharam.official" count="6.5K+" color="text-[#E1306C]" href="https://threads.net/@voicesofharam.official" />
          </div>
        </div>
      </section>

      {/* Sheikh Waleed Section */}
      <section id="sheikh-waleed" className="py-32 bg-primary/5 w-full border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center space-y-12">
            <h2 className="text-5xl md:text-[100px] font-black tracking-tighter text-sheikh-gradient uppercase leading-none">Sheikh Waleed <br/> Al-Shamsan</h2>
            <div className="relative">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full p-2 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] shadow-2xl">
                <div className="w-full h-full rounded-full border-8 border-white overflow-hidden relative">
                  <Image src="https://picsum.photos/seed/waleed-shamsan/400/400" alt="Sheikh Waleed" fill className="object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-8 py-3 rounded-full shadow-xl border border-pink-100 flex items-center gap-3">
                <Instagram className="h-5 w-5 text-[#E1306C]" />
                <span className="font-black text-lg">7,000+</span>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-2xl font-bold tracking-tight text-primary">@sheikh_waleed_al_shamsan</p>
              <Button asChild variant="outline" className="rounded-full px-12 h-16 border-pink-200 text-pink-600 hover:bg-pink-50 font-black tracking-widest text-xs uppercase transition-all hover:scale-105">
                <a href="https://instagram.com/sheikh_waleed_al_shamsan" target="_blank">FOLLOW PROFILE</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 max-w-5xl mx-auto w-full">
        <div className="text-center space-y-12 bg-primary/5 p-16 rounded-[4rem] border border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <Send className="w-64 h-64 text-primary" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-green-gradient uppercase">Get In Touch</h2>
          <p className="text-xl font-medium text-muted-foreground max-w-2xl mx-auto">Collaborate on software architecture or brand strategy.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Button size="lg" className="rounded-full px-12 bg-primary text-white h-16 font-black tracking-widest uppercase shadow-2xl transition-transform hover:scale-105">SEND MESSAGE</Button>
            <Button size="lg" variant="outline" className="rounded-full px-12 h-16 font-black tracking-widest uppercase border-primary/20 hover:bg-primary/5">EMAIL ARSALAN</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-primary/5 bg-white w-full relative">
        <div className="max-w-7xl auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
            <div className="space-y-6">
              <span className="text-2xl font-bold tracking-tight font-syne text-green-gradient uppercase">ARSALAN</span>
              <p className="text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase leading-loose">
                Software Architect & Digital Ecosystem Builder.<br />Engineering scalable futures for global icons.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-xs font-black tracking-[0.3em] uppercase">Ecosystems</h4>
              <ul className="space-y-3 text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase">
                <li><a href="https://youtube.com/@VoicesOfHaram" className="hover:text-primary transition-colors">Voices of Haram</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">HappyChat App</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">HappyLinks App</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-black tracking-[0.3em] uppercase">Connect</h4>
              <div className="flex gap-4">
                <SocialLink icon={<Github />} href="https://github.com/arsalan" />
                <SocialLink icon={<Instagram />} href="https://instagram.com/voicesofharam.official" />
                <SocialLink icon={<Youtube />} href="https://youtube.com/@VoicesOfHaram" />
                <SocialLink icon={<Facebook />} href="https://facebook.com/voicesofharam.official" />
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-black tracking-[0.3em] uppercase">Status</h4>
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-2 text-primary font-black text-[10px] tracking-widest uppercase">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Accepting Projects
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-20 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-black text-muted-foreground tracking-[0.5em] uppercase">
            <div>&copy; 2026 ARSALAN GLOBAL ECOSYSTEMS.</div>
            <div className="flex gap-10">
              <span className="hover:text-primary cursor-pointer transition-colors">PRIVACY</span>
              <span className="hover:text-primary cursor-pointer transition-colors">TERMS</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function StatCard({ icon, label, handle, count, color, href }: any) {
  return (
    <a href={href} target="_blank" className="p-10 rounded-[3rem] bg-white border border-primary/5 hover:border-primary/20 hover:shadow-2xl transition-all group flex flex-col items-center text-center space-y-4">
      <div className={cn("p-6 rounded-full bg-primary/5 group-hover:scale-110 transition-transform", color)}>
        {React.cloneElement(icon as React.ReactElement, { className: "h-10 w-10" })}
      </div>
      <h4 className="text-xl font-black uppercase tracking-widest">{label}</h4>
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{handle}</p>
      <div className={cn("text-5xl font-black tracking-tighter", color)}>{count}</div>
      <span className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.4em]">Followers</span>
    </a>
  )
}

function ProjectCard({ title, category, icon, imgSrc, description, stack, onClick }: any) {
  return (
    <Card 
      className="luxury-card rounded-[3rem] group cursor-pointer w-full bg-white border-primary/5 hover:border-primary/20"
      onClick={onClick}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <Image src={imgSrc || "https://picsum.photos/seed/default/600/400"} alt={title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-6 left-6 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary text-white shadow-2xl">{icon}</div>
          <span className="px-5 py-2 rounded-full glass-white text-[9px] font-black text-primary uppercase tracking-[0.2em]">{category}</span>
        </div>
      </div>
      <CardContent className="p-10 space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-3xl font-black group-hover:text-primary transition-colors uppercase tracking-tight">{title}</h4>
          <Rocket className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed font-medium opacity-70 uppercase tracking-tight">{description}</p>
      </CardContent>
    </Card>
  )
}

function SocialLink({ icon, href }: any) {
  return (
    <a href={href} target="_blank" className="w-12 h-12 rounded-full glass-white flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 transition-all shadow-lg border border-primary/5">
      {React.cloneElement(icon as React.ReactElement, { className: "h-5 w-5" })}
    </a>
  )
}
