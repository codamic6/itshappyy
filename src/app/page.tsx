"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Github, Linkedin, Mail, ExternalLink, Code2, MessageSquare, Link as LinkIcon, Youtube, Instagram, Globe, Award, Sparkles, Zap, ChevronRight, Laptop, Brain, Menu, X, Facebook, Twitter, GraduationCap, MapPin, Send, TrendingUp, Users, PlayCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import placeholderData from '@/app/lib/placeholder-images.json'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function PortfolioPage() {
  const images = placeholderData.placeholderImages;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

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
    { name: 'Projects', href: '#projects' },
    { name: 'YouTube', href: '#youtube' },
    { name: 'Facebook', href: '#facebook' },
    { name: 'Sheikh Waleed', href: '#sheikh-waleed' },
    { name: 'Contact', href: '#contact' },
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
            <span className="text-2xl font-black tracking-tight font-syne text-green-gradient uppercase cursor-pointer">ARSALAN</span>
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
                <div className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <a 
                      key={link.name} 
                      href={link.href} 
                      onClick={() => setIsMenuOpen(false)}
                      className="text-base font-medium text-foreground hover:text-primary tracking-tight uppercase transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
                <div className="h-px bg-primary/10" />
                <div className="space-y-4">
                  <span className="text-[9px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Social Channels</span>
                  <div className="flex gap-4">
                    <SocialLink icon={<Github />} href="https://github.com/arsalan" />
                    <SocialLink icon={<Instagram />} href="https://instagram.com/voicesofharam.official" />
                    <SocialLink icon={<Mail />} href="mailto:contact@voicesofharam.com" />
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-primary/5 bg-primary/5">
                <Button className="w-full rounded-full py-6 bg-primary text-white font-bold text-[10px] tracking-[0.2em] uppercase">
                  START A PROJECT
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl text-center space-y-10 w-full"
        >
          <div className="inline-flex items-center gap-2 px-8 py-3 rounded-full glass-green text-[10px] font-black text-primary tracking-[0.4em] uppercase mx-auto border border-primary/10">
            <Sparkles className="h-3 w-3 animate-pulse" />
            Software Architect & Digital Ecosystem Builder
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-black tracking-tighter leading-[0.9] text-green-gradient uppercase">
            FROM <span className="text-primary italic">DEVELOPMENT</span> <br />
            TO CONTENT CREATION.
          </h1>
          
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed uppercase tracking-tight opacity-70">
            Engineering scalable platforms like <span className="text-primary font-bold">HappyChat</span> and managing global media ecosystems with millions of followers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Button size="lg" className="rounded-full px-12 bg-primary text-white hover:scale-105 active:scale-95 font-black text-[11px] tracking-[0.4em] h-16 uppercase shadow-2xl transition-all">
              VIEW PROJECTS
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
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-green-gradient uppercase">About Me</h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed font-medium">
              <p>I bridge the gap between complex software engineering and massive audience engagement. As the founder of <span className="text-primary font-bold">Voices of Haram</span>, I manage a digital brand that reaches millions globally.</p>
              <p>My technical expertise lies in building real-time communication tools and brand aggregators, ensuring high performance under extreme scale.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl">
            <Image src="https://picsum.photos/seed/arsalan-profile/800/800" alt="Arsalan Profile" fill className="object-cover" data-ai-hint="professional architect profile" />
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 max-w-7xl mx-auto w-full">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-green-gradient uppercase mb-24">Engineering</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ProjectCard title="HappyChat" category="WhatsApp Alternative" icon={<MessageSquare className="h-5 w-5" />} imgSrc={images[1]?.imageUrl} description="A high-speed messaging ecosystem built for global connectivity." stack={['Next.js', 'Firebase', 'Socket.io']} />
          <ProjectCard title="HappyLinks" category="Linktree Alternative" icon={<LinkIcon className="h-5 w-5" />} imgSrc={images[2]?.imageUrl} description="Premium identity aggregator for creators and global media brands." stack={['React', 'PostgreSQL', 'Tailwind']} />
        </div>
      </section>

      {/* YouTube Section */}
      <section id="youtube" className="py-32 bg-[#1A1A1A] w-full text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-6xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#FF0000] to-[#991B1B] uppercase">YouTube</h2>
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#FF0000]/10 border border-[#FF0000]/20 text-[#FF0000] font-black text-xs tracking-widest uppercase">
                Voices of Haram @VoicesOfHaram
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <span className="text-6xl md:text-8xl font-black tracking-tighter text-white">30K+</span>
              <span className="text-[10px] font-black tracking-[0.5em] text-white/40 uppercase">Subscribers</span>
              <Button asChild className="mt-4 bg-[#FF0000] text-white hover:bg-[#CC0000] rounded-full px-10 h-14 font-black tracking-[0.3em] text-[10px]">
                <a href="https://youtube.com/@VoicesOfHaram" target="_blank">SUBSCRIBE NOW</a>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-video relative rounded-3xl overflow-hidden group cursor-pointer border border-white/10 shadow-2xl">
                <Image src={`https://picsum.photos/seed/yt-${i}/600/400`} alt="Video" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="h-16 w-16 text-[#FF0000]" />
                </div>
              </div>
            ))}
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
              <h2 className="text-6xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#1877F2] to-[#054ada] uppercase">Facebook</h2>
              <p className="text-xl font-bold text-muted-foreground uppercase tracking-widest">Global Community Presence</p>
              <Button asChild className="bg-[#1877F2] text-white hover:bg-[#1565C0] rounded-full px-12 h-16 font-black tracking-widest text-xs uppercase shadow-xl shadow-blue-500/20">
                <a href="https://facebook.com/voicesofharam.official" target="_blank">VIEW PAGE</a>
              </Button>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2 relative z-10">
              <div className="flex items-center gap-4 text-[#1877F2]">
                <Users className="h-10 w-10" />
                <span className="text-7xl md:text-9xl font-black tracking-tighter">25M+</span>
              </div>
              <span className="text-xs font-black tracking-[0.5em] text-[#1877F2]/40 uppercase">Total Reach & Followers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Others Section (Insta/TikTok/Threads) */}
      <section className="py-32 bg-white w-full">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#E1306C] to-[#833AB4] uppercase mb-20 text-center">Multi-Platform Reach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard icon={<Instagram />} label="Instagram" handle="@voicesofharam.official" count="1K+" color="text-[#E1306C]" href="https://instagram.com/voicesofharam.official" />
            <StatCard icon={<TrendingUp />} label="TikTok" handle="@voicesofharam.official" count="600+" color="text-[#000000]" href="https://tiktok.com/@voicesofharam.official" />
            <StatCard icon={<Twitter />} label="Threads" handle="@voicesofharam.official" count="6.5K+" color="text-[#000000]" href="https://threads.net/@voicesofharam.official" />
          </div>
        </div>
      </section>

      {/* Sheikh Waleed Section */}
      <section id="sheikh-waleed" className="py-32 bg-primary/5 w-full border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center space-y-12">
            <h2 className="text-5xl md:text-[100px] font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#E1306C] to-[#F56040] uppercase leading-none">Sheikh Waleed <br/> Al-Shamsan</h2>
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
          <p className="text-xl font-medium text-muted-foreground max-w-2xl mx-auto">Whether it's for engineering or brand strategy, let's build something massive together.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Button size="lg" className="rounded-full px-12 bg-primary text-white h-16 font-black tracking-widest uppercase shadow-2xl transition-transform hover:scale-105">SEND MESSAGE</Button>
            <Button size="lg" variant="outline" className="rounded-full px-12 h-16 font-black tracking-widest uppercase border-primary/20 hover:bg-primary/5">EMAIL ARSALAN</Button>
          </div>
        </div>
      </section>

      {/* Footer (Long) */}
      <footer className="py-24 px-6 border-t border-primary/5 bg-white w-full relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
            <div className="space-y-6">
              <span className="text-2xl font-black tracking-tight font-syne text-green-gradient uppercase">ARSALAN</span>
              <p className="text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase leading-loose">
                Software Architect & Digital Ecosystem Builder.<br />Engineering scalable futures for global icons.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-xs font-black tracking-[0.3em] uppercase">Ecosystems</h4>
              <ul className="space-y-3 text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase">
                <li><a href="https://voicesofharam.com" className="hover:text-primary transition-colors">Voices of Haram</a></li>
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
              <h4 className="text-xs font-black tracking-[0.3em] uppercase">Availability</h4>
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-2 text-primary font-black text-[10px] tracking-widest uppercase">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Currently Accepting Projects
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-20 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-black text-muted-foreground tracking-[0.5em] uppercase">
            <div>&copy; 2024 ARSALAN GLOBAL ECOSYSTEMS.</div>
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

function ProjectCard({ title, category, icon, imgSrc, description, stack }: any) {
  return (
    <Card className="luxury-card rounded-[3rem] group cursor-pointer w-full bg-white border-primary/5 hover:border-primary/20">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <Image src={imgSrc || "https://picsum.photos/seed/default/600/400"} alt={title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-6 left-6 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary text-white shadow-2xl">{icon}</div>
          <span className="px-5 py-2 rounded-full glass-white text-[9px] font-black text-primary uppercase tracking-[0.2em]">{category}</span>
        </div>
      </div>
      <CardContent className="p-10 space-y-6">
        <h4 className="text-3xl font-black group-hover:text-primary transition-colors uppercase tracking-tight">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed font-medium opacity-70 uppercase tracking-tight">{description}</p>
        <div className="flex flex-wrap gap-2">
          {stack.map((item: string) => (
            <span key={item} className="px-3 py-1 rounded-lg bg-primary/5 text-[9px] font-bold text-primary uppercase tracking-widest font-mono border border-primary/10">{item}</span>
          ))}
        </div>
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
