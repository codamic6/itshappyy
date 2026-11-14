
"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { GraduationCap, Award, Medal, BookOpen, Star } from 'lucide-react'

export default function EducationPage() {
  const educationTimeline = [
    { 
      year: "2026", 
      title: "ICS - 11th", 
      institution: "Punjab College", 
      details: "Advanced Logic, Mathematics, and Computer Architectures.", 
      icon: <GraduationCap /> 
    },
    { 
      year: "2025", 
      title: "Matric - 1st Position", 
      institution: "Al-Faisal Grammar School", 
      details: "Secured 1165/1200 marks. Subjects: Computer Science, Physics, Mathematics, Chemistry. Ahmadabad, Faisalabad.", 
      icon: <Award /> 
    },
    { 
      year: "2024", 
      title: "9th Grade", 
      institution: "Al-Faisal Grammar School", 
      details: "Scored 525/545 marks. Subjects: Computer Science, Physics, Mathematics, Chemistry. Ahmadabad, Faisalabad.", 
      icon: <Medal /> 
    },
    { 
      year: "2023", 
      title: "Class 8 - 3rd Position", 
      institution: "Al-Faisal Grammar School", 
      details: "Continued academic excellence in middle school. Ahmadabad, Faisalabad.", 
      icon: <Star /> 
    },
    { 
      year: "2021-22", 
      title: "Hifz Completion", 
      institution: "Masjid-e-Niyaz", 
      details: "Dedicated period for Quranic Memorization (Class 6-7). Completed Hifz in 1 Year 9 Months.", 
      icon: <BookOpen /> 
    },
    { 
      year: "2020", 
      title: "Class 5 - 2nd Position", 
      institution: "Al-Faisal Grammar School", 
      details: "Secured 2nd Position in overall grade. Ahmadabad, Faisalabad.", 
      icon: <Award /> 
    },
    { 
      year: "2019", 
      title: "Class 4 - 2nd Position", 
      institution: "Al-Faisal Grammar School", 
      details: "Maintained consistent academic performance. Ahmadabad, Faisalabad.", 
      icon: <Award /> 
    },
    { 
      year: "2018", 
      title: "Class 3 - 4th Position", 
      institution: "Al-Faisal Grammar School", 
      details: "Ranked among top performers. Ahmadabad, Faisalabad.", 
      icon: <Star /> 
    },
    { 
      year: "2017", 
      title: "Class 2 - 2nd Position", 
      institution: "Al-Faisal Grammar School", 
      details: "Academic consistency maintained. Ahmadabad, Faisalabad.", 
      icon: <Award /> 
    },
    { 
      year: "2016", 
      title: "Class 1 - 2nd Position", 
      institution: "Al-Faisal Grammar School", 
      details: "Early academic record of excellence. Ahmadabad, Faisalabad.", 
      icon: <Award /> 
    },
    { 
      year: "2015", 
      title: "Prep - 3rd Position", 
      institution: "Al-Faisal Grammar School", 
      details: "The beginning of a journey of discipline. Ahmadabad, Faisalabad.", 
      icon: <Star /> 
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
          <div className="text-center md:text-left space-y-4">
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-green-gradient uppercase">Academy</h1>
            <p className="text-muted-foreground text-xl font-medium uppercase tracking-widest">A Decade of Excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {educationTimeline.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.05 }}
                className="group p-10 rounded-[3.5rem] bg-white border border-primary/5 hover:border-primary/20 transition-all hover:shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.02] rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
                <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-black text-[10px] tracking-widest uppercase mb-6">{item.year}</span>
                <div className="flex items-center gap-4 mb-4">
                  {item.icon && <div className="text-primary h-6 w-6">{item.icon}</div>}
                  <h3 className="text-2xl font-black tracking-tighter uppercase group-hover:text-primary leading-tight">{item.title}</h3>
                </div>
                <p className="text-primary font-bold text-[10px] uppercase mb-4">{item.institution}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.details}</p>
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
