
"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { GraduationCap, Award, Medal, BookOpen, Star, Trophy, Target, ShieldCheck, Zap } from 'lucide-react'

export default function EducationPage() {
  const educationTimeline = [
    { 
      year: "2026", 
      title: "ICS - 11th Grade", 
      institution: "Punjab College", 
      details: "Intermediate in Computer Science. Focus on Advanced Logic, Mathematics, and Computer Science Architectures.", 
      icon: <GraduationCap /> 
    },
    { 
      year: "2025", 
      title: "Matric - 1st Position", 
      institution: "Al-Faisal Grammar High School", 
      details: "Secured overall 1st position in school with 1165/1200 marks. Specialized in Computer Science, Physics, and Math.", 
      icon: <Trophy /> 
    },
    { 
      year: "2024", 
      title: "9th Grade", 
      institution: "Al-Faisal Grammar High School", 
      details: "Secured 525/545 marks, demonstrating consistent academic dominance in Science subjects.", 
      icon: <Award /> 
    },
    { 
      year: "2023", 
      title: "Class 8 - 3rd Position", 
      institution: "Al-Faisal Grammar High School", 
      details: "Achieved overall 3rd position in grade, maintaining a trajectory of excellence in Ahmadabad, Faisalabad.", 
      icon: <Medal /> 
    },
    { 
      year: "2021-22", 
      title: "Hifz-e-Quran", 
      institution: "Masjid-e-Niyaz", 
      details: "Completed Quranic Memorization in a record 1 Year 9 Months (Class 6-7). Followed by a 1-month full revision.", 
      icon: <BookOpen /> 
    },
    { 
      year: "2020", 
      title: "Class 5 - 1st Position", 
      institution: "Al-Faisal Grammar High School", 
      details: "Secured overall 1st position, demonstrating peak academic performance in primary level.", 
      icon: <Star /> 
    },
    { 
      year: "2019", 
      title: "Class 4 - 2nd Position", 
      institution: "Al-Faisal Grammar High School", 
      details: "Maintained elite ranking with overall 2nd position in grade.", 
      icon: <Target /> 
    },
    { 
      year: "2018", 
      title: "Class 3 - 4th Position", 
      institution: "Al-Faisal Grammar High School", 
      details: "Strong academic standing within the top tier of the class.", 
      icon: <ShieldCheck /> 
    },
    { 
      year: "2017", 
      title: "Class 2 - 2nd Position", 
      institution: "Al-Faisal Grammar High School", 
      details: "Consistent performance securing the 2nd overall position.", 
      icon: <Award /> 
    },
    { 
      year: "2016", 
      title: "Class 1 - 2nd Position", 
      institution: "Al-Faisal Grammar High School", 
      details: "Early academic record-breaking with 2nd overall position.", 
      icon: <Medal /> 
    },
    { 
      year: "2015", 
      title: "Prep - 3rd Position", 
      institution: "Al-Faisal Grammar High School", 
      details: "Foundation of excellence started with a 3rd position finish.", 
      icon: <Zap /> 
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary font-inter">
      <Navbar />
      
      <main className="pb-20">
        {/* HERO SECTION */}
        <section className="relative h-[60vh] md:h-[70vh] flex flex-col items-center justify-center px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="hidden md:block absolute inset-0">
              <Image 
                src="/hero.jpg" 
                alt="Education Hero PC" 
                fill 
                unoptimized
                className="object-cover"
                data-ai-hint="education hero"
              />
            </div>
            <div className="md:hidden absolute inset-0">
              <Image 
                src="/hero_mobile.jpg" 
                alt="Education Hero Mobile" 
                fill 
                unoptimized
                className="object-cover"
                data-ai-hint="education hero mobile"
              />
            </div>
            {/* Transition Fade Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center space-y-4 pt-20"
          >
            <h1 className="text-7xl md:text-[140px] font-black tracking-tighter text-green-gradient uppercase leading-none">Academy</h1>
            <p className="text-muted-foreground text-sm md:text-base font-medium uppercase tracking-[0.4em]">Excellence Over A Decade</p>
          </motion.div>
        </section>

        {/* TIMELINE GRID */}
        <div className="max-w-7xl mx-auto px-6 space-y-24 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {educationTimeline.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.05 }}
                className="group p-10 rounded-[3.5rem] bg-card border border-primary/5 hover:border-primary/20 transition-all hover:shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.02] rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
                
                <span className="inline-block px-5 py-1.5 rounded-full bg-primary/10 text-primary font-black text-[10px] tracking-widest uppercase mb-8">{item.year}</span>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-primary h-7 w-7 transition-transform group-hover:scale-110">{item.icon}</div>
                  <h3 className="text-2xl font-black tracking-tighter uppercase group-hover:text-primary leading-tight">{item.title}</h3>
                </div>
                
                <p className="text-primary font-bold text-[10px] tracking-[0.1em] uppercase mb-6">{item.institution}</p>
                
                <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                  {item.details}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
