"use client"

import React, { useState, useEffect } from 'react'
import { Github, Linkedin, Mail, ExternalLink, Code2, MessageSquare, Link as LinkIcon, Youtube, Instagram, Globe, Award, Sparkles, Zap, ChevronRight, Laptop, Brain, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import placeholderData from '@/app/lib/placeholder-images.json'
import { motion, AnimatePresence } from 'framer-motion'

export default function PortfolioPage() {
  const images = placeholderData.placeholderImages;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { name: 'Development', href: '#apps' },
    { name: 'Ecosystems', href: '#brands' },
    { name: 'Expertise', href: '#about' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-primary/10 overflow-x-hidden w-full select-none text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-white h-16 md:h-20 flex items-center px-6 md:px-12 justify-between border-b border-primary/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-9 md:h-9 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/10">
            <Award className="h-4 w-4 md:h-5 md:w-5 text-white" />
          </div>
          <span className="text-base md:text-lg font-bold tracking-[0.2em] font-syncopate text-green-gradient uppercase truncate">ARSALAN</span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground font-inter">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-primary transition-colors cursor-pointer">
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button className="hidden sm:flex rounded-full px-6 bg-primary text-white hover:bg-primary/90 font-semibold text-[10px] tracking-[0.2em] font-inter uppercase shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
            CONTACT
          </Button>
          
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer (80% Width) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[80%] bg-white z-[70] border-l border-primary/10 flex flex-col p-8 md:hidden shadow-2xl"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="text-xs font-bold tracking-[0.2em] font-syncopate text-green-gradient uppercase">NAVIGATE</span>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-syncopate text-foreground hover:text-primary tracking-widest uppercase transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="h-px bg-primary/5 my-4" />
                <Button className="w-full rounded-full py-6 bg-primary text-white hover:bg-primary/90 font-bold text-xs tracking-[0.3em] font-inter uppercase shadow-xl shadow-primary/10">
                  GET IN TOUCH
                </Button>
              </div>
              <div className="mt-auto flex justify-center gap-6 pb-4">
                <SocialLink icon={<Github />} href="#" />
                <SocialLink icon={<Instagram />} href="#" />
                <SocialLink icon={<Mail />} href="#" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section (Locked h-screen Fit) */}
      <section className="h-screen max-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 pt-16 md:pt-20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[600px] aspect-square bg-primary/5 rounded-full blur-[120px] -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl text-center space-y-4 md:space-y-8 w-full"
        >
          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 rounded-full glass-green text-[8px] md:text-[10px] font-medium text-primary tracking-[0.3em] uppercase font-mono mx-auto max-w-fit border border-primary/10 mb-2">
            <Sparkles className="h-3 w-3 animate-pulse" />
            Software Architect & Digital Visionary
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[100px] font-black tracking-[-0.04em] leading-[0.95] text-green-gradient font-inter uppercase w-full max-w-5xl mx-auto">
            FROM <br className="hidden sm:block" />
            <span className="text-primary italic font-serif tracking-tight lowercase">development</span> <br />
            TO CREATION.
          </h1>
          
          <p className="text-xs md:text-lg text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed font-inter px-4 opacity-80">
            Building functional apps like <span className="text-primary font-bold">HappyChat</span> & <span className="text-primary font-bold">HappyLinks</span> while scaling digital brands like <span className="text-primary font-bold">Voices of Haram</span> to millions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 md:pt-6">
            <Button size="lg" className="rounded-full px-8 md:px-10 bg-primary text-white hover:bg-primary/90 font-bold text-[9px] md:text-[10px] tracking-[0.3em] h-12 md:h-14 font-inter uppercase shadow-xl shadow-primary/20 transition-transform hover:scale-105 active:scale-95">
              EXPLORE WORK
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 md:px-10 border-primary/20 glass-white hover:bg-primary/5 font-bold text-[9px] md:text-[10px] tracking-[0.3em] h-12 md:h-14 text-primary font-inter uppercase transition-transform hover:scale-105 active:scale-95">
              GET IN TOUCH
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Development Section */}
      <section id="apps" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 md:mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-green-gradient font-inter uppercase">Engineering Products</h2>
            <p className="text-muted-foreground text-sm max-w-md font-medium font-inter">Building functional and scalable digital tools designed for real-world impact.</p>
          </div>
          <div className="h-px flex-1 bg-primary/10 mx-12 hidden md:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <ProjectCard 
            title="HappyChat" 
            category="Communication App"
            icon={<MessageSquare className="h-5 w-5" />}
            imgSrc={images[1]?.imageUrl}
            imgHint="messaging application interface"
            description="A real-time messaging platform inspired by WhatsApp. Features secure end-to-end feel and instant communication."
            stack={['Next.js', 'Firebase', 'Tailwind']}
          />
          <ProjectCard 
            title="HappyLinks" 
            category="Digital Identity"
            icon={<LinkIcon className="h-5 w-5" />}
            imgSrc={images[2]?.imageUrl}
            imgHint="biolink profile dashboard"
            description="High-performance Linktree alternative for creators. Manage multiple digital identities from one elegant dashboard."
            stack={['React Native', 'Node.js', 'PostgreSQL']}
          />
        </div>
      </section>

      {/* Brands Section */}
      <section id="brands" className="py-20 md:py-32 bg-secondary/30 border-y border-primary/5 w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-green-gradient font-inter uppercase">Digital Strategy</h2>
              <p className="text-muted-foreground text-sm max-w-md font-medium font-inter">Architecting and managing massive global brands across multiple social platforms.</p>
            </div>
            <div className="flex gap-4">
              <div className="p-3 md:p-4 rounded-full glass-white text-primary hover:scale-110 transition-transform shadow-lg border border-primary/10"><Youtube className="h-6 w-6" /></div>
              <div className="p-3 md:p-4 rounded-full glass-white text-primary hover:scale-110 transition-transform shadow-lg border border-primary/10"><Instagram className="h-6 w-6" /></div>
              <div className="p-3 md:p-4 rounded-full glass-white text-primary hover:scale-110 transition-transform shadow-lg border border-primary/10"><Globe className="h-6 w-6" /></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
             <ProjectCard 
              title="Voices of Haram" 
              category="Media Ecosystem"
              icon={<Globe className="h-5 w-5" />}
              imgSrc={images[3]?.imageUrl}
              imgHint="brand media platform presentation"
              description="A multi-platform digital brand reaching millions globally with high-quality content across YT, FB, and Insta."
              stats="3.5M+ Global Audience"
            />
            <ProjectCard 
              title="Sheikh Waleed" 
              category="Digital Presence"
              icon={<Instagram className="h-5 w-5" />}
              imgSrc={images[4]?.imageUrl}
              imgHint="influencer profile dashboard"
              description="Strategic presence management and content optimization for prominent global figures."
              stats="Engagement Peak: 15%"
            />
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="about" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
          <ExpertiseItem 
            icon={<Laptop className="h-8 w-8" />}
            title="Development"
            description="Full-stack engineering focused on performance and scalability. Expert in React, Next.js and Cloud Architectures."
          />
          <ExpertiseItem 
            icon={<Zap className="h-8 w-8" />}
            title="Brand Growth"
            description="Architecting systems that reach millions. From content strategy to technical optimization of digital ecosystems."
          />
          <ExpertiseItem 
            icon={<Brain className="h-8 w-8" />}
            title="Strategic Design"
            description="Combining technical precision with creative vision to build products that users love and brands that matter."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-20 px-6 border-t border-primary/5 bg-white w-full">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold tracking-[0.3em] font-syncopate text-green-gradient uppercase">ARSALAN</span>
          </div>
          
          <div className="flex gap-6 md:gap-8">
            <SocialLink icon={<Github />} href="#" />
            <SocialLink icon={<Instagram />} href="#" />
            <SocialLink icon={<Youtube />} href="#" />
            <SocialLink icon={<Mail />} href="#" />
          </div>

          <div className="text-[8px] md:text-[9px] font-medium text-muted-foreground tracking-[0.4em] uppercase font-mono text-center md:text-left">
            &copy; 2024 / ENGINEERED_BY_ARSALAN
          </div>
        </div>
      </footer>
    </div>
  )
}

function ProjectCard({ title, category, icon, imgSrc, imgHint, description, stack, stats }: any) {
  return (
    <Card className="luxury-card rounded-[1.5rem] md:rounded-[2.5rem] group cursor-pointer w-full border-primary/5 hover:border-primary/20 transition-all duration-700 bg-white">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        <Image 
          src={imgSrc || "https://picsum.photos/seed/default/600/400"} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          data-ai-hint={imgHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 flex items-center gap-3">
          <div className="p-2 md:p-2.5 rounded-xl bg-primary text-white shadow-xl">
            {icon}
          </div>
          <span className="px-3 md:px-4 py-1.5 rounded-full glass-white text-[8px] md:text-[9px] font-black text-primary uppercase tracking-[0.2em] font-inter border border-white/20">
            {category}
          </span>
        </div>
      </div>
      <CardContent className="p-6 md:p-10 space-y-4 md:space-y-6">
        <div className="space-y-2 md:space-y-3">
          <h4 className="text-xl md:text-3xl font-black group-hover:text-primary transition-colors text-foreground tracking-tight font-inter uppercase">{title}</h4>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-medium font-inter">{description}</p>
        </div>

        {stack && (
          <div className="flex flex-wrap gap-2">
            {stack.map((item: string) => (
              <span key={item} className="px-2 md:px-3 py-1 rounded-md bg-primary/5 border border-primary/10 text-[8px] md:text-[9px] font-bold text-primary uppercase tracking-widest font-mono">
                {item}
              </span>
            ))}
          </div>
        )}

        {stats && (
          <div className="text-[8px] md:text-[10px] font-black text-primary tracking-[0.2em] font-mono uppercase bg-primary/5 p-2 rounded-md inline-block">
            {stats}
          </div>
        )}

        <div className="pt-2 md:pt-4 flex items-center gap-2 text-primary font-black text-[9px] md:text-[10px] tracking-[0.4em] uppercase group-hover:translate-x-3 transition-transform font-inter">
          Case Study <ChevronRight className="h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  )
}

function ExpertiseItem({ icon, title, description }: any) {
  return (
    <div className="space-y-4 md:space-y-6 group w-full p-4 md:p-6 rounded-2xl md:rounded-3xl hover:bg-primary/5 transition-all duration-500">
      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl glass-green flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-xl border border-primary/10">
        {React.cloneElement(icon as React.ReactElement, { className: "text-primary h-6 w-6 md:h-8 md:w-8 group-hover:text-white transition-colors" })}
      </div>
      <h3 className="text-lg md:text-2xl font-black tracking-tight text-foreground font-inter uppercase tracking-[0.1em]">{title}</h3>
      <p className="text-muted-foreground text-[11px] md:text-sm leading-relaxed font-medium font-inter">
        {description}
      </p>
    </div>
  )
}

function SocialLink({ icon, href }: any) {
  return (
    <a 
      href={href} 
      className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-white flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 hover:scale-110 transition-all duration-300 shadow-lg border border-primary/5"
    >
      {React.cloneElement(icon as React.ReactElement, { className: "h-4 w-4 md:h-5 md:w-5" })}
    </a>
  )
}
