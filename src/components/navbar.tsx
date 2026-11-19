
"use client"

import React, { useState, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY.current ? "down" : "up";
    if (direction === "down" && latest > 150) {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true);
    }
    lastScrollY.current = latest;
  });

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'EDUCATION', href: '/education' },
    { name: 'PROJECTS', href: '/projects' },
    { name: 'SOCIAL', href: '/social-media' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ 
          y: isNavVisible ? 0 : -120, 
          x: "-50%", 
          opacity: isNavVisible ? 1 : 0 
        }}
        className="fixed top-8 left-1/2 z-[100] w-[90%] max-w-5xl pointer-events-none -translate-x-1/2"
      >
        <div className="glass-white h-20 px-6 md:px-10 flex items-center justify-between rounded-full border border-primary/10 shadow-2xl pointer-events-auto">
          <Link href="/" className="text-xl md:text-2xl font-black font-syne tracking-widest text-green-gradient uppercase cursor-pointer">HAPPY</Link>
          
          <div className="hidden lg:flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`transition-colors hover:text-primary ${pathname === link.href ? 'text-primary' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/contact">
              <Button className="hidden sm:flex rounded-full px-6 md:px-8 bg-primary text-white font-black text-[10px] tracking-widest h-12 uppercase transition-transform hover:scale-105">
                VISIT
              </Button>
            </Link>
            <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-3 text-primary"><Menu className="h-6 w-6" /></button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[110] lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-[80%] bg-white dark:bg-background z-[120] shadow-2xl flex flex-col"
            >
              <div className="p-8 flex items-center justify-between border-b border-primary/5">
                <span className="text-[10px] font-black tracking-widest text-primary uppercase">NAV</span>
                <button onClick={() => setIsMenuOpen(false)}><X className="h-6 w-6 text-primary" /></button>
              </div>
              <div className="flex-1 p-10 space-y-6 flex flex-col">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)} 
                    className="text-sm font-medium tracking-tight text-foreground hover:text-primary transition-colors uppercase"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="mt-auto pt-10">
                  <div className="flex justify-center mb-6">
                    <ThemeToggle />
                  </div>
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full rounded-full py-6 bg-primary text-white font-black tracking-widest text-xs uppercase">VISIT</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
