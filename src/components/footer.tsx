
"use client"

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, Github, Instagram, Youtube, Mail } from 'lucide-react'

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
    <footer className="pt-40 pb-16 px-6 bg-white border-t border-primary/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          <div className="space-y-12">
            <h3 className="text-7xl font-black tracking-tighter text-green-gradient uppercase italic leading-none">HAPPY</h3>
            <p className="text-muted-foreground text-xs font-bold leading-relaxed max-w-xs uppercase tracking-tight">
              Architecting Scalable Digital Ecosystems. Bridging high-performance engineering with spiritual tradition through extreme discipline and focus.
            </p>
          </div>

          <div className="space-y-12">
            <h4 className="text-[10px] font-black tracking-[0.4em] text-primary uppercase border-l-2 border-primary/20 pl-6">Explore</h4>
            <div className="flex flex-col gap-6">
              {links.map((link) => (
                <Link key={link.name} href={link.href} className="text-[11px] font-black text-muted-foreground hover:text-primary transition-all flex items-center group w-fit hover:translate-x-3">
                  {link.name} <ArrowUpRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <h4 className="text-[10px] font-black tracking-[0.4em] text-primary uppercase border-l-2 border-primary/20 pl-6">Connect</h4>
            <div className="flex flex-col gap-8">
              <SocialLink icon={<Youtube className="h-5 w-5" />} name="YOUTUBE" href="https://youtube.com/@VoicesOfHaram" />
              <SocialLink icon={<Instagram className="h-5 w-5" />} name="INSTAGRAM" href="https://instagram.com/voicesofharam.official" />
              <SocialLink icon={<Github className="h-5 w-5" />} name="GITHUB" href="https://github.com/codamic6" />
              <SocialLink icon={<Mail className="h-5 w-5" />} name="EMAIL" href="mailto:itsmuhammadahmad06@gmail.com" />
            </div>
          </div>
        </div>

        <div className="pt-20 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-12">
          <p className="text-[10px] font-black tracking-[0.5em] text-muted-foreground uppercase opacity-50">
            &copy; 2026 HAPPY
          </p>
          <div className="flex items-center gap-12">
            <div className="hidden md:block h-px w-32 bg-primary/10" />
            <span className="text-[10px] font-black tracking-widest text-primary uppercase">DIGITAL ARCHITECT</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ icon, name, href }: any) {
  return (
    <a href={href} target="_blank" className="flex items-center gap-4 text-[11px] font-black text-muted-foreground hover:text-primary transition-all group w-fit">
      <div className="p-3 rounded-2xl bg-primary/[0.03] group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
        {icon}
      </div>
      <span className="tracking-[0.2em]">{name}</span>
    </a>
  )
}
