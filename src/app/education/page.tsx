"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { GraduationCap, Award, Medal, BookOpen } from 'lucide-react'

export default function EducationPage() {
  const educationTimeline = [
    { year: "2026", title: "11th Grade - ICS", institution: "Punjab College Daewoo Road", details: "Deep focus on Advanced Logic, Data Structures, and Digital Brand Architectures.", icon: <GraduationCap /> },
    { year: "2025", title: "Class 10 Board - Matric", institution: "Al-Faisal Grammar School", details: "Academic Peak: Secured 1st Position in School with a massive 1165/1200 marks. (Roll No 484655)", icon: <Award /> },
    { year: "2024", title: "Class 9 Board", institution: "Al-Faisal Grammar School", details: "Board Distinction: 3rd Position in Faisalabad Board with 525/545 marks. (Roll No 190511)", icon: <Medal /> },
    { year: "Feb 10, 2023", title: "Hifz-e-Quran Completion", institution: "Masjid-e-Niyaz Ahmadabad", details: "Historical Record: Completed Hifz in 1 Year 9 Months. Final Revision (Duhrai) finished in just 1 Month.", icon: <BookOpen /> },
    { year: "2021-2022", title: "Intensive Hifz Period", institution: "Masjid-e-Niyaz Ahmadabad", details: "Dedicated focus on Quranic memorization and spiritual discipline." },
    { year: "2020", title: "Class 5", institution: "Al-Faisal Grammar School", details: "2nd Position with overall academic excellence." },
    { year: "2019", title: "Class 4", institution: "Al-Faisal Grammar School", details: "2nd Position." },
    { year: "2018", title: "Class 3", institution: "Al-Faisal Grammar School", details: "4th Position." },
    { year: "2017", title: "Class 2", institution: "Al-Faisal Grammar School", details: "2nd Position." },
    { year: "2016", title: "Class 1", institution: "Al-Faisal Grammar School", details: "2nd Position." },
    { year: "2015", title: "Prep", institution: "Al-Faisal Grammar School", details: "3rd Position." },
    { year: "2014", title: "Nursery", institution: "Al-Faisal Grammar School", details: "The foundation of a record-breaking academic journey." }
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
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-green-gradient uppercase">Academic Peak</h1>
            <p className="text-muted-foreground text-xl font-medium uppercase tracking-widest">Consistency Over A Decade</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {educationTimeline.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.05, ease: "easeOut" }}
                className="group p-10 rounded-[3.5rem] bg-white border border-primary/5 hover:border-primary/20 transition-all hover:shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.02] rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
                
                <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-black text-[10px] tracking-widest uppercase mb-6">{item.year}</span>
                
                <div className="flex items-center gap-4 mb-4">
                  {item.icon && <div className="text-primary h-6 w-6">{item.icon}</div>}
                  <h3 className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none group-hover:text-primary transition-colors">{item.title}</h3>
                </div>
                
                <p className="text-primary font-bold text-[10px] tracking-widest uppercase mb-4">{item.institution}</p>
                <p className="text-muted-foreground text-sm font-medium leading-relaxed">{item.details}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}