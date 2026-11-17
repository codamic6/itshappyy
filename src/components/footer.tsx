
"use client"

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export function Footer() {
  const links = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'ACADEMY', href: '/education' },
    { name: 'WORK', href: '/projects' },
    { name: 'REACH', href: '/social-media' },
    { name: 'CONNECT', href: '/contact' },
  ];

  return (
    <footer className="pt-40 pb-10 px-6 bg-white border-t border-primary/5">
      <div className="max-w-7xl mx-auto space-y-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          {/* Brand */}
          <div className="space-y-8">
            <h3 className="text-5xl font-black tracking-tighter text-green-gradient uppercase italic">HAPPY</h3>
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-xs uppercase tracking-tight">
                Architecting Scalable Digital Ecosystems. Bridging engineering with spiritual tradition since 2025.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black tracking-widest text-primary uppercase">System Active</span>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black tracking-widest text-primary uppercase">Explore</h4>
            <div className="flex flex-col gap-4">
              {links.slice(0, 4).map((link) => (
                <Link key={link.name} href={link.href} className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors flex items-center group w-fit">
                  {link.name} <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1" />
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black tracking-widest text-primary uppercase">Social</h4>
            <div className="flex flex-col gap-4">
              <a href="https://youtube.com/@VoicesOfHaram" target="_blank" className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors flex items-center group w-fit">
                YOUTUBE <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1" />
              </a>
              <a href="https://facebook.com/voicesofharam.official" target="_blank" className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors flex items-center group w-fit">
                FACEBOOK <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1" />
              </a>
              <a href="https://instagram.com/voicesofharam.official" target="_blank" className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors flex items-center group w-fit">
                INSTAGRAM <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black tracking-widest text-primary uppercase">Status</h4>
            <div className="space-y-4">
              <div className="p-6 rounded-[2rem] bg-primary/[0.02] border border-primary/5 space-y-2">
                <p className="text-xs font-black text-primary">AVAILABLE FOR VISIONARY PROJECTS</p>
                <p className="text-muted-foreground text-[10px] uppercase tracking-widest leading-relaxed">Faisalabad, PK <br/> Global Reach</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
            &copy; 2026 HAPPY | ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-8">
            <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase italic opacity-40">DESIGNED WITH PRECISION</p>
            <div className="hidden md:block h-px w-20 bg-primary/5" />
          </div>
        </div>
      </div>
    </footer>
  )
}
