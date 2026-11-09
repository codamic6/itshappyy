"use client"

import React from 'react'
import { Github, Linkedin, Mail, ExternalLink, Code2, Rocket, Brain, ChevronRight, Laptop, Cpu, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import placeholderData from '@/app/lib/placeholder-images.json'

export default function PortfolioPage() {
  const images = placeholderData.placeholderImages;

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/30 selection:text-primary">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-nav h-16 flex items-center px-8 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Cpu className="h-5 w-5 text-[#0F1115]" />
          </div>
          <span className="text-lg font-bold tracking-tight">TECH_PORTFOLIO</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          <a href="#about" className="hover:text-primary transition-colors">Experience</a>
          <a href="#projects" className="hover:text-primary transition-colors">Products</a>
          <a href="#skills" className="hover:text-primary transition-colors">Stack</a>
          <a href="#contact" className="hover:text-primary transition-colors">Connect</a>
        </div>
        <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary/10">
          Resume.pdf
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 pt-20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-4xl text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Software & Product Designer
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-gradient">
            Building digital products <br /> 
            with <span className="text-primary">precision</span> and <span className="text-primary">scale</span>.
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Main complex problems ko sleek interface aur scalable code mein tabdil karta hoon. 
            Focused on performance, accessibility, aur user experience.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-xl px-8 bg-primary text-[#0F1115] hover:bg-primary/90 font-bold shadow-lg shadow-primary/20">
              Explore Products
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl px-8 border-white/10 bg-white/5 hover:bg-white/10 font-bold">
              View Github
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Featured Releases</h2>
            <p className="text-muted-foreground text-sm max-w-md">Selected products that define my design philosophy and technical expertise.</p>
          </div>
          <Button variant="link" className="text-primary p-0 h-auto hover:no-underline flex items-center gap-2">
            Browse all <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard 
            title="Core Engine v2" 
            category="Infrastructure"
            imgSrc={images[1]?.imageUrl || "https://picsum.photos/seed/tech1/600/400"}
            imgHint="modern tech dashboard"
          />
          <ProjectCard 
            title="AI Synthesis Hub" 
            category="Intelligence"
            imgSrc={images[2]?.imageUrl || "https://picsum.photos/seed/tech2/600/400"}
            imgHint="ai data network"
          />
          <ProjectCard 
            title="FinFlow Terminal" 
            category="Productivity"
            imgSrc={images[3]?.imageUrl || "https://picsum.photos/seed/tech3/600/400"}
            imgHint="financial chart app"
          />
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="skills" className="py-32 bg-[#121418] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Laptop className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold tracking-tight">Frontend Architecture</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                React aur Next.js ke sath performance-first applications. 
                Sleek designs ko optimize karna meri specialty hai.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold tracking-tight">Product Strategy</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                User needs ko technical specifications mein transform karna. 
                Roadmap design se lekar deployment tak.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold tracking-tight">Cloud Ecosystem</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Firebase aur headless CMS ke sath real-time data flow. 
                Scalable solutions jo heavy load handle kar sakein.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-24 px-8 border-t border-white/5 bg-[#0F1115]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight">Let's build something <br /> impactful.</h2>
            <p className="text-muted-foreground text-lg">Next project ya partnership ke liye rabta karein.</p>
            <div className="flex gap-4">
              <SocialIcon icon={<Github />} />
              <SocialIcon icon={<Linkedin />} />
              <SocialIcon icon={<Mail />} />
            </div>
          </div>
          <div className="tech-card rounded-2xl p-8 space-y-6">
            <h3 className="text-lg font-bold">Quick Message</h3>
            <div className="grid gap-4">
              <div className="h-10 px-3 bg-black/20 border border-white/5 rounded-lg flex items-center text-sm text-muted-foreground">Name</div>
              <div className="h-10 px-3 bg-black/20 border border-white/5 rounded-lg flex items-center text-sm text-muted-foreground">Email</div>
              <div className="h-24 p-3 bg-black/20 border border-white/5 rounded-lg text-sm text-muted-foreground">Message...</div>
              <Button className="w-full bg-primary text-[#0F1115] font-bold">Transmit Inquiry</Button>
            </div>
          </div>
        </div>
        <div className="mt-24 pt-8 border-t border-white/5 text-center text-xs text-muted-foreground tracking-widest uppercase">
          &copy; 2024 TECH_PORTFOLIO / BUILT_WITH_PRECISION
        </div>
      </footer>
    </div>
  )
}

function ProjectCard({ title, category, imgSrc, imgHint }: any) {
  return (
    <Card className="tech-card rounded-2xl overflow-hidden group">
      <div className="relative aspect-[16/10] w-full">
        <Image 
          src={imgSrc} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          data-ai-hint={imgHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115]/90 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="px-2 py-1 rounded bg-primary/20 backdrop-blur-md border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest">
            {category}
          </span>
        </div>
      </div>
      <CardContent className="p-6">
        <h4 className="text-xl font-bold group-hover:text-primary transition-colors mb-2">{title}</h4>
        <p className="text-sm text-muted-foreground mb-4">High-performance scalable architecture for modern web applications.</p>
        <Button variant="ghost" className="p-0 h-auto text-primary hover:bg-transparent hover:text-primary/80 text-xs font-bold flex items-center gap-2">
          View Repository <ExternalLink className="h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  )
}

function SocialIcon({ icon }: any) {
  return (
    <Button variant="outline" size="icon" className="rounded-xl border-white/5 bg-white/5 hover:bg-primary/10 hover:border-primary/20 hover:text-primary transition-all w-12 h-12">
      {React.cloneElement(icon, { className: "h-5 w-5" })}
    </Button>
  )
}