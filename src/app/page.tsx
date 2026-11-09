"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Github, Linkedin, Mail, ExternalLink, Code2, MessageSquare, Link as LinkIcon, Youtube, Instagram, Globe, Award, Sparkles, Zap, ChevronRight, Laptop, Brain, Menu, X, Facebook, Twitter, GraduationCap, MapPin, Send } from 'lucide-react'
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
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'YouTube', href: '#youtube' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-primary/10 overflow-x-hidden w-full select-none text-foreground relative">
      
      {/* Animated Background Bubbles */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="bubble w-[600px] h-[600px] -top-20 -left-20 animate-float opacity-40" />
        <div className="bubble w-[500px] h-[500px] top-[40%] -right-20 animate-float opacity-30" style={{ animationDelay: '2s' }} />
        <div className="bubble w-[400px] h-[400px] -bottom-20 left-[20%] animate-float opacity-50" style={{ animationDelay: '4s' }} />
      </div>

      {/* Floating Smart Navbar */}
      <motion.nav 
        animate={{ y: isNavVisible ? 0 : -120, opacity: isNavVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 left-6 right-6 z-50 flex items-center justify-center pointer-events-none"
      >
        <div className="max-w-6xl w-full glass-white h-20 px-8 flex items-center justify-between rounded-[2rem] border border-primary/10 pointer-events-auto shadow-2xl shadow-black/5">
          <div className="flex items-center">
            <span className="text-2xl font-black tracking-[0.3em] font-syncopate text-green-gradient uppercase cursor-pointer">ARSALAN</span>
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
                <span className="text-[10px] font-black tracking-[0.3em] text-green-gradient uppercase">DIRECTORY</span>
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
                      className="text-2xl font-bold text-foreground hover:text-primary tracking-tight uppercase transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
                <div className="h-px bg-primary/10" />
                <div className="space-y-4">
                  <span className="text-[9px] font-black tracking-[0.2em] text-muted-foreground uppercase">Social Channels</span>
                  <div className="flex gap-4">
                    <SocialLink icon={<Github />} href="#" />
                    <SocialLink icon={<Instagram />} href="#" />
                    <SocialLink icon={<Mail />} href="#" />
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-primary/5 bg-primary/5">
                <Button className="w-full rounded-full py-6 bg-primary text-white font-black text-[10px] tracking-[0.2em] uppercase">
                  START A PROJECT
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-6 pt-32 pb-20">
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
          
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[130px] font-black tracking-tighter leading-[0.85] text-green-gradient uppercase">
            FROM <br className="hidden sm:block" />
            <span className="text-primary italic tracking-tight underline decoration-primary/10">DEVELOPMENT</span> <br />
            TO CREATION.
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

      {/* About Me Section */}
      <section id="about" className="py-32 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-green-gradient uppercase">About Me</h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed font-medium">
              <p>I am a Full-Stack Developer and Digital Brand Ecosystem Architect. My journey bridges the gap between complex engineering and massive audience reach.</p>
              <p>Whether I'm building high-performance communication tools like HappyChat or managing million-follower platforms for global icons, my focus is always on scale and precision.</p>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <ExpertiseBadge icon={<Code2 className="h-4 w-4" />} text="Full-Stack Engineering" />
              <ExpertiseBadge icon={<Globe className="h-4 w-4" />} text="Ecosystem Management" />
              <ExpertiseBadge icon={<Brain className="h-4 w-4" />} text="Product Design" />
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl"
          >
            <Image 
              src="https://picsum.photos/seed/arsalan-profile/800/800" 
              alt="Arsalan Profile" 
              fill 
              className="object-cover"
              data-ai-hint="professional architect profile"
            />
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-32 bg-secondary/30 w-full relative">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-green-gradient uppercase mb-20 text-center">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <EducationCard year="2020 - 2024" degree="Computer Science" school="Tech University" desc="Specialized in Distributed Systems and Real-time Communication." />
            <EducationCard year="2018 - 2020" degree="Software Engineering" school="Global Institute" desc="Foundations of software architecture and algorithmic design." />
            <EducationCard year="2024 - Present" degree="Digital Strategy" school="Brand Masters" desc="Advanced management of digital ecosystems and audience growth." />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 max-w-7xl mx-auto w-full">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-green-gradient uppercase mb-24">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ProjectCard 
            title="HappyChat" 
            category="WhatsApp Alternative"
            icon={<MessageSquare className="h-5 w-5" />}
            imgSrc={images[1]?.imageUrl}
            description="A secure, high-speed messaging ecosystem built for global connectivity."
            stack={['Next.js', 'Firebase', 'Socket.io']}
          />
          <ProjectCard 
            title="HappyLinks" 
            category="Linktree Alternative"
            icon={<LinkIcon className="h-5 w-5" />}
            imgSrc={images[2]?.imageUrl}
            description="Premium identity aggregator for creators and global media brands."
            stack={['React', 'PostgreSQL', 'Tailwind']}
          />
        </div>
      </section>

      {/* Social Sections - YouTube */}
      <section id="youtube" className="py-32 bg-[#1A1A1A] w-full text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-red-gradient uppercase">YouTube</h2>
              <p className="text-white/40 font-mono text-[10px] tracking-[0.5em] uppercase">Voices of Haram @VoicesOfHaram</p>
            </div>
            <Button className="bg-[#991B1B] text-white hover:bg-[#B91C1C] rounded-full px-10 h-16 font-black tracking-[0.3em] text-xs">SUBSCRIBE</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-video relative rounded-3xl overflow-hidden group cursor-pointer border border-white/10">
                <Image src={`https://picsum.photos/seed/yt-${i}/600/400`} alt="Video" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Youtube className="h-12 w-12 text-[#991B1B]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Sections - Facebook */}
      <section className="py-32 bg-[#F0F2F5] w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-blue-gradient uppercase">Facebook</h2>
            <div className="flex items-center gap-6">
              <SocialIcon icon={<Facebook />} color="text-[#2563EB]" />
              <div className="text-right">
                <p className="font-black text-2xl text-[#2563EB]">1.2M+</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Followers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sheikh Waleed Section */}
      <section id="sheikh-waleed" className="py-32 bg-white w-full border-y border-pink-100">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-sheikh-gradient uppercase">Sheikh Waleed Al-Shamsan</h2>
          <div className="flex flex-col items-center gap-6">
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
              <div className="w-full h-full rounded-full border-4 border-white overflow-hidden relative">
                <Image src="https://picsum.photos/seed/waleed/200/200" alt="Sheikh Waleed" fill className="object-cover" />
              </div>
            </div>
            <p className="text-2xl font-bold tracking-tight">@sheikh_waleed_al_shamsan</p>
            <Button variant="outline" className="rounded-full px-10 border-pink-200 text-pink-600 hover:bg-pink-50 font-black tracking-widest">FOLLOW ON INSTA</Button>
          </div>
        </div>
      </section>

      {/* Others Section */}
      <section className="py-24 bg-black text-white w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-pink-gradient uppercase mb-16">TikTok / Threads / Insta</h2>
          <div className="flex flex-wrap justify-center gap-16 md:gap-32 opacity-50 grayscale hover:grayscale-0 transition-all">
            <SocialIcon icon={<Twitter />} color="text-white" label="Threads" />
            <SocialIcon icon={<Instagram />} color="text-white" label="Instagram" />
            <SocialIcon icon={<Globe />} color="text-white" label="Web" />
          </div>
        </div>
      </section>

      {/* Contact Me Section */}
      <section id="contact" className="py-32 px-6 max-w-5xl mx-auto w-full">
        <div className="text-center space-y-12 bg-primary/5 p-16 rounded-[4rem] border border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <Send className="w-64 h-64 text-primary" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-green-gradient uppercase">Contact Me</h2>
          <p className="text-xl font-medium text-muted-foreground max-w-2xl mx-auto">Let's discuss how we can build or manage your digital ecosystem.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
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
              <span className="text-2xl font-black tracking-[0.4em] font-syncopate text-green-gradient uppercase">ARSALAN</span>
              <p className="text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase leading-loose">
                Architecting digital futures.<br />From code to community, we lead the global presence of world-class brands.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-xs font-black tracking-[0.3em] uppercase">Core Navigation</h4>
              <ul className="space-y-3 text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase">
                <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#projects" className="hover:text-primary transition-colors">Engineering</a></li>
                <li><a href="#sheikh-waleed" className="hover:text-primary transition-colors">Digital Strategy</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Work With Me</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-black tracking-[0.3em] uppercase">Ecosystems</h4>
              <ul className="space-y-3 text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase">
                <li><a href="https://voicesofharam.com" className="hover:text-primary transition-colors">Voices of Haram</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">HappyChat App</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">HappyLinks App</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Strategy Labs</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-black tracking-[0.3em] uppercase">Connect</h4>
              <div className="flex gap-4">
                <SocialLink icon={<Github />} href="#" />
                <SocialLink icon={<Instagram />} href="#" />
                <SocialLink icon={<Youtube />} href="#" />
                <SocialLink icon={<Facebook />} href="#" />
              </div>
            </div>
          </div>
          
          <div className="pt-20 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-black text-muted-foreground tracking-[0.5em] uppercase">
            <div>&copy; 2024 ARSALAN GLOBAL ECOSYSTEMS. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-10">
              <span className="hover:text-primary cursor-pointer transition-colors">PRIVACY POLICY</span>
              <span className="hover:text-primary cursor-pointer transition-colors">TERMS OF SERVICE</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
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

function EducationCard({ year, degree, school, desc }: any) {
  return (
    <div className="p-10 rounded-[2.5rem] bg-white border border-primary/5 space-y-4 hover:shadow-2xl hover:shadow-primary/5 transition-all group">
      <div className="text-[10px] font-black text-primary tracking-[0.3em] font-mono">{year}</div>
      <h3 className="text-2xl font-black tracking-tight uppercase group-hover:text-primary transition-colors">{degree}</h3>
      <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-widest">
        <MapPin className="h-3 w-3" /> {school}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed font-medium opacity-70">{desc}</p>
    </div>
  )
}

function ExpertiseBadge({ icon, text }: any) {
  return (
    <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-primary/5 border border-primary/10 text-primary font-black text-[10px] tracking-[0.2em] uppercase">
      {icon} {text}
    </div>
  )
}

function SocialIcon({ icon, color, label }: any) {
  return (
    <div className="flex flex-col items-center gap-3 group cursor-pointer">
      <div className={cn("p-6 rounded-full glass-white hover:scale-110 transition-all shadow-xl border border-primary/10", color)}>
        {React.cloneElement(icon as React.ReactElement, { className: "h-8 w-8" })}
      </div>
      {label && <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40">{label}</span>}
    </div>
  )
}

function SocialLink({ icon, href }: any) {
  return (
    <a href={href} className="w-12 h-12 rounded-full glass-white flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 transition-all shadow-lg border border-primary/5">
      {React.cloneElement(icon as React.ReactElement, { className: "h-5 w-5" })}
    </a>
  )
}
