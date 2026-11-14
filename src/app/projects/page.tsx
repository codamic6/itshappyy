
"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import Image from 'next/image'
import { ExternalLink, Zap, Bot, Code2, Globe, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Chizzy AI",
      category: "AI Tool",
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

  return (
    <div className="min-h-screen bg-white text-foreground selection:bg-primary/20 selection:text-primary font-inter">
      <Navbar />
      
      <main className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="space-y-24"
        >
          <div className="text-center space-y-4">
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-green-gradient uppercase">Work</h1>
            <p className="text-muted-foreground text-xl font-medium uppercase tracking-[0.3em]">Engineering Scalable Futures</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((p, idx) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white rounded-[4rem] border border-primary/5 hover:border-primary/20 transition-all hover:shadow-2xl overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image src={p.imgSrc} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="p-12 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="px-6 py-2 rounded-full bg-primary/5 text-primary font-black text-[10px] tracking-widest uppercase">{p.category}</span>
                    <div className="text-primary h-5 w-5">{p.icon}</div>
                  </div>
                  
                  <h2 className="text-4xl font-black tracking-tighter uppercase text-primary">{p.title}</h2>
                  <p className="text-muted-foreground font-medium leading-relaxed">{p.description}</p>
                  
                  <Button asChild className="w-full rounded-full h-16 bg-primary text-white font-black tracking-widest text-[10px] uppercase shadow-xl transition-all hover:scale-105">
                    <a href={p.link} target="_blank">VISIT <ExternalLink className="ml-2 h-4 w-4" /></a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <footer className="py-10 border-t border-primary/5 text-center">
        <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">&copy; 2026 HAPPY | ALL RIGHTS RESERVED</p>
      </footer>
    </div>
  )
}
