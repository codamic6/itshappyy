
"use client"

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { ExternalLink, Zap, Bot, Code2, Globe, Sparkles, Search, X, Gem, BookOpen, MousePointer2, Layout } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const projects = [
  {
    id: 1,
    title: "Chizzy AI",
    category: "AI Tools",
    imgSrc: "/chizzyai.jpg",
    description: "Advanced AI agent ecosystem designed for intelligent automation and data processing.",
    link: "https://chizzy-two.vercel.app",
    icon: <Bot />
  },
  {
    id: 2,
    title: "HappyChat",
    category: "Messaging Platforms",
    imgSrc: "/happychat.jpg",
    description: "Secure, high-speed messaging platform with real-time sync and custom encryption.",
    link: "https://happychat-murex.vercel.app",
    icon: <Zap />
  },
  {
    id: 3,
    title: "HappyLink",
    category: "Identity Solutions",
    imgSrc: "/happylink.jpg",
    description: "Premium bio-link solution featuring advanced analytics and social verification tools.",
    link: "https://happylink-beta.vercel.app",
    icon: <Globe />
  },
  {
    id: 4,
    title: "Faast Global Academy",
    category: "Educational Systems",
    imgSrc: "/faastglobalacademy.jpg",
    description: "Scalable learning management system built for high-performance academic environments.",
    link: "https://faastglobalacademy.vercel.app",
    icon: <Code2 />
  },
  {
    id: 5,
    title: "Al-Hameed Jewelers",
    category: "E-Commerce Solutions",
    imgSrc: "/alhameedjewelers.jpg",
    description: "Premium jewelry e-commerce experience with exquisite digital cataloging.",
    link: "https://alhameedjewelers.vercel.app",
    icon: <Gem />
  },
  {
    id: 6,
    title: "The Direction Academy",
    category: "Educational Systems",
    imgSrc: "/thedirectionacademy.jpg",
    description: "Educational guidance and learning portal for academic excellence.",
    link: "https://thedirectionacademy.vercel.app",
    icon: <BookOpen />
  },
  {
    id: 7,
    title: "HappyScroll",
    category: "Productivity Tools",
    imgSrc: "/happyscroll.jpg",
    description: "Innovative content interaction platform designed for seamless engagement.",
    link: "https://happyscroll.vercel.app",
    icon: <MousePointer2 />
  },
  {
    id: 8,
    title: "AnyTask",
    category: "Productivity Tools",
    imgSrc: "https://picsum.photos/seed/anytask/600/400",
    description: "High-performance task management ecosystem for modern workflows.",
    link: "https://anytask-ten.vercel.app",
    icon: <Layout />,
    aiHint: "task management"
  }
];

const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary font-inter transition-colors duration-700 ease-in-out">
      <Navbar />
      
      <main className="pb-20">
        <section className="relative h-[60vh] md:h-[70vh] flex flex-col items-center justify-center px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="hidden md:block absolute inset-0">
              <Image 
                src="/hero.jpg" 
                alt="Projects Hero PC" 
                fill 
                unoptimized
                className="object-cover"
                data-ai-hint="projects hero"
                priority
              />
            </div>
            <div className="md:hidden absolute inset-0">
              <Image 
                src="/hero_mobile.jpg" 
                alt="Projects Hero Mobile" 
                fill 
                unoptimized
                className="object-cover"
                data-ai-hint="projects hero mobile"
                priority
              />
            </div>
            {/* Subtle Bottom Fade Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center space-y-4 pt-20"
          >
            <h1 className="text-7xl md:text-[140px] font-black tracking-tighter text-green-gradient uppercase leading-none glowing-text drop-shadow-2xl">Work</h1>
            <p className="text-primary/80 dark:text-white/70 text-sm md:text-base font-black uppercase tracking-[0.4em] hero-text-shadow">Engineering Scalable Futures</p>
          </motion.div>
        </section>

        <div className="max-w-7xl mx-auto px-6 space-y-24">
          <div className="space-y-10">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40 h-5 w-5" />
              <Input 
                placeholder="SEARCH PROJECTS..." 
                className="h-20 pl-16 pr-20 rounded-full border-primary/10 bg-card/50 dark:bg-card/20 text-lg font-black tracking-widest placeholder:text-primary/20 focus-visible:ring-primary/20 shadow-2xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-8 py-3 rounded-full text-[10px] font-black tracking-widest uppercase transition-all border shadow-sm",
                    activeCategory === cat 
                      ? "bg-primary text-white border-primary shadow-xl scale-105" 
                      : "bg-card dark:bg-card/40 text-primary/40 border-primary/5 hover:border-primary/20 hover:text-primary"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p, idx) => (
                <motion.div 
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group relative bg-card dark:bg-card/20 rounded-[4rem] border border-primary/5 dark:border-white/5 hover:border-primary/20 transition-all hover:shadow-2xl overflow-hidden flex flex-col glowing-card"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image 
                      src={p.imgSrc} 
                      alt={p.title} 
                      fill 
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                      data-ai-hint={p.aiHint || "software project"}
                    />
                  </div>
                  
                  <div className="p-12 space-y-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="px-6 py-2 rounded-full bg-primary/5 text-primary font-black text-[10px] tracking-widest uppercase">{p.category}</span>
                    </div>
                    <h2 className="text-4xl font-black tracking-tighter uppercase text-primary">{p.title}</h2>
                    <p className="text-muted-foreground dark:text-white/60 font-medium leading-relaxed flex-1">{p.description}</p>
                    <div className="pt-10">
                      <Button asChild className="w-full rounded-full h-20 bg-primary text-white font-black tracking-widest text-sm uppercase shadow-xl transition-all hover:scale-105">
                        <a href={p.link} target="_blank">VISIT <ExternalLink className="ml-2 h-5 w-5" /></a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
