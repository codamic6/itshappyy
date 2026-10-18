
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  FileUp, 
  CheckCircle2, 
  Loader2, 
  Zap, 
  History, 
  Settings, 
  User,
  ChevronRight,
  X,
  ClipboardCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { gradePaper } from '@/ai/flows/grade-paper';
import { useFirestore, useUser, useCollection, useMemoFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, limit } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export default function GradeMasterPage() {
  const [image, setImage] = useState<string | null>(null);
  const [scheme, setScheme] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [activeView, setActiveView] = useState<'new' | 'history'>('new');
  
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // History Query - Memoized for stability
  const sessionsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, 'users', user.uid, 'sessions'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
  }, [firestore, user]);

  const { data: sessions, isLoading: sessionsLoading } = useCollection(sessionsQuery);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleCheckPaper = async () => {
    if (!image || !scheme.trim() || !user || !firestore) {
      toast({ 
        variant: 'destructive', 
        title: "Missing Input", 
        description: "Please upload an image and provide a marking scheme." 
      });
      return;
    }

    setIsChecking(true);
    try {
      const aiResult = await gradePaper({ photoDataUri: image, markingScheme: scheme });
      setResult(aiResult);

      // Save to Firestore - Non-blocking set
      addDoc(collection(firestore, 'users', user.uid, 'sessions'), {
        userId: user.uid,
        paperImage: image,
        markingScheme: scheme,
        result: aiResult,
        createdAt: serverTimestamp()
      });

      toast({ title: "Check Complete", description: "Paper has been graded successfully." });
    } catch (err: any) {
      toast({ 
        variant: 'destructive', 
        title: "AI Error", 
        description: err.message || "Failed to process paper. Try again." 
      });
    } finally {
      setIsChecking(false);
    }
  };

  if (isUserLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#0C0C0E]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-white/20" />
          <span className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase">Syncing Workstation...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0C0C0E] text-white overflow-hidden font-sans select-none">
      {/* Activity Bar */}
      <div className="w-[60px] border-r border-white/5 flex flex-col items-center py-6 gap-6 bg-[#0A0A0C] z-50">
        <ActivityIcon icon={<Zap className="h-5 w-5" />} active={activeView === 'new'} onClick={() => setActiveView('new')} />
        <ActivityIcon icon={<History className="h-5 w-5" />} active={activeView === 'history'} onClick={() => setActiveView('history')} />
        <div className="mt-auto flex flex-col gap-6">
          <ActivityIcon icon={<User className="h-5 w-5" />} />
          <ActivityIcon icon={<Settings className="h-5 w-5" />} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <header className="h-12 border-b border-white/5 flex items-center justify-between px-6 bg-[#0C0C0E]">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">GradeMaster AI / Workstation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500/50 animate-pulse" />
            <span className="text-[9px] font-bold text-white/20 tracking-widest uppercase">Engine Stable</span>
          </div>
        </header>

        <main className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col border-r border-white/5 overflow-hidden">
            <ScrollArea className="flex-1">
              <div className="p-8 max-w-4xl mx-auto space-y-12">
                {activeView === 'new' ? (
                  <section className="space-y-8">
                    <div className="space-y-2">
                      <h1 className="text-3xl font-black tracking-tighter uppercase italic">Initiate New Paper Check</h1>
                      <p className="text-white/30 text-[11px] font-bold tracking-widest uppercase">Upload evidence and provide grading parameters</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div 
                        className={cn(
                          "aspect-[3/4] rounded-xl border-2 border-dashed border-white/5 bg-white/[0.02] flex flex-col items-center justify-center cursor-pointer hover:bg-white/[0.04] transition-all relative overflow-hidden group",
                          image && "border-solid border-white/20"
                        )}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {image ? (
                          <>
                            <img src={image} className="w-full h-full object-contain p-4 opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <span className="text-[9px] font-black tracking-widest">CHANGE IMAGE</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center gap-4 text-white/20">
                            <FileUp className="h-12 w-12 stroke-[1px]" />
                            <span className="text-[10px] font-black tracking-[0.2em]">UPLOAD PAPER PHOTO</span>
                          </div>
                        )}
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                      </div>

                      <div className="flex flex-col gap-6">
                        <div className="space-y-4">
                          <label className="text-[9px] font-black tracking-[0.3em] text-white/40 uppercase">Marking Scheme / Instructions</label>
                          <Textarea 
                            placeholder="INPUT GRADING LOGIC..."
                            className="min-h-[200px] bg-white/[0.01] border-white/5 text-[12px] font-bold uppercase tracking-widest placeholder:text-white/10 focus-visible:ring-white/20 resize-none rounded-lg"
                            value={scheme}
                            onChange={(e) => setScheme(e.target.value)}
                          />
                        </div>

                        <Button 
                          disabled={isChecking || !image || !scheme}
                          onClick={handleCheckPaper}
                          className="h-14 bg-white text-black hover:bg-white/90 font-black tracking-[0.4em] uppercase text-[11px] rounded-lg relative overflow-hidden"
                        >
                          {isChecking ? (
                            <div className="flex items-center gap-3">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              PROCESSING...
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <Zap className="h-4 w-4 fill-current" />
                              START AI SCAN
                            </div>
                          )}
                        </Button>
                      </div>
                    </div>
                  </section>
                ) : (
                  <section className="space-y-8">
                    <div className="space-y-2">
                      <h1 className="text-3xl font-black tracking-tighter uppercase italic">Grading Logs</h1>
                      <p className="text-white/30 text-[11px] font-bold tracking-widest uppercase">Archive of recently processed academic papers</p>
                    </div>
                    
                    <div className="grid gap-4">
                      {sessionsLoading ? (
                        <div className="py-20 flex justify-center"><Loader2 className="h-6 w-6 animate-spin opacity-20" /></div>
                      ) : sessions?.map((s) => (
                        <div key={s.id} className="p-4 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:border-white/20 transition-all cursor-pointer" onClick={() => { setResult(s.result); setImage(s.paperImage); setActiveView('new'); }}>
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-10 bg-white/5 rounded overflow-hidden">
                              <img src={s.paperImage} className="w-full h-full object-cover opacity-40" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black tracking-widest">SESSION ID: {s.id.substring(0, 8).toUpperCase()}</span>
                              <span className="text-[8px] font-bold text-white/20 tracking-widest">{s.createdAt ? new Date(s.createdAt.toDate()).toLocaleString().toUpperCase() : 'PENDING'}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <span className="block text-[14px] font-black">{s.result.score}/{s.result.totalMarks}</span>
                              <span className="block text-[8px] font-black text-green-500/60 uppercase tracking-widest">COMPLETE</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-white/10 group-hover:text-white transition-all" />
                          </div>
                        </div>
                      ))}
                      {!sessionsLoading && sessions?.length === 0 && (
                        <div className="py-40 text-center opacity-10">
                          <History className="h-12 w-12 mx-auto mb-4 stroke-[1px]" />
                          <span className="text-[9px] font-black tracking-[0.4em] uppercase">No Grading History Found</span>
                        </div>
                      )}
                    </div>
                  </section>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Results Sidebar */}
          <div className="w-[450px] flex flex-col bg-[#0A0A0C] border-l border-white/5 overflow-hidden">
            <header className="h-12 border-b border-white/5 flex items-center justify-between px-6 bg-white/[0.01]">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-3 w-3 text-white/40" />
                <span className="text-[9px] font-black tracking-[0.3em] text-white/60 uppercase">Session Intelligence</span>
              </div>
              {result && (
                <button onClick={() => setResult(null)} className="p-1 hover:bg-white/5 rounded">
                  <X className="h-3 w-3 opacity-20 hover:opacity-100" />
                </button>
              )}
            </header>

            <ScrollArea className="flex-1">
              <div className="p-6 space-y-8">
                {result ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                    <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 space-y-4 text-center">
                      <span className="text-[9px] font-black tracking-[0.5em] text-white/20 uppercase">Calculated Grade</span>
                      <div className="text-6xl font-black tracking-tighter italic">
                        {result.score}<span className="text-white/20 text-2xl font-normal ml-2">/ {result.totalMarks}</span>
                      </div>
                      <div className="flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={cn("h-1 w-8 rounded-full", i < (result.score/result.totalMarks) * 5 ? "bg-white" : "bg-white/5")} />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <span className="text-[9px] font-black tracking-[0.3em] text-white/40 uppercase">Executive Summary</span>
                      <p className="text-[12px] font-medium leading-relaxed text-white/60 font-sans">{result.feedback}</p>
                    </div>

                    <div className="space-y-4">
                      <span className="text-[9px] font-black tracking-[0.3em] text-white/40 uppercase">Point Anomalies</span>
                      <div className="space-y-3">
                        {result.corrections?.map((c: any, i: number) => (
                          <div key={i} className="p-4 rounded-lg bg-red-500/[0.02] border border-red-500/10 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black tracking-widest text-red-400">{c.question?.toUpperCase() || 'QUESTION'}</span>
                              <div className="h-1 w-1 rounded-full bg-red-400" />
                            </div>
                            <p className="text-[11px] font-bold uppercase tracking-widest opacity-80">{c.issue}</p>
                            <p className="text-[10px] text-white/20 font-medium italic">SUGGESTION: {c.suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-40 gap-4 opacity-10">
                    <CheckCircle2 className="h-12 w-12 stroke-[1px]" />
                    <span className="text-[9px] font-black tracking-[0.4em] uppercase text-center">Await Processing...</span>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </main>

        <footer className="h-8 border-t border-white/5 flex items-center justify-between px-6 bg-[#0A0A0C]">
          <div className="flex items-center gap-6">
            <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">GradeMaster_Core_V1</span>
            <span className="text-[8px] font-black text-white/10 uppercase tracking-[0.2em]">Genkit_V1_Stable</span>
          </div>
          <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">01001010_SYNCED</span>
        </footer>
      </div>
    </div>
  );
}

function ActivityIcon({ icon, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "p-2.5 rounded transition-all relative group",
        active ? "text-white" : "text-white/20 hover:text-white/50"
      )}
    >
      {active && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-6 bg-white/40 shadow-[0_0_8px_white]" />
      )}
      {icon}
    </button>
  );
}
