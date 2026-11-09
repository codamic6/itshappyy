"use client"

import React from 'react'
import { Github, Linkedin, Mail, ExternalLink, Code2, Rocket, Brain, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import placeholderData from '@/app/lib/placeholder-images.json'

export default function PortfolioPage() {
  const images = placeholderData.placeholderImages;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-panel h-16 flex items-center px-8 justify-between">
        <span className="text-xl font-bold tracking-tighter uppercase">Portfolio</span>
        <div className="flex gap-8 text-sm font-medium text-white/60">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
        <div className="absolute inset-0 hero-gradient -z-10" />
        <div className="max-w-4xl text-center space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/40 mb-4 tracking-widest uppercase animate-pulse">
            Software Developer
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase">
            Creative <span className="text-white/20">Design</span> &<br />
            Precise <span className="text-white/20">Code</span>
          </h1>
          <p className="text-lg text-white/40 max-w-xl mx-auto font-light leading-relaxed">
            Bhai, main modern web technologies ke zariye high-performance apps aur sleek interfaces banata hoon. 
          </p>
          <div className="pt-8 flex gap-4 justify-center">
            <Button size="lg" className="rounded-full px-8 bg-white text-black hover:bg-white/90">
              View Projects
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 border-white/10 hover:bg-white/5">
              Contact Me
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-8 max-w-7xl mx-auto w-full">
        <div className="flex items-end justify-between mb-16">
          <div className="space-y-4">
            <span className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase">Selected Work</span>
            <h2 className="text-4xl font-bold uppercase tracking-tight">Main Projects</h2>
          </div>
          <Button variant="ghost" className="text-white/40 hover:text-white">View All <ChevronRight className="h-4 w-4 ml-2" /></Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard 
            title="E-Commerce Engine" 
            category="Web Application"
            imgSrc={images[1].imageUrl}
            imgHint={images[1].imageHint}
          />
          <ProjectCard 
            title="AI Content Hub" 
            category="Machine Learning"
            imgSrc={images[2].imageUrl}
            imgHint={images[2].imageHint}
          />
          <ProjectCard 
            title="Finance Tracker" 
            category="FinTech UI"
            imgSrc={images[3].imageUrl}
            imgHint={images[3].imageHint}
          />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 glass-panel border-y border-white/5">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
              <Code2 className="h-6 w-6 text-white/60" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight">Frontend Development</h3>
            <p className="text-white/40 text-sm leading-relaxed">React, Next.js, aur Tailwind CSS mein maharat. Sleek aur responsive design meri priority hai.</p>
          </div>
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
              <Brain className="h-6 w-6 text-white/60" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight">AI & Optimization</h3>
            <p className="text-white/40 text-sm leading-relaxed">Genkit aur Gemini ke zariye apps ko smart banana aur performace ko optimize karna.</p>
          </div>
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
              <Rocket className="h-6 w-6 text-white/60" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight">Cloud Integration</h3>
            <p className="text-white/40 text-sm leading-relaxed">Firebase aur AWS ke sath scalable backend systems aur real-time data integration.</p>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-20 px-8 border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tighter uppercase">Let's connect</h2>
            <p className="text-white/40 text-sm">Bhai, kaam ki baat ho ya sirf salaam, zaroor rabta karein.</p>
          </div>
          <div className="flex gap-4">
            <SocialIcon icon={<Github />} />
            <SocialIcon icon={<Linkedin />} />
            <SocialIcon icon={<Mail />} />
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/5 text-center text-[10px] text-white/20 uppercase tracking-[0.4em]">
          Built with Precision & Love • 2024
        </div>
      </footer>
    </div>
  )
}

function ProjectCard({ title, category, imgSrc, imgHint }: any) {
  return (
    <Card className="bg-transparent border-white/5 overflow-hidden group hover:border-white/20 transition-all cursor-pointer">
      <div className="relative aspect-[4/3] w-full bg-white/5">
        <Image 
          src={imgSrc} 
          alt={title} 
          fill 
          className="object-cover opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
          data-ai-hint={imgHint}
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
      </div>
      <CardContent className="p-6 space-y-2">
        <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">{category}</span>
        <h4 className="text-lg font-bold group-hover:text-white text-white/80 transition-colors uppercase">{title}</h4>
      </CardContent>
    </Card>
  )
}

function SocialIcon({ icon }: any) {
  return (
    <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:bg-white/5 hover:border-white/20 transition-all w-12 h-12">
      {React.cloneElement(icon, { className: "h-5 w-5 text-white/60" })}
    </Button>
  )
}