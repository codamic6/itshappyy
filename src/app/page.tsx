"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Github, Linkedin, Mail, ExternalLink, Code2, MessageSquare, Link as LinkIcon, Youtube, Instagram, Globe, Award, Sparkles, Zap, ChevronRight, Laptop, Brain, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import placeholderData from '@/app/lib/placeholder-images.json'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

export default function PortfolioPage() {
  const images = placeholderData.placeholderImages;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  // Smart Navbar Scroll Logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY.current ? "down" : "up";
    if (direction === "down" && latest > 150) {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true);
    }
    lastScrollY.current = latest;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { name: 'Engineering', href: '#apps' },
    { name: 'Strategy', href: '#brands' },
    { name: 'Expertise', href: '#about' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-primary/10 overflow-x-hidden w-full select-none text-foreground relative">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="bubble w-[600px] h-[600px] -top-20 -left-20 animate-float" style={{ animationDelay: '0s' }} />
        <div className="bubble w-[500px] h-[500px] top-[40%] -right-20 animate-float" style={{ animationDelay: '2s' }} />
        <div className="bubble w-[400px] h-[400px] -bottom-20 left-[20%] animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Detached Smart Navigation */}
      <motion.nav 
        animate={{ y: isNavVisible ? 0 : -100, opacity: isNavVisible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-4 left-4 right-4 z-50 flex items-center justify-center pointer-events-none"
      >
        <div className="max-w-7xl w-full glass-white h-16 md:h-18 px-6 md:px-10 flex items-center justify-between rounded-full border border-primary/10 pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-black tracking-[0.3em] font-syncopate text-green-gradient uppercase">ARSALAN</span>
          </div>
          
          <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-primary transition-colors cursor-pointer">
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button className="hidden sm:flex rounded-full px-6 bg-primary text-white hover:bg-primary/90 font-black text-[10px] tracking-[0.2em] uppercase shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              WORK WITH ME
            </Button>
            
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 text-primary hover:bg-primary/5 rounded-full transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer (Restructured) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-md z-[60] md:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[80%] bg-white z-[70] border-l border-primary/10 flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="p-8 flex items-center justify-between border-b border-primary/5">
                <span className="text-xs font-black tracking-[0.3em] text-green-gradient uppercase">MENU</span>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-primary hover:bg-primary/5 rounded-full transition-colors"
                >
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
                      className="text-3xl font-black text-foreground hover:text-primary tracking-tight uppercase transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
                
                <div className="h-px bg-primary/10" />
                
                <div className="space-y-4">
                  <span className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">Social Channels</span>
                  <div className="flex gap-4">
                    <SocialLink icon={<Github />} href="#" />
                    <SocialLink icon={<Instagram />} href="#" />
                    <SocialLink icon={<Mail />} href="#" />
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-primary/5 bg-primary/5">
                <Button className="w-full rounded-full py-7 bg-primary text-white hover:bg-primary/90 font-black text-xs tracking-[0.3em] uppercase shadow-xl shadow-primary/20">
                  LET'S CONNECT
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section (Locked Fit) */}
      <section className="h-screen max-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 pt-16 md:pt-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-6xl text-center space-y-6 md:space-y-10 w-full"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-green text-[9px] md:text-[11px] font-black text-primary tracking-[0.4em] uppercase mx-auto border border-primary/10"
          >
            <Sparkles className="h-3 w-3 animate-pulse" />
            Software Architect & Digital Ecosystem Builder
          </motion.div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[100px] font-black tracking-tighter leading-[0.9] text-green-gradient uppercase w-full max-w-5xl mx-auto break-words">
            FROM <br className="hidden sm:block" />
            <span className="text-primary italic tracking-tight underline decoration-primary/20">DEVELOPMENT</span> <br />
            TO CREATION.
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs md:text-xl text-muted-foreground max-w-2xl mx-auto font-black leading-relaxed px-4 break-words opacity-70"
          >
            Engineering scalable platforms like <span className="text-primary underline">HappyChat</span> and managing global media ecosystems with millions of followers.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button size="lg" className="rounded-full px-10 bg-primary text-white hover:bg-primary/90 font-black text-[10px] tracking-[0.4em] h-14 uppercase shadow-2xl shadow-primary/30 transition-all hover:scale-105">
              VIEW CASE STUDIES
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-10 border-primary/20 glass-white hover:bg-primary/5 font-black text-[10px] tracking-[0.4em] h-14 text-primary uppercase transition-all hover:scale-105">
              GET IN TOUCH
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Engineering Section */}
      <section id="apps" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full relative">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-green-gradient uppercase">Engineering</h2>
            <p className="text-muted-foreground text-sm max-w-md font-black uppercase tracking-widest opacity-60">High-performance tools for the digital age.</p>
          </div>
          <div className="h-px flex-1 bg-primary/10 mx-12 hidden md:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <ProjectCard 
            title="HappyChat" 
            category="Communication Architecture"
            icon={<MessageSquare className="h-5 w-5" />}
            imgSrc={images[1]?.imageUrl}
            imgHint="messaging application interface"
            description="A high-security, real-time messaging ecosystem built for seamless global communication."
            stack={['Next.js', 'Firebase', 'TypeScript']}
          />
          <ProjectCard 
            title="HappyLinks" 
            category="Identity Management"
            icon={<LinkIcon className="h-5 w-5" />}
            imgSrc={images[2]?.imageUrl}
            imgHint="biolink profile dashboard"
            description="Advanced digital identity aggregator for high-impact creators and digital brands."
            stack={['React', 'Node.js', 'Tailwind']}
          />
        </div>
      </section>

      {/* Strategy Section */}
      <section id="brands" className="py-24 md:py-32 bg-secondary/50 border-y border-primary/5 w-full relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-green-gradient uppercase">Strategy</h2>
              <p className="text-muted-foreground text-sm max-w-md font-black uppercase tracking-widest opacity-60">Managing massive global ecosystems reaching millions.</p>
            </div>
            <div className="flex gap-4">
              <SocialIcon icon={<Youtube />} />
              <SocialIcon icon={<Instagram />} />
              <SocialIcon icon={<Globe />} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <ProjectCard 
              title="Voices of Haram" 
              category="Digital Ecosystem"
              icon={<Globe className="h-5 w-5" />}
              imgSrc={images[3]?.imageUrl}
              imgHint="brand media platform presentation"
              description="A multi-platform digital brand with a global footprint of millions across YouTube and Instagram."
              stats="3.5M+ Global Audience"
            />
            <ProjectCard 
              title="Sheikh Waleed" 
              category="Presence Management"
              icon={<Instagram className="h-5 w-5" />}
              imgSrc={images[4]?.imageUrl}
              imgHint="influencer profile dashboard"
              description="Strategic optimization and digital footprint management for global religious icons."
              stats="Engagement Peak: 15%"
            />
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
          <ExpertiseItem 
            icon={<Laptop className="h-10 w-10" />}
            title="Development"
            description="Architecting robust cloud-native applications with a focus on performance and real-time synchronization."
          />
          <ExpertiseItem 
            icon={<Zap className="h-10 w-10" />}
            title="Ecosystems"
            description="Scaling digital brands to millions of users through technical optimization and strategic growth hacking."
          />
          <ExpertiseItem 
            icon={<Brain className="h-10 w-10" />}
            title="Full-Stack Design"
            description="Bridging the gap between technical engineering and creative vision for high-impact digital products."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-primary/5 bg-white w-full relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-xl font-black tracking-[0.4em] font-syncopate text-green-gradient uppercase">ARSALAN</span>
            <p className="text-[9px] font-black text-muted-foreground tracking-[0.3em] uppercase">Built to Lead. Engineered to Scale.</p>
          </div>
          
          <div className="flex gap-8">
            <SocialLink icon={<Github />} href="#" />
            <SocialLink icon={<Instagram />} href="#" />
            <SocialLink icon={<Youtube />} href="#" />
            <SocialLink icon={<Mail />} href="#" />
          </div>

          <div className="text-[9px] font-black text-muted-foreground tracking-[0.5em] uppercase font-mono text-center md:text-left">
            &copy; 2024 / ENGINEERED_BY_ARSALAN
          </div>
        </div>
      </footer>
    </div>
  )
}

function ProjectCard({ title, category, icon, imgSrc, imgHint, description, stack, stats }: any) {
  return (
    <Card className="luxury-card rounded-[2rem] group cursor-pointer w-full bg-white border-primary/5 hover:border-primary/20">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        <Image 
          src={imgSrc || "https://picsum.photos/seed/default/600/400"} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          data-ai-hint={imgHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-6 left-6 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary text-white shadow-2xl transition-transform group-hover:scale-110">
            {icon}
          </div>
          <span className="px-4 py-2 rounded-full glass-white text-[9px] font-black text-primary uppercase tracking-[0.3em] border border-white/20">
            {category}
          </span>
        </div>
      </div>
      <CardContent className="p-8 md:p-12 space-y-6">
        <div className="space-y-4">
          <h4 className="text-2xl md:text-4xl font-black group-hover:text-primary transition-colors uppercase tracking-tight">{title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed font-black opacity-70">{description}</p>
        </div>

        {stack && (
          <div className="flex flex-wrap gap-2 pt-2">
            {stack.map((item: string) => (
              <span key={item} className="px-3 py-1 rounded-lg bg-primary/5 border border-primary/10 text-[9px] font-black text-primary uppercase tracking-widest font-mono">
                {item}
              </span>
            ))}
          </div>
        )}

        {stats && (
          <div className="text-[10px] font-black text-primary tracking-[0.3em] font-mono uppercase bg-primary/10 p-3 rounded-xl inline-block border border-primary/10">
            {stats}
          </div>
        )}

        <div className="pt-6 flex items-center gap-3 text-primary font-black text-[11px] tracking-[0.5em] uppercase group-hover:translate-x-4 transition-transform">
          VIEW CASE STUDY <ChevronRight className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  )
}

function ExpertiseItem({ icon, title, description }: any) {
  return (
    <div className="space-y-6 group w-full p-8 rounded-[2.5rem] hover:bg-primary/5 transition-all duration-700 border border-transparent hover:border-primary/10">
      <div className="w-20 h-20 rounded-3xl glass-green flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-xl border border-primary/10">
        {React.cloneElement(icon as React.ReactElement, { className: "text-primary h-10 w-10 group-hover:text-white transition-colors" })}
      </div>
      <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground uppercase tracking-[0.1em]">{title}</h3>
      <p className="text-muted-foreground text-[12px] md:text-sm leading-relaxed font-black opacity-60">
        {description}
      </p>
    </div>
  )
}

function SocialIcon({ icon }: any) {
  return (
    <div className="p-4 rounded-full glass-white text-primary hover:scale-110 hover:bg-primary hover:text-white transition-all shadow-xl border border-primary/10 cursor-pointer">
      {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6" })}
    </div>
  )
}

function SocialLink({ icon, href }: any) {
  return (
    <a 
      href={href} 
      className="w-12 h-12 rounded-full glass-white flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 hover:scale-110 transition-all duration-300 shadow-xl border border-primary/5"
    >
      {React.cloneElement(icon as React.ReactElement, { className: "h-5 w-5" })}
    </a>
  )
}
