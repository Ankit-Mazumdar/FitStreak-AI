import React from "react";
import { useNavigate } from "react-router-dom";

const stats=[
  {icon:"🔥",label:"CURRENT STREAK",value:"7",unit:"DAYS",color:"text-orange-400"},
  {icon:"💪",label:"WORKOUTS",value:"12",unit:"THIS MONTH",color:"text-cyan-400"},
  {icon:"◉",label:"AVG SCORE",value:"86",unit:"/ 100",color:"text-emerald-400"},
  {icon:"🎯",label:"WEEKLY GOAL",value:"4/5",unit:"WORKOUTS",color:"text-purple-400"}
];

const modules=[
  {icon:"◈",title:"Today's Workout",tag:"PERSONALIZED",text:"Full Body Strength",info:"20 MIN • 6 EXERCISES",button:"Start Workout",path:"/workout",color:"cyan"},
  {icon:"⌁",title:"AI Form Check",tag:"COMPUTER VISION",text:"Check your exercise form with real-time AI pose analysis.",info:"CAMERA • LIVE ANALYSIS",button:"Open Camera",path:"/camera",color:"emerald"},
  {icon:"◫",title:"Performance",tag:"ANALYTICS",text:"Track your scores, form quality and fitness progress.",info:"SCORE • HISTORY • PROGRESS",button:"View Progress",path:"/progress",color:"sky"},
  {icon:"♛",title:"Engagement",tag:"STREAK SYSTEM",text:"Keep your momentum with streaks, challenges and achievements.",info:"7 DAY STREAK • 2 BADGES",button:"Explore",path:"/challenges",color:"purple"}
];

const activities=[
  {title:"Full Body Workout",detail:"12 exercises completed",score:"88",time:"Today"},
  {title:"Squat Form Check",detail:"Excellent form detected",score:"92",time:"Yesterday"},
  {title:"Upper Body Workout",detail:"10 exercises completed",score:"81",time:"2 days ago"}
];

function Logo({size=40}){
  return <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <defs><linearGradient id="dashLogo" x1="4" y1="4" x2="44" y2="44"><stop stopColor="#22d3ee"/><stop offset=".5" stopColor="#14b8a6"/><stop offset="1" stopColor="#22c55e"/></linearGradient></defs>
    <rect x="3" y="3" width="42" height="42" rx="14" fill="#07111d" stroke="url(#dashLogo)" strokeWidth="1.5"/>
    <path d="M24 35C20 31 12 26 12 19.5C12 15.9 14.8 13 18.3 13C20.8 13 23 14.4 24 16.5C25 14.4 27.2 13 29.7 13C33.2 13 36 15.9 36 19.5C36 26 28 31 24 35Z" stroke="url(#dashLogo)" strokeWidth="2"/>
    <path d="M16 24H20L22 19L26 29L28 24H32" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}

function ModuleCard({item,onClick}){
  const colors={cyan:"text-cyan-400 border-cyan-500/30 hover:border-cyan-400/60",emerald:"text-emerald-400 border-emerald-500/30 hover:border-emerald-400/60",sky:"text-sky-400 border-sky-500/30 hover:border-sky-400/60",purple:"text-purple-400 border-purple-500/30 hover:border-purple-400/60"};
  return <div onClick={onClick} className={`group relative p-6 rounded-3xl bg-slate-950/70 border ${colors[item.color]} backdrop-blur-xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300`}>
    <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-current opacity-[.05] blur-3xl"/>
    <div className="relative flex items-start justify-between">
      <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-xl">{item.icon}</div>
      <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[9px] font-mono tracking-wider text-slate-400">{item.tag}</span>
    </div>
    <h3 className="mt-6 text-xl font-bold text-white">{item.title}</h3>
    <p className="mt-2 text-sm text-slate-400 leading-6 min-h-[48px]">{item.text}</p>
    <p className="mt-5 text-[9px] font-mono tracking-widest text-slate-500">{item.info}</p>
    <button className="mt-5 w-full py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm font-semibold text-white group-hover:bg-white group-hover:text-slate-950 transition-all">{item.button} →</button>
  </div>;
}

export default function Dashboard(){
  const navigate=useNavigate();
  const user=JSON.parse(localStorage.getItem("user")||"{}");
  const name=user.name||"Ankit";
  const hour=new Date().getHours();
  const greeting=hour<12?"Good Morning":hour<18?"Good Afternoon":"Good Evening";

  return <div className="min-h-screen bg-[#060a12] text-slate-100 font-sans relative overflow-x-hidden">
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-cyan-600/10 rounded-full blur-[140px]"/>
      <div className="absolute top-[45%] right-0 w-[450px] h-[450px] bg-emerald-600/10 rounded-full blur-[150px]"/>
      <div className="absolute bottom-0 left-0 w-[450px] h-[350px] bg-purple-600/10 rounded-full blur-[150px]"/>
      <div className="absolute inset-0 opacity-[.025]" style={{backgroundImage:"radial-gradient(circle,#fff 1px,transparent 1px)",backgroundSize:"24px 24px"}}/>
    </div>

    <header className="sticky top-0 z-50 h-20 border-b border-slate-800/60 bg-[#060a12]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo/>
          <div><p className="text-lg font-black text-white">FitStreak <span className="text-emerald-400">AI</span></p><p className="text-[9px] font-mono tracking-widest text-slate-500">ADAPTIVE COACH</p></div>
        </div>
        <nav className="hidden md:flex items-center gap-7 text-sm text-slate-400">
          <span className="text-cyan-400">Dashboard</span>
          <button onClick={()=>navigate("/workout")} className="hover:text-white">Workout</button>
          <button onClick={()=>navigate("/progress")} className="hover:text-white">Progress</button>
          <button onClick={()=>navigate("/challenges")} className="hover:text-white">Challenges</button>
        </nav>
        <button onClick={()=>navigate("/profile")} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 text-slate-950 flex items-center justify-center text-xs font-black">{name[0]}</div>
          <span className="hidden sm:block text-sm text-slate-300">{name}</span>
        </button>
      </div>
    </header>

    <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/><span className="text-[10px] font-mono tracking-[.25em] text-emerald-400">AI SYSTEM ONLINE</span></div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">{greeting}, <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">{name}</span> 👋</h1>
          <p className="mt-3 text-slate-400">Ready to keep your streak alive?</p>
        </div>
        <div className="px-4 py-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-right"><p className="text-[9px] font-mono text-slate-500 tracking-widest">NEXT SESSION</p><p className="text-sm font-bold text-cyan-400 mt-1">FULL BODY • 20 MIN</p></div>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s=><div key={s.label} className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-xl"><div className="flex items-center justify-between"><span className="text-xl">{s.icon}</span><span className={`text-[9px] font-mono ${s.color}`}>LIVE</span></div><p className="mt-4 text-[9px] font-mono tracking-widest text-slate-500">{s.label}</p><div className="mt-1 flex items-baseline gap-1"><span className={`text-2xl font-black font-mono ${s.color}`}>{s.value}</span><span className="text-[9px] text-slate-500 font-mono">{s.unit}</span></div></div>)}
      </section>

      <section className="grid md:grid-cols-2 gap-5">
        {modules.map(item=><ModuleCard key={item.title} item={item} onClick={()=>navigate(item.path)}/>)}
      </section>

      <section className="mt-5 grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-cyan-950/30 to-slate-950 border border-cyan-500/20 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-[80px]"/>
          <div className="relative flex items-start justify-between"><div><p className="text-[9px] font-mono tracking-[.25em] text-cyan-400">AI RECOMMENDATION</p><h2 className="mt-2 text-xl font-bold text-white">Your training is progressing well.</h2></div><span className="text-2xl">🤖</span></div>
          <p className="relative mt-3 text-sm text-slate-400 leading-6 max-w-2xl">Your recent performance shows improved form consistency. Your next workout can be adjusted based on your previous performance.</p>
          <button onClick={()=>navigate("/workout")} className="relative mt-5 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition">View Next Workout →</button>
        </div>

        <div className="p-6 rounded-3xl bg-slate-950/70 border border-slate-800">
          <p className="text-[9px] font-mono tracking-[.25em] text-purple-400">ENGAGEMENT</p>
          <div className="mt-5 flex items-center justify-between"><div><p className="text-3xl font-black text-white">🔥 7</p><p className="text-xs text-slate-500 mt-1">DAY STREAK</p></div><div className="text-right"><p className="text-3xl font-black text-purple-400">2</p><p className="text-xs text-slate-500 mt-1">BADGES</p></div></div>
          <div className="mt-5 h-2 rounded-full bg-slate-800 overflow-hidden"><div className="h-full w-[80%] bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"/></div>
          <p className="mt-2 text-[10px] text-slate-500">4 of 5 weekly workouts completed</p>
        </div>
      </section>

      <section className="mt-5 p-6 rounded-3xl bg-slate-950/70 border border-slate-800">
        <div className="flex items-center justify-between mb-5"><div><p className="text-[9px] font-mono tracking-[.25em] text-slate-500">RECENT ACTIVITY</p><h2 className="mt-1 text-lg font-bold text-white">Your Training History</h2></div><button onClick={()=>navigate("/progress")} className="text-xs text-cyan-400 hover:text-cyan-300">View All →</button></div>
        <div className="space-y-2">{activities.map(a=><div key={a.title} className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/70"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400">✓</div><div><p className="text-sm font-semibold text-white">{a.title}</p><p className="text-[10px] text-slate-500 mt-1">{a.detail} • {a.time}</p></div></div><div className="text-right"><p className="text-sm font-black text-emerald-400">{a.score}</p><p className="text-[8px] text-slate-600 font-mono">SCORE</p></div></div>)}</div>
      </section>
    </main>
  </div>;
}