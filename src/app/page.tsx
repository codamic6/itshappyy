"use client"

import React from 'react'
import { Github, Linkedin, Mail, ExternalLink, Code2, Rocket, Brain, ChevronRight, Laptop, Cpu, Globe, Award, Sparkles, Zap } from 'lucide-react'
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
          <span className="text-xl font-black tracking-tighter text-gold-gradient">CARET</span>
        </div>
        
        <div className="hidden md:flex gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
          <a href="#work" className="hover:text-primary transition-colors cursor-pointer">Selected Work</a>
          <a href="#about" className="hover:text-primary transition-colors cursor-pointer">Expertise</a>
          <a href="#connect" className="hover:text-primary transition-colors cursor-pointer">Connect</a>
        </div>

        <Button className="rounded-full px-6 bg-primary text-black hover:bg-primary/90 font-bold text-xs tracking-widest border border-primary/50 shadow-inner">
          HIRE ME
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 pt-20">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] -z-10" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl text-center space-y-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold text-[10px] font-black text-primary tracking-[0.3em] uppercase">
            <Sparkles className="h-3 w-3 animate-pulse" />
            Product & Software Design
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] text-gold-gradient">
            Elegance in <br /> 
            Digital <span className="text-white italic">Architecture</span>.
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Main complex problems ko visual masterpiece aur scalable systems mein transform karta hoon. 
            Luxury design meets precision engineering.
          </p>
          
          <div className="pt-6 flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="rounded-full px-10 bg-primary text-black hover:bg-primary/90 font-black text-xs tracking-[0.2em] shadow-xl shadow-primary/10 h-14">
              VIEW PROJECTS
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-10 border-primary/20 bg-primary/5 hover:bg-primary/10 font-black text-xs tracking-[0.2em] h-14 text-primary">
              GET IN TOUCH
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="work" className="py-40 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-24 gap-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-black tracking-tighter text-gold-gradient">Selected Works</h2>
            <p className="text-muted-foreground text-sm max-w-md font-medium">Selected products that define my design philosophy and technical expertise.</p>
          </div>
          <div className="h-px flex-1 bg-primary/10 mx-12 hidden md:block" />
          <Button variant="ghost" className="text-primary hover:text-primary/80 p-0 h-auto flex items-center gap-2 font-black text-[10px] tracking-widest uppercase">
            Browse Archive <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <ProjectCard 
            title="Aurelius Engine" 
            category="Infrastructure"
            imgSrc={images[1]?.imageUrl || "https://picsum.photos/seed/gold1/600/400"}
            imgHint="luxury dashboard design"
            description="High-performance scalable architecture for modern enterprise solutions."
          />
          <ProjectCard 
            title="Lumina AI" 
            category="Intelligence"
            imgSrc={images[2]?.imageUrl || "https://picsum.photos/seed/gold2/600/400"}
            imgHint="advanced ai network"
            description="Predictive synthesis and generative intelligence for creative workflows."
          />
          <ProjectCard 
            title="Velvet Terminal" 
            category="Fintech"
            imgSrc={images[3]?.imageUrl || "https://picsum.photos/seed/gold3/600/400"}
            imgHint="premium financial interface"
            description="Next-generation trading platform with institutional-grade precision."
          />
        </div>
      </section>

      {/* Expertise Section */}
      <section id="about" className="py-40 bg-[#050505] border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            <ExpertiseItem 
              icon={<Laptop className="h-8 w-8" />}
              title="Creative Direction"
              description="Visual identity se lekar interaction design tak, main products ko aik unique aur premium personality deta hoon."
            />
            <ExpertiseItem 
              icon={<Brain className="h-8 w-8" />}
              title="Systems Design"
              description="Scalable aur robust design systems jo teams ko fast aur consistent rehne mein madad dete hain."
            />
            <ExpertiseItem 
              icon={<Zap className="h-8 w-8" />}
              title="Fullstack Craft"
              description="Modern tech stack (Next.js, TypeScript, Genkit) ke saath high-performance applications ki development."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="connect" className="py-40 px-6 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] -z-10" />
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-gold-gradient mb-8">Ready for the next <br /> big move?</h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto font-medium">Available for select freelance projects and strategic partnerships.</p>
        <Button size="lg" className="rounded-full px-12 bg-primary text-black hover:bg-primary/90 font-black text-xs tracking-[0.3em] h-16 shadow-2xl shadow-primary/20">
          TRANSMIT MESSAGE
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-primary/10 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-primary" />
            <span className="text-sm font-black tracking-widest text-gold-gradient">CARET</span>
          </div>
          
          <div className="flex gap-8">
            <SocialLink icon={<Github />} href="#" />
            <SocialLink icon={<Linkedin />} href="#" />
            <SocialLink icon={<Mail />} href="#" />
          </div>

          <div className="text-[10px] font-bold text-muted-foreground tracking-[0.3em] uppercase">
            &copy; 2024 / DESIGNED_FOR_2099
          </div>
        </div>
      </footer>
    </div>
  )
}

function ProjectCard({ title, category, imgSrc, imgHint, description }: any) {
  return (
    <Card className="luxury-card rounded-[2rem] group cursor-pointer">
      <div className="relative aspect-[16/11] w-full overflow-hidden">
        <Image 
          src={imgSrc} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          data-ai-hint={imgHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <span className="px-3 py-1 rounded-full glass-gold text-[9px] font-black text-primary uppercase tracking-[0.2em]">
            {category}
          </span>
        </div>
      </div>
      <CardContent className="p-8 space-y-4">
        <h4 className="text-2xl font-black group-hover:text-primary transition-colors text-white tracking-tight">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed font-medium">{description}</p>
        <div className="pt-4 flex items-center gap-2 text-primary font-black text-[9px] tracking-[0.3em] uppercase group-hover:translate-x-2 transition-transform">
          Explore Case Study <ChevronRight className="h-3 w-3" />
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
      <h3 className="text-2xl font-black tracking-tight text-white">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed font-medium">
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