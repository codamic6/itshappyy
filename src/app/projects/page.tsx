"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import Image from 'next/image'
import { MessageSquare, Link as LinkIcon, ExternalLink, Zap, Shield, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "HappyChat",
      category: "Messaging Ecosystem",
      icon: <MessageSquare className="h-6 w-6" />,
      imgSrc: "https://picsum.photos/seed/chat-pro/1200/800",
      description: "Secure ultra-fast alternative to mainstream messaging apps.",
      longDescription: "HappyChat is a high-speed messaging ecosystem built for global connectivity. It features end-to-end encryption and a custom-built architecture for zero-latency communication. Designed to handle millions of real-time events, it bridges the gap between privacy and performance.",
      stack: ['Next.js', 'Firebase', 'Socket.io', 'Tailwind'],
      features: ['Zero-Latency Messaging', 'Military-Grade Encryption', 'Multi-Device Sync', 'Premium UI Themes'],
      link: "https://happychat.example.com"
    },
    {
      id: 2,
      title: "HappyLinks",
      category: "Identity Aggregator",
      icon: <LinkIcon className="h-6 w-6" />,
      imgSrc: "https://picsum.photos/seed/links-pro/1200/800",
      description: "Premium bio-link solution for massive global media brands.",
      longDescription: "Designed for high-reach content creators, HappyLinks offers deep analytics, customizable themes, and a centralized hub for digital identities. It integrates directly with major social platforms to provide a seamless user experience for fans.",
      stack: ['React', 'PostgreSQL', 'Tailwind', 'Node.js'],
      features: ['Real-time Analytics', 'Brand Customization', 'Social API Integration', 'High-Traffic Ready'],
      link: "https://happylinks.example.com"
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
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-green-gradient uppercase">Architectures</h1>
            <p className="text-muted-foreground text-xl font-medium uppercase tracking-[0.3em]">Engineering Scalable Futures</p>
          </div>

          <div className="space-y-32">
            {projects.map((p, idx) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="space-y-8 order-2 lg:order-none">
                  <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary font-black text-[10px] tracking-[0.3em] uppercase">
                    {p.category}
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-primary">{p.title}</h2>
                  <p className="text-xl text-muted-foreground font-medium leading-relaxed">{p.longDescription}</p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {p.features.map(f => (
                      <div key={f} className="flex items-center gap-3 text-sm font-bold text-primary">
                        <Zap className="h-4 w-4" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {p.stack.map(s => (
                      <span key={s} className="px-4 py-2 rounded-xl bg-primary/5 text-[9px] font-bold text-primary uppercase border border-primary/10">{s}</span>
                    ))}
                  </div>

                  <Button asChild className="rounded-full px-12 h-16 bg-primary text-white font-black tracking-widest text-[10px] uppercase shadow-2xl transition-all hover:scale-105">
                    <a href={p.link} target="_blank">LAUNCH ARCHITECTURE <ExternalLink className="ml-2 h-4 w-4" /></a>
                  </Button>
                </div>
                
                <div className="relative aspect-video lg:aspect-[4/3] rounded-[4rem] overflow-hidden shadow-2xl border border-primary/10 group">
                  <Image src={p.imgSrc} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}