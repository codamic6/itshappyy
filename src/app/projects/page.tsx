"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import Image from 'next/image'
import { MessageSquare, Link as LinkIcon, ExternalLink, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "HappyChat",
      category: "Messaging",
      imgSrc: "https://picsum.photos/seed/chat-pro/1200/800",
      longDescription: "High-speed messaging ecosystem featuring end-to-end encryption and zero-latency communication.",
      stack: ['Next.js', 'Firebase', 'Socket.io'],
      features: ['Zero-Latency', 'Encryption', 'Multi-Sync'],
      link: "#"
    },
    {
      id: 2,
      title: "HappyLinks",
      category: "Identity",
      imgSrc: "https://picsum.photos/seed/links-pro/1200/800",
      longDescription: "Premium bio-link solution with real-time analytics for massive media brands.",
      stack: ['React', 'PostgreSQL', 'Node.js'],
      features: ['Analytics', 'Custom Themes', 'High-Traffic'],
      link: "#"
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

          <div className="space-y-32">
            {projects.map((p, idx) => (
              <div key={p.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="space-y-8 order-2 lg:order-none">
                  <span className="inline-block px-6 py-2 rounded-full bg-primary/5 text-primary font-black text-[10px] tracking-widest uppercase">{p.category}</span>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-primary">{p.title}</h2>
                  <p className="text-xl text-muted-foreground font-medium">{p.longDescription}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {p.features.map(f => (
                      <div key={f} className="flex items-center gap-3 text-sm font-bold text-primary"><Zap className="h-4 w-4" />{f}</div>
                    ))}
                  </div>
                  <Button asChild className="rounded-full px-12 h-16 bg-primary text-white font-black tracking-widest text-[10px] uppercase">
                    <a href={p.link} target="_blank">VISIT <ExternalLink className="ml-2 h-4 w-4" /></a>
                  </Button>
                </div>
                <div className="relative aspect-video rounded-[4rem] overflow-hidden shadow-2xl border border-primary/10">
                  <Image src={p.imgSrc} alt={p.title} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}