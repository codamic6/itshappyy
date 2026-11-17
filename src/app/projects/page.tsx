
"use client"

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { ExternalLink, Zap, Bot, Code2, Globe, Sparkles, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const projects = [
  {
    id: 1,
    title: "Chizzy AI",
    category: "AI Tools",
    imgSrc: "https://picsum.photos/seed/ai-tool/1200/800",
    description: "Advanced AI agent ecosystem designed for intelligent automation and data processing.",
    link: "https://chizzy-two.vercel.app",
    icon: <Bot />
  },
  {
    id: 2,
    title: "HappyChat",
    category: "Messaging",
    imgSrc: "https://picsum.photos/seed/chat-pro/1200/800",
    description: "Secure, high-speed messaging platform with real-time sync and custom encryption.",
    link: "https://happychat-murex.vercel.app",
    icon: <Zap />
  },
  {
    id: 3,
    title: "HappyLink",
    category: "Identity",
    imgSrc: "https://picsum.photos/seed/links-pro/1200/800",
    description: "Premium bio-link solution featuring advanced analytics and social verification tools.",
    link: "https://happylink-beta.vercel.app",
    icon: <Globe />
  },
  {
    id: 4,
    title: "Faast Academy",
    category: "Education",
    imgSrc: "https://picsum.photos/seed/edu-1/1200/800",
    description: "Scalable learning management system built for high-performance academic environments.",
    link: "https://faastglobalacademy.vercel.app",
    icon: <Code2 />
  },
  {
    id: 5,
    title: "AnyTask",
    category: "Productivity",
    imgSrc: "https://picsum.photos/seed/task-pro/1200/800",
    description: "Freelance workflow management system for tracking tasks and global deliverables.",
    link: "https://anytask-ten.vercel.app",
    icon: <Sparkles />
  },
  {
    id: 6,
    title: "HappyScroll",
    category: "Media",
    imgSrc: "https://picsum.photos/seed/scroll-pro/1200/800",
    description: "Infinite media consumption engine optimized for high-retention content delivery.",
    link: "https://happyscroll.vercel.app",
    icon: <Zap />
  },
  {
    id: 7,
    title: "Al-Hameed",
    category: "Business",
    imgSrc: "https://picsum.photos/seed/jewel-pro/1200/800",
    description: "Custom e-commerce storefront for Al-Hameed Jewelers featuring high-end inventories.",
    link: "https://alhameedjewelers.vercel.app",
    icon: <Globe />
  },
  {
    id: 8,
    title: "Direction Academy",
    category: "Education",
    imgSrc: "https://picsum.photos/seed/edu-2/1200/800",
    description: "Strategic educational portal focused on student mentorship and curriculum design.",
    link: "https://thedirectionacademy.vercel.app",
    icon: <Code2 />
  },
  {
    id: 9,
    title: "Portfolio V1",
    category: "Branding",
    imgSrc: "https://picsum.photos/seed/port-zeta/1200/800",
    description: "Initial digital identity deployment showcasing professional growth and core tech stack.",
    link: "https://portfolio-zeta-eight-38.vercel.app",
    icon: <Sparkles />
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
    <div className="min-h-screen bg-white text-foreground selection:bg-primary/20 selection:text-primary font-inter">
      <Navbar />
      
      <main className="pb-20">
        {/* Dedicated Hero Section with Enhanced Fade */}
        <section className="relative h-[60vh] md:h-[70vh] flex flex-col items-center justify-center px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/hero.png" 
              alt="Hero Background" 
              fill 
              className="object-cover opacity-50"
              data-ai-hint="projects hero"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white" />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center space-y-4 pt-20"
          >
            <h1 className="text-7xl md:text-[140px] font-black tracking-tighter text-green-gradient uppercase leading-none">Work</h1>
            <p className="text-muted-foreground text-sm md:text-base font-medium uppercase tracking-[0.4em]">Engineering Scalable Futures</p>
          </motion.div>
        </section>

        <div className="max-w-7xl mx-auto px-6 space-y-24">
          {/* Search and Filters */}
          <div className="space-y-10">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40 h-5 w-5" />
              <Input 
                placeholder="SEARCH PROJECTS..." 
                className="h-20 pl-16 pr-20 rounded-full border-primary/10 bg-primary/[0.01] text-lg font-black tracking-widest placeholder:text-primary/20 focus-visible:ring-primary/20 shadow-2xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-primary/5 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-primary/40" />
                </button>
              )}
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
                      : "bg-white text-primary/40 border-primary/5 hover:border-primary/20 hover:text-primary"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
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
                  className="group relative bg-white rounded-[4rem] border border-primary/5 hover:border-primary/20 transition-all hover:shadow-2xl overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image 
                      src={p.imgSrc} 
                      alt={p.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                      data-ai-hint="software application"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <div className="p-12 space-y-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="px-6 py-2 rounded-full bg-primary/5 text-primary font-black text-[10px] tracking-widest uppercase">{p.category}</span>
                      <div className="text-primary h-5 w-5">{p.icon}</div>
                    </div>
                    
                    <h2 className="text-4xl font-black tracking-tighter uppercase text-primary">{p.title}</h2>
                    <p className="text-muted-foreground font-medium leading-relaxed flex-1">{p.description}</p>
                    
                    <div className="pt-10">
                      <Button asChild className="w-full rounded-full h-20 bg-primary text-white font-black tracking-widest text-sm uppercase shadow-xl transition-all hover:scale-105">
                        <a href={p.link} target="_blank">VISIT <ExternalLink className="ml-2 h-5 w-5" /></a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-40 text-center space-y-6"
              >
                <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto">
                  <Search className="h-8 w-8 text-primary/20" />
                </div>
                <h3 className="text-2xl font-black tracking-tighter uppercase text-primary/40">No Projects Found</h3>
                <Button 
                  variant="link" 
                  className="text-primary font-black uppercase tracking-widest text-[10px]"
                  onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                >
                  CLEAR ALL FILTERS
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
