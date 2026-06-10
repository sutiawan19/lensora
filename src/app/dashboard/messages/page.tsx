"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, Search, Bell, Settings, LogOut, Calendar, MessageSquare, 
  MapPin, Clock, ArrowLeft, Send, Paperclip, CheckCircle2, Pin
} from "lucide-react";
import Link from "next/link";

// --- Mock Data ---
const CONTACTS = [
  {
    id: "c1",
    photographer: "Adrianus Dewa",
    avatar: "https://i.pravatar.cc/150?img=11",
    lastMessage: "Siap kak, kita ketemu di lokasi ya.",
    time: "10:45 AM",
    unread: 2,
    statusBadge: "Upcoming Session",
    pinned: true,
    online: true,
    refId: "#LSR-123901"
  },
  {
    id: "c2",
    photographer: "Bella & Co",
    avatar: "https://i.pravatar.cc/150?img=5",
    lastMessage: "Terima kasih atas reviewnya!",
    time: "Kemarin",
    unread: 0,
    statusBadge: "Completed Session",
    pinned: false,
    online: false,
    refId: "#LSR-112002"
  }
];

const MOCK_CHAT = [
  { id: "m1", type: "system", text: "Booking has been confirmed.", time: "Mon, 10:00 AM" },
  { id: "m2", type: "vendor", text: "Halo kak Budi! Terima kasih sudah memesan sesi Cinematic Journey. Ada preferensi spot spesifik di Taman Literasi?", time: "Mon, 10:15 AM" },
  { id: "m3", type: "user", text: "Halo! Saya mau lebih banyak ambil spot di dekat amphiteater dan area hijau dekat perpustakaannya ya.", time: "Mon, 10:40 AM" },
  { id: "m4", type: "user", text: "Ini kira-kira referensi posenya.", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=400&auto=format&fit=crop", time: "Mon, 10:41 AM" },
  { id: "m5", type: "vendor", text: "Wah bagus banget referensinya, masuk dengan gaya pewarnaan saya.", time: "Mon, 10:43 AM" },
  { id: "m6", type: "system", text: "Photoshoot session starts tomorrow.", time: "Today, 08:00 AM" },
  { id: "m7", type: "vendor", text: "Siap kak, kita ketemu di lokasi ya.", time: "10:45 AM" }
];

const QUICK_REPLIES = [
  "Can we change location?",
  "I want this photography style",
  "What should I prepare?",
  "Can I reschedule?"
];

export default function Messages() {
  // Mobile UI state: true = show chat list, false = show active room
  const [showListOnMobile, setShowListOnMobile] = useState(true);
  const [activeContactId, setActiveContactId] = useState("c1");
  const [messageInput, setMessageInput] = useState("");

  const activeContact = CONTACTS.find(c => c.id === activeContactId) || CONTACTS[0];

  const handleSelectContact = (id: string) => {
    setActiveContactId(id);
    setShowListOnMobile(false); // Mobile: switch to chat room
  };

  return (
    <main className="min-h-screen bg-surface-2 flex flex-col md:flex-row h-screen overflow-hidden">
      
      {/* ---------------- SIDEBAR NAVIGATION ---------------- */}
      <aside className="w-20 lg:w-64 bg-white border-r border-border flex flex-col shrink-0 hidden md:flex">
        <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2 text-foreground font-extrabold tracking-tight text-xl">
             <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
               <Camera className="w-4 h-4" />
             </div>
             <span className="hidden lg:block">Lensora<span className="text-primary">.</span></span>
          </Link>
        </div>
        <div className="p-4 flex-1">
          <p className="hidden lg:block text-xs font-bold text-text-muted uppercase tracking-wider mb-4 px-3">Menu Utama</p>
          <nav className="space-y-1">
             <Link href="/explore" className="flex items-center justify-center lg:justify-start gap-3 px-3 py-2 text-text-muted hover:bg-surface-2 hover:text-foreground font-semibold rounded-xl transition-colors" title="Cari Fotografer">
               <Search className="w-5 h-5 shrink-0" /> <span className="hidden lg:block">Cari Fotografer</span>
             </Link>
             <Link href="/dashboard/sessions" className="flex items-center justify-center lg:justify-start gap-3 px-3 py-2 text-text-muted hover:bg-surface-2 hover:text-foreground font-semibold rounded-xl transition-colors" title="Sesi Pemotretan">
               <Calendar className="w-5 h-5 shrink-0" /> <span className="hidden lg:block">Sesi Pemotretan</span>
             </Link>
             <Link href="/dashboard/messages" className="flex items-center justify-center lg:justify-start gap-3 px-3 py-2 bg-primary-light text-primary font-bold rounded-xl transition-colors" title="Pesan">
               <MessageSquare className="w-5 h-5 shrink-0" /> <span className="hidden lg:block">Pesan</span> <span className="hidden lg:inline-block ml-auto bg-accent text-white text-[10px] px-2 py-0.5 rounded-full font-bold">2</span>
             </Link>
          </nav>
        </div>
      </aside>


      {/* ---------------- LEFT PANEL: CHAT LIST ---------------- */}
      <div className={`w-full md:w-80 xl:w-96 bg-white border-r border-border flex flex-col shrink-0 ${!showListOnMobile ? 'hidden md:flex' : 'flex'}`}>
         {/* Header List */}
         <div className="h-16 px-4 md:px-6 flex items-center justify-between border-b border-border shrink-0">
            <h2 className="font-extrabold text-xl text-foreground">Pesan</h2>
            <button className="p-2 bg-surface-2 rounded-full text-text-muted hidden md:block"><Bell className="w-4 h-4" /></button>
         </div>

         {/* Search */}
         <div className="p-4 border-b border-border shrink-0">
            <div className="relative">
               <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
               <input type="text" placeholder="Cari percakapan..." className="w-full pl-9 pr-3 py-2 bg-surface-2 border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
         </div>

         {/* List Scroll Area */}
         <div className="flex-1 overflow-y-auto">
            {CONTACTS.map(contact => (
               <div 
                 key={contact.id} 
                 onClick={() => handleSelectContact(contact.id)}
                 className={`p-4 border-b border-border cursor-pointer transition-colors relative ${activeContactId === contact.id ? 'bg-primary-light/30' : 'hover:bg-surface-2'}`}
               >
                  {/* Pinned Icon */}
                  {contact.pinned && <Pin className="w-3 h-3 text-text-muted absolute top-4 right-4" />}
                  
                  <div className="flex gap-3">
                     <div className="relative shrink-0">
                        <img src={contact.avatar} alt={contact.photographer} className="w-12 h-12 rounded-full object-cover" />
                        {contact.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-teal rounded-full border-2 border-white"></div>}
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-0.5 pr-4">
                           <h3 className="font-extrabold text-sm text-foreground truncate">{contact.photographer}</h3>
                           <span className="text-[10px] font-bold text-text-muted shrink-0">{contact.time}</span>
                        </div>
                        <p className={`text-xs truncate pr-4 ${contact.unread > 0 ? 'font-bold text-foreground' : 'text-text-muted font-medium'}`}>{contact.lastMessage}</p>
                        
                        <div className="flex items-center justify-between mt-2">
                           <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${contact.statusBadge.includes('Upcoming') ? 'bg-amber/10 text-amber' : 'bg-surface text-text-muted'}`}>
                              {contact.statusBadge}
                           </span>
                           {contact.unread > 0 && <span className="w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center shrink-0">{contact.unread}</span>}
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>


      {/* ---------------- RIGHT PANEL: ACTIVE CHAT ROOM ---------------- */}
      <div className={`flex-1 flex flex-col bg-surface ${showListOnMobile ? 'hidden md:flex' : 'flex'}`}>
         
         {/* Chat Header */}
         <header className="h-16 px-4 md:px-6 bg-white border-b border-border flex items-center justify-between shrink-0 shadow-sm z-10 relative">
            <div className="flex items-center gap-3">
               <button onClick={() => setShowListOnMobile(true)} className="p-2 -ml-2 text-text-muted md:hidden">
                  <ArrowLeft className="w-5 h-5" />
               </button>
               <img src={activeContact.avatar} className="w-10 h-10 rounded-full object-cover shrink-0" />
               <div>
                  <h2 className="font-extrabold text-foreground leading-tight flex items-center gap-2">
                     {activeContact.photographer}
                     {activeContact.online && <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0"></span>}
                  </h2>
                  <p className="text-xs text-text-muted font-semibold">{activeContact.refId}</p>
               </div>
            </div>
            <div>
               <button className="px-4 py-1.5 bg-surface-2 hover:bg-border text-foreground text-xs font-bold rounded-lg transition-colors border border-border">
                  View Booking
               </button>
            </div>
         </header>

         {/* Chat Scroll Area */}
         <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            
            {/* Booking Context Card */}
            {activeContact.statusBadge === "Upcoming Session" && (
               <div className="max-w-md mx-auto bg-white border border-border p-4 rounded-2xl shadow-sm mb-6 mt-2">
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-border">
                     <div className="w-10 h-10 rounded-xl bg-surface-2 flex items-center justify-center"><Camera className="w-5 h-5 text-primary" /></div>
                     <div>
                        <p className="font-extrabold text-sm text-foreground">Graduation Photoshoot</p>
                        <p className="text-xs font-bold text-teal flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Confirmed</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold text-text-muted">
                     <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> 15 Juni 2026</div>
                     <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Univ. Indonesia</div>
                  </div>
               </div>
            )}

            {/* Chat Messages */}
            {MOCK_CHAT.map(msg => {
               if (msg.type === "system") {
                  return (
                     <div key={msg.id} className="flex flex-col items-center my-4">
                        <span className="bg-surface-2 border border-border text-text-muted text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                           {msg.text}
                        </span>
                     </div>
                  );
               }

               const isUser = msg.type === "user";
               
               return (
                  <div key={msg.id} className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
                     <div className={`flex max-w-[85%] md:max-w-[70%] ${isUser ? "flex-row-reverse" : "flex-row"} gap-2 md:gap-3`}>
                        {/* Avatar */}
                        {!isUser && (
                           <img src={activeContact.avatar} className="w-8 h-8 rounded-full object-cover shrink-0 mt-auto hidden md:block" />
                        )}
                        
                        {/* Bubble Container */}
                        <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
                           
                           {/* Text/Image Bubble */}
                           <div className={`p-3 md:p-4 rounded-2xl ${
                              isUser 
                              ? "bg-primary text-white rounded-br-sm shadow-[0_2px_10px_rgba(var(--primary-rgb),0.2)]" 
                              : "bg-white border border-border text-foreground rounded-bl-sm shadow-sm"
                           }`}>
                              {msg.img && <img src={msg.img} alt="Attachment" className="w-48 md:w-64 rounded-xl mb-2 object-cover" />}
                              {msg.text && <p className={`text-sm font-medium leading-relaxed ${isUser ? 'text-white' : 'text-foreground'}`}>{msg.text}</p>}
                           </div>
                           
                           {/* Timestamp */}
                           <span className="text-[10px] font-bold text-text-muted mt-1.5 px-1">{msg.time}</span>
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>

         {/* Quick Actions (Suggested Replies) */}
         <div className="px-4 py-3 bg-surface border-t border-border overflow-x-auto hide-scrollbar flex gap-2 shrink-0">
            {QUICK_REPLIES.map((reply, i) => (
               <button 
                 key={i} 
                 onClick={() => setMessageInput(reply)}
                 className="whitespace-nowrap px-4 py-1.5 bg-white border border-border hover:border-primary text-text-muted hover:text-primary text-xs font-bold rounded-full transition-colors"
               >
                  {reply}
               </button>
            ))}
         </div>

         {/* Input Area */}
         <div className="p-4 bg-white border-t border-border shrink-0 pb-6 md:pb-4">
            <div className="flex items-end gap-2 max-w-4xl mx-auto">
               <button className="p-3 text-text-muted hover:text-primary bg-surface-2 hover:bg-primary-light rounded-xl transition-colors shrink-0">
                  <Paperclip className="w-5 h-5" />
               </button>
               <div className="flex-1 bg-surface-2 border border-border rounded-2xl overflow-hidden focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                  <textarea 
                     value={messageInput}
                     onChange={e => setMessageInput(e.target.value)}
                     placeholder="Type your message..." 
                     className="w-full max-h-32 min-h-[44px] bg-transparent outline-none p-3 text-sm font-medium resize-none leading-relaxed"
                     rows={1}
                  ></textarea>
               </div>
               <button 
                 disabled={!messageInput.trim()}
                 className="p-3 bg-primary hover:bg-primary-hover disabled:bg-surface-2 disabled:text-text-muted text-white rounded-xl transition-colors shadow-sm shrink-0"
               >
                  <Send className="w-5 h-5" />
               </button>
            </div>
         </div>

      </div>

    </main>
  );
}
