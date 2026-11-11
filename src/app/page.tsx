
"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import Link from 'next/link'

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white text-foreground selection:bg-primary/20 selection:text-primary font-inter overflow-x-hidden">
      <Navbar />
      
      {/* Animated Background Atmosphere */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] -right-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" 
        />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl w-full text-center space-y-4"
        >
          <div className="flex items-center justify-center overflow-visible px-4">
            <motion.h1 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[80px] md:text-[180px] lg:text-[240px] font-black tracking-tighter text-green-gradient uppercase italic leading-none whitespace-nowrap"
            >
              HAPPY
            </motion.h1>
          </div>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto font-medium uppercase tracking-tight">
            WEB DEVELOPMENT | CONTENT CREATION | SOCIAL MEDIA MANAGEMENT | STUDENT | COLLEGE | ISLAM
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-10">
            <Link href="/projects">
              <Button size="lg" className="rounded-full px-12 bg-primary text-white h-14 font-black tracking-widest text-[10px] uppercase shadow-2xl shadow-primary/20 transition-all hover:scale-105">EXPLORE WORK</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-full px-12 border-primary/20 h-14 text-primary font-black tracking-widest text-[10px] uppercase transition-all hover:scale-105">GET IN TOUCH</Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Landing Summaries - Now Static as requested */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <SummaryCard 
          title="THE IDENTITY" 
          desc="Built on extreme discipline. Record-breaking Hifz-e-Quran and digital excellence."
        />
        <SummaryCard 
          title="ACADEMIC PEAK" 
          desc="Distinguished academic record with 1st positions and board honors."
        />
        <SummaryCard 
          title="ARCHITECTURES" 
          desc="Scalable software ecosystems bridging performance with global reach."
        />
      </section>
    </div>
  )
}

function SummaryCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-10 rounded-[3rem] bg-white border border-primary/5 hover:border-primary/20 transition-all hover:shadow-xl cursor-default">
      <h3 className="text-2xl font-black tracking-widest text-primary uppercase mb-4">{title}</h3>
      <p className="text-muted-foreground font-medium text-sm leading-relaxed">{desc}</p>
    </div>
  )
}
