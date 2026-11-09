"use client"

import React from 'react'
import { Github, Linkedin, Mail, ExternalLink, Code2, MessageSquare, Link as LinkIcon, Youtube, Instagram, Globe, Award, Sparkles, Zap, ChevronRight, Laptop, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import placeholderData from '@/app/lib/placeholder-images.json'
import { motion } from 'framer-motion'

export default function PortfolioPage() {
  const images = placeholderData.placeholderImages;

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-black h-20 flex items-center px-6 md:px-12 justify-between border-b border-primary/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-[#B8860B] rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Award className="h-6 w-6 text-black" />
          </div>
          <span className="text-xl font-bold tracking-[0.2em] font-syncopate text-gold-gradient uppercase">CARET</span>
        </div>
        
        <div className="hidden md:flex gap-10 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground font-inter">
          <a href="#apps" className="hover:text-primary transition-colors cursor-pointer">Development</a>
          <a href="#brands" className="hover:text-primary transition-colors cursor-pointer">Ecosystems</a>
          <a href="#about" className="hover:text-primary transition-colors cursor-pointer">Expertise</a>
        </div>

        <Button className="rounded-full px-6 bg-primary text-black hover:bg-primary/90 font-semibold text-[10px] tracking-[0.2em] border border-primary/50 shadow-inner font-inter uppercase">
          CONTACT
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 pt-20">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl text-center space-y-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-gold text-[10px] font-medium text-primary tracking-[0.4em] uppercase font-mono">
            <Sparkles className="h-3 w-3 animate-pulse" />
            Software Architect & Digital Visionary
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold tracking-[0.1em] leading-[1.1] text-gold-gradient font-syncopate uppercase">
            Engineering Code. <br /> 
            Inspiring <span className="text-white italic font-inter tracking-normal">Millions</span>.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed font-inter">
            Full-Stack Applications development aur massive digital platforms scaling ka tajurba. 
            From <span className="text-primary font-bold">HappyChat</span> to <span className="text-primary font-bold">Voices of Haram</span>.
          </p>
          
          <div className="pt-8 flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="rounded-full px-12 bg-primary text-black hover:bg-primary/90 font-bold text-[10px] tracking-[0.3em] shadow-xl shadow-primary/10 h-16 font-inter uppercase">
              VIEW MY WORK
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-12 border-primary/20 bg-primary/5 hover:bg-primary/10 font-bold text-[10px] tracking-[0.3em] h-16 text-primary font-inter uppercase">
              LET'S TALK
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Development Section */}
      <section id="apps" className="py-40 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-24 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gold-gradient font-inter">Full Stack Development</h2>
            <p className="text-muted-foreground text-sm max-w-md font-medium font-inter">Functional and scalable web & mobile applications designed for real-world impact.</p>
          </div>
          <div className="h-px flex-1 bg-primary/10 mx-12 hidden md:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <ProjectCard 
            title="HappyChat" 
            category="Communication App"
            icon={<MessageSquare className="h-5 w-5" />}
            imgSrc={images[1]?.imageUrl}
            imgHint="modern messaging application ui"
            description="A real-time messaging platform inspired by WhatsApp. Features secure end-to-end feel and instant communication."
            stack={['Next.js', 'Firebase', 'Tailwind']}
          />
          <ProjectCard 
            title="HappyLinks" 
            category="Link Management"
            icon={<LinkIcon className="h-5 w-5" />}
            imgSrc={images[2]?.imageUrl}
            imgHint="linktree style biolink interface"
            description="High-performance Linktree alternative for creators. Manage multiple digital identities from one elegant dashboard."
            stack={['React Native', 'Node.js', 'PostgreSQL']}
          />
        </div>
      </section>

      {/* Brands/Ecosystems Section */}
      <section id="brands" className="py-40 bg-[#050505] border-y border-primary/10">
        <div className="max-w-7xl auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-8 mx-auto">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gold-gradient font-inter">Digital Ecosystems</h2>
              <p className="text-muted-foreground text-sm max-w-md font-medium font-inter">Building and managing massive global brands across multiple social platforms.</p>
            </div>
            <div className="flex gap-4">
              <div className="p-3 rounded-full glass-black text-primary hover:scale-110 transition-transform"><Youtube /></div>
              <div className="p-3 rounded-full glass-black text-primary hover:scale-110 transition-transform"><Instagram /></div>
              <div className="p-3 rounded-full glass-black text-primary hover:scale-110 transition-transform"><Globe /></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
             <ProjectCard 
              title="Voices of Haram" 
              category="Global Islamic Brand"
              icon={<Globe className="h-5 w-5" />}
              imgSrc={images[3]?.imageUrl}
              imgHint="islamic media platform branding"
              description="A multi-platform digital brand (YT, FB, Insta, TikTok) and website reaching millions globally with high-quality content."
              stats="3.5M+ Followers"
            />
            <ProjectCard 
              title="Sheikh Waleed Al Shamsan" 
              category="Presence Management"
              icon={<Instagram className="h-5 w-5" />}
              imgSrc={images[4]?.imageUrl}
              imgHint="instagram management dashboard"
              description="Strategic social media management and brand growth for prominent personalities, ensuring maximum impact."
              stats="Engagement Rate: 12%"
            />
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="about" className="py-40 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          <ExpertiseItem 
            icon={<Laptop className="h-8 w-8" />}
            title="App Architecture"
            description="Full-stack development using Next.js, Firebase, aur React Native. Main functional products ko scaling ke liye optimize karta hoon."
          />
          <ExpertiseItem 
            icon={<Zap className="h-8 w-8" />}
            title="Digital Growth"
            description="Voices of Haram jaisa ecosystem build karne ka experience, jahan multiple platforms par Millions ki audience engage hoti hai."
          />
          <ExpertiseItem 
            icon={<Brain className="h-8 w-8" />}
            title="Strategic Strategy"
            description="Sheikh Waleed jaise baray accounts ki management aur social growth strategies jo measurable results deti hain."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section id="connect" className="py-40 px-6 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] -z-10" />
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gold-gradient mb-8 font-inter">Ready to Scale?</h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto font-medium font-inter">Available for high-impact software projects and digital brand strategy.</p>
        <Button size="lg" className="rounded-full px-12 bg-primary text-black hover:bg-primary/90 font-bold text-[10px] tracking-[0.4em] h-16 shadow-2xl shadow-primary/20 font-inter uppercase">
          GET IN TOUCH
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-primary/10 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold tracking-[0.3em] font-syncopate text-gold-gradient uppercase">CARET</span>
          </div>
          
          <div className="flex gap-8">
            <SocialLink icon={<Github />} href="#" />
            <SocialLink icon={<Instagram />} href="#" />
            <SocialLink icon={<Youtube />} href="#" />
            <SocialLink icon={<Mail />} href="#" />
          </div>

          <div className="text-[10px] font-medium text-muted-foreground tracking-[0.4em] uppercase font-mono">
            &copy; 2024 / ARCHITECT_OF_DIGITAL_WORLD
          </div>
        </div>
      </footer>
    </div>
  )
}

function ProjectCard({ title, category, icon, imgSrc, imgHint, description, stack, stats }: any) {
  return (
    <Card className="luxury-card rounded-[2rem] group cursor-pointer">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image 
          src={imgSrc || "https://picsum.photos/seed/default/600/400"} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          data-ai-hint={imgHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 flex items-center gap-3">
          <div className="p-2 rounded-lg glass-gold text-primary">
            {icon}
          </div>
          <span className="px-3 py-1 rounded-full glass-gold text-[9px] font-bold text-primary uppercase tracking-[0.2em] font-inter">
            {category}
          </span>
        </div>
      </div>
      <CardContent className="p-8 space-y-6">
        <div className="space-y-2">
          <h4 className="text-2xl font-bold group-hover:text-primary transition-colors text-white tracking-tight font-inter">{title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed font-medium font-inter">{description}</p>
        </div>

        {stack && (
          <div className="flex flex-wrap gap-2">
            {stack.map((item: string) => (
              <span key={item} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[8px] font-medium text-primary uppercase tracking-widest font-mono">
                {item}
              </span>
            ))}
          </div>
        )}

        {stats && (
          <div className="text-[9px] font-medium text-white/40 tracking-[0.2em] font-mono uppercase">
            {stats}
          </div>
        )}

        <div className="pt-4 flex items-center gap-2 text-primary font-bold text-[9px] tracking-[0.4em] uppercase group-hover:translate-x-2 transition-transform font-inter">
          See Details <ChevronRight className="h-3 w-3" />
        </div>
      </CardContent>
    </Card>
  )
}

function ExpertiseItem({ icon, title, description }: any) {
  return (
    <div className="space-y-6 group">
      <div className="w-16 h-16 rounded-2xl glass-gold flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-primary/5">
        {React.cloneElement(icon as React.ReactElement, { className: "text-primary h-8 w-8" })}
      </div>
      <h3 className="text-2xl font-bold tracking-tight text-white font-inter">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed font-medium font-inter">
        {description}
      </p>
    </div>
  )
}

function SocialLink({ icon, href }: any) {
  return (
    <a 
      href={href} 
      className="w-12 h-12 rounded-full glass-black flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
    >
      {React.cloneElement(icon as React.ReactElement, { className: "h-5 w-5" })}
    </a>
  )
}