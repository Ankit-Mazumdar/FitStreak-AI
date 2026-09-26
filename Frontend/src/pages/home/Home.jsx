import React, { useEffect, useRef, useState } from "react";

const FEATURES = [
  {
    number: "01",
    icon: "workout",
    title: "Personalized Workouts",
    text: "AI creates dynamic workout plans tailored to your muscle balance, equipment availability, and performance trends.",
    tag: "SMART PLANS",
    accent: "cyan",
    gradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
  },
  {
    number: "02",
    icon: "vision",
    title: "AI Pose Detection",
    text: "Ultra-low latency computer vision tracks 33 skeletal keypoints in real time right inside your mobile or browser camera.",
    tag: "COMPUTER VISION",
    accent: "emerald",
    gradient: "from-emerald-500/20 via-teal-500/5 to-transparent",
  },
  {
    number: "03",
    icon: "rep",
    title: "Automatic Rep Counting",
    text: "Zero manual tracking. State-machine AI detects depth thresholds and accurately tallies every single repetition.",
    tag: "REAL-TIME",
    accent: "sky",
    gradient: "from-sky-500/20 via-blue-500/5 to-transparent",
  },
  {
    number: "04",
    icon: "biomechanics",
    title: "Form & Biomechanics Analysis",
    text: "Receive instant visual feedback whenever knees cave in, backs arch, or range of motion breaks proper form.",
    tag: "FORM CHECK",
    accent: "teal",
    gradient: "from-teal-500/20 via-emerald-500/5 to-transparent",
  },
  {
    number: "05",
    icon: "analytics",
    title: "Bio-Performance Score",
    text: "Synthesizes cadence, posture symmetry, power output, and time-under-tension into an action-driven score.",
    tag: "ANALYTICS",
    accent: "indigo",
    gradient: "from-indigo-500/20 via-cyan-500/5 to-transparent",
  },
  {
    number: "06",
    icon: "adaptive",
    title: "Adaptive AI Engine",
    text: "Self-learning intelligence modifies weight recommendations and rep targets for your next session automatically.",
    tag: "ADAPTIVE AI",
    accent: "purple",
    gradient: "from-purple-500/20 via-cyan-500/5 to-transparent",
  },
];

const WORKFLOW = [
  {
    number: "01",
    title: "Create Bio Profile",
    text: "Set fitness goals, injury history, available weights, and daily schedules.",
  },
  {
    number: "02",
    title: "AI Workouts Formulated",
    text: "Deep learning models synthesize optimal rest periods and target rep zones.",
  },
  {
    number: "03",
    title: "Camera Tracks Pose",
    text: "Align yourself in front of your phone or laptop webcam with full privacy.",
  },
  {
    number: "04",
    title: "Live Form Guidance",
    text: "Computer vision overlays joint angles, counts reps, and gives verbal tips.",
  },
  {
    number: "05",
    title: "Continuous Adaptation",
    text: "Your performance metrics feed back into the neural engine for continuous improvement.",
  },
];

function FeatureIcon({ type }) {
  const common = "w-8 h-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3";

  switch (type) {
    case "workout":
      return (
        <svg className={common} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 20V28M13 16V32M18 20V28M30 20V28M35 16V32M40 20V28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M18 24H30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M10 24H6M42 24H38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" opacity=".35" />
        </svg>
      );

    case "vision":
      return (
        <svg className={common} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="7" y="10" width="34" height="28" rx="5" stroke="currentColor" strokeWidth="2" />
          <circle cx="24" cy="24" r="7" stroke="currentColor" strokeWidth="2" />
          <circle cx="24" cy="24" r="2" fill="currentColor" />
          <path d="M12 15H16M32 15H36M12 33H16M32 33H36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M24 17V14M24 31V34M17 24H14M31 24H34" stroke="currentColor" strokeWidth="1.5" opacity=".6" />
        </svg>
      );

    case "rep":
      return (
        <svg className={common} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 17C16.5 13.5 20 12 24 12C30.6 12 36 17.4 36 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M34 31C31.5 34.5 28 36 24 36C17.4 36 12 30.6 12 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M34 17V24H27" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 31V24H21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="24" y="28" textAnchor="middle" fontSize="8" fontWeight="700" fill="currentColor">01</text>
        </svg>
      );

    case "biomechanics":
      return (
        <svg className={common} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="9" r="4" stroke="currentColor" strokeWidth="2" />
          <circle cx="15" cy="21" r="2.5" fill="currentColor" />
          <circle cx="33" cy="21" r="2.5" fill="currentColor" />
          <circle cx="18" cy="34" r="2.5" fill="currentColor" />
          <circle cx="30" cy="34" r="2.5" fill="currentColor" />
          <path d="M24 13L15 21L18 34M24 13L33 21L30 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 21H33M18 34H30" stroke="currentColor" strokeWidth="1.5" opacity=".65" />
          <circle cx="24" cy="13" r="2" fill="currentColor" />
        </svg>
      );

    case "analytics":
      return (
        <svg className={common} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 36V27M19 36V19M29 36V24M39 36V13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M8 15L17 10L27 16L39 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="8" cy="15" r="2" fill="currentColor" />
          <circle cx="17" cy="10" r="2" fill="currentColor" />
          <circle cx="27" cy="16" r="2" fill="currentColor" />
          <circle cx="39" cy="8" r="2" fill="currentColor" />
        </svg>
      );

    case "adaptive":
      return (
        <svg className={common} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
          <circle cx="24" cy="24" r="7" stroke="currentColor" strokeWidth="2" />
          <circle cx="24" cy="24" r="2.5" fill="currentColor" />
          <path d="M24 4V9M24 39V44M4 24H9M39 24H44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M31 17L34 14M14 34L17 31M31 31L34 34M14 14L17 17" stroke="currentColor" strokeWidth="1.5" opacity=".7" />
        </svg>
      );

    default:
      return null;
  }
}

function Logo({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGradient" x1="4" y1="4" x2="44" y2="44">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset=".5" stopColor="#14b8a6" />
          <stop offset="1" stopColor="#22c55e" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="42" height="42" rx="14" fill="#07111d" stroke="url(#logoGradient)" strokeWidth="1.5" />
      <path d="M24 35C20 31 12 26 12 19.5C12 15.9 14.8 13 18.3 13C20.8 13 23 14.4 24 16.5C25 14.4 27.2 13 29.7 13C33.2 13 36 15.9 36 19.5C36 26 28 31 24 35Z" stroke="url(#logoGradient)" strokeWidth="2" />
      <path d="M16 24H20L22 19L26 29L28 24H32" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AIPoseVisualizer() {
  const canvasRef = useRef(null);
  const [metrics, setMetrics] = useState({
    repCount: 12,
    formStatus: "PERFECT FORM",
    kneeAngle: 92,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawGlowLine = (p1, p2, glowColor, lineColor, glowWidth, lineWidth) => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = glowColor;
      ctx.lineWidth = glowWidth;
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
      ctx.restore();
    };

    const drawJoint = (point, radius, color) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius * 2.4, 0, Math.PI * 2);
      ctx.fillStyle = color.replace(")", ",0.08)").replace("rgb", "rgba");
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    };

    const render = (timestamp) => {
      const t = timestamp * 0.001;
      ctx.clearRect(0, 0, width, height);

      const bg = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        20,
        width * 0.5,
        height * 0.5,
        width * 0.7
      );
      bg.addColorStop(0, "rgba(8,32,48,0.95)");
      bg.addColorStop(0.55, "rgba(3,16,28,0.98)");
      bg.addColorStop(1, "rgba(2,8,16,1)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1;

      const gridSize = 34;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      ctx.restore();

      const cx = width * 0.5;
      const cy = height * 0.53;
      const scale = Math.min(width / 500, height / 500);

      const squatPhase = (Math.sin(t * 1.45) + 1) / 2;
      const smoothPhase = squatPhase * squatPhase * (3 - 2 * squatPhase);

      const shoulderY = cy - 110 * scale + smoothPhase * 10 * scale;
      const hipY = cy + 35 * scale + smoothPhase * 18 * scale;
      const kneeY = cy + 112 * scale - smoothPhase * 45 * scale;
      const ankleY = cy + 190 * scale;

      const head = { x: cx, y: shoulderY - 45 * scale };
      const neck = { x: cx, y: shoulderY - 15 * scale };

      const leftShoulder = {
        x: cx - 48 * scale,
        y: shoulderY,
      };

      const rightShoulder = {
        x: cx + 48 * scale,
        y: shoulderY,
      };

      const leftElbow = {
        x: cx - 83 * scale,
        y: shoulderY + 50 * scale,
      };

      const rightElbow = {
        x: cx + 83 * scale,
        y: shoulderY + 50 * scale,
      };

      const leftHand = {
        x: cx - 90 * scale,
        y: shoulderY + 103 * scale,
      };

      const rightHand = {
        x: cx + 90 * scale,
        y: shoulderY + 103 * scale,
      };

      const leftHip = {
        x: cx - 31 * scale,
        y: hipY,
      };

      const rightHip = {
        x: cx + 31 * scale,
        y: hipY,
      };

      const leftKnee = {
        x: cx - 54 * scale - smoothPhase * 20 * scale,
        y: kneeY,
      };

      const rightKnee = {
        x: cx + 54 * scale + smoothPhase * 20 * scale,
        y: kneeY,
      };

      const leftAnkle = {
        x: cx - 62 * scale,
        y: ankleY,
      };

      const rightAnkle = {
        x: cx + 62 * scale,
        y: ankleY,
      };

      const headRadius = 21 * scale;

      ctx.save();

      const headGradient = ctx.createRadialGradient(
        head.x - 5 * scale,
        head.y - 7 * scale,
        2,
        head.x,
        head.y,
        headRadius
      );

      headGradient.addColorStop(0, "#1ed8dd");
      headGradient.addColorStop(0.65, "#0c8fa8");
      headGradient.addColorStop(1, "#075568");

      ctx.beginPath();
      ctx.arc(head.x, head.y, headRadius, 0, Math.PI * 2);
      ctx.fillStyle = headGradient;
      ctx.shadowColor = "rgba(0,242,254,0.8)";
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(255,255,255,0.8)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        head.x + 5 * scale,
        head.y - 2 * scale,
        2 * scale,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.fill();
      ctx.restore();

      const skeletonConnections = [
        [neck, leftShoulder],
        [neck, rightShoulder],
        [leftShoulder, leftElbow],
        [leftElbow, leftHand],
        [rightShoulder, rightElbow],
        [rightElbow, rightHand],
        [leftShoulder, leftHip],
        [rightShoulder, rightHip],
        [leftHip, rightHip],
        [leftHip, leftKnee],
        [leftKnee, leftAnkle],
        [rightHip, rightKnee],
        [rightKnee, rightAnkle],
      ];

      skeletonConnections.forEach(([p1, p2]) => {
        drawGlowLine(
          p1,
          p2,
          "rgba(0,242,254,0.13)",
          "#35e4df",
          8 * scale,
          2 * scale
        );
      });

      const joints = [
        { point: neck, color: "#20e0c0" },
        { point: leftShoulder, color: "#00e5ff" },
        { point: rightShoulder, color: "#00e5ff" },
        { point: leftElbow, color: "#00e5ff" },
        { point: rightElbow, color: "#00e5ff" },
        { point: leftHand, color: "#20e0c0" },
        { point: rightHand, color: "#20e0c0" },
        { point: leftHip, color: "#20e0c0" },
        { point: rightHip, color: "#20e0c0" },
        { point: leftKnee, color: "#20e0c0" },
        { point: rightKnee, color: "#20e0c0" },
        { point: leftAnkle, color: "#00e5ff" },
        { point: rightAnkle, color: "#00e5ff" },
      ];

      joints.forEach(({ point, color }) => {
        drawJoint(point, 4.5 * scale, color);
      });

      if (smoothPhase > 0.18) {
        ctx.save();
        ctx.setLineDash([4, 7]);
        ctx.strokeStyle = "rgba(0,242,254,0.20)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(leftHip.x, leftHip.y);
        ctx.lineTo(leftKnee.x, leftKnee.y);
        ctx.lineTo(leftAnkle.x, leftAnkle.y);
        ctx.stroke();
        ctx.restore();
      }

      const currentKnee = Math.round(122 - smoothPhase * 58);

      ctx.save();

      const angleRadius = 27 * scale;

      ctx.beginPath();
      ctx.arc(
        leftKnee.x,
        leftKnee.y,
        angleRadius,
        -Math.PI / 2,
        -Math.PI / 2 + Math.PI * 0.48 * smoothPhase + 0.45
      );

      ctx.strokeStyle = "#32e6b2";
      ctx.lineWidth = 2.5 * scale;
      ctx.shadowColor = "#32e6b2";
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.font = `700 ${Math.max(11, 13 * scale)}px Inter, sans-serif`;
      ctx.fillStyle = "#6fffe5";
      ctx.fillText(
        `${currentKnee}°`,
        leftKnee.x - 43 * scale,
        leftKnee.y - 13 * scale
      );

      ctx.font = `500 ${Math.max(8, 9 * scale)}px Inter, sans-serif`;
      ctx.fillStyle = "rgba(180,255,247,0.55)";
      ctx.fillText(
        "KNEE",
        leftKnee.x - 43 * scale,
        leftKnee.y - 2 * scale
      );

      ctx.restore();

      const depthProgress = Math.min(1, smoothPhase);
      const depthX = width - 38 * scale;
      const depthTop = cy - 92 * scale;
      const depthHeight = 145 * scale;

      ctx.save();

      ctx.beginPath();
      ctx.roundRect(depthX, depthTop, 4 * scale, depthHeight, 4 * scale);
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fill();

      const progressHeight = depthHeight * depthProgress;

      ctx.beginPath();
      ctx.roundRect(
        depthX,
        depthTop + depthHeight - progressHeight,
        4 * scale,
        progressHeight,
        4 * scale
      );

      const depthGradient = ctx.createLinearGradient(
        0,
        depthTop,
        0,
        depthTop + depthHeight
      );

      depthGradient.addColorStop(0, "#22c55e");
      depthGradient.addColorStop(1, "#06b6d4");

      ctx.fillStyle = depthGradient;
      ctx.shadowColor = "#10b981";
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.font = `600 ${Math.max(8, 9 * scale)}px Inter, sans-serif`;
      ctx.fillStyle = "rgba(255,255,255,0.48)";
      ctx.fillText(
        "DEPTH",
        depthX - 20 * scale,
        depthTop - 9 * scale
      );

      ctx.restore();

      const scanY = ((t * 38) % (height + 80)) - 40;

      ctx.save();

      const scanGradient = ctx.createLinearGradient(
        0,
        scanY - 18,
        0,
        scanY + 18
      );

      scanGradient.addColorStop(0, "rgba(0,242,254,0)");
      scanGradient.addColorStop(0.5, "rgba(0,242,254,0.10)");
      scanGradient.addColorStop(1, "rgba(0,242,254,0)");

      ctx.fillStyle = scanGradient;
      ctx.fillRect(0, scanY - 18, width, 36);

      ctx.restore();

      ctx.save();

      const reticleY = head.y - 34 * scale;
      const reticleSize = 23 * scale;

      ctx.strokeStyle = "rgba(0,242,254,0.28)";
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.arc(head.x, reticleY, reticleSize, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(head.x - reticleSize - 5, reticleY);
      ctx.lineTo(head.x - reticleSize + 3, reticleY);
      ctx.moveTo(head.x + reticleSize - 3, reticleY);
      ctx.lineTo(head.x + reticleSize + 5, reticleY);
      ctx.stroke();

      ctx.restore();

      if (Math.floor(t * 2) % 2 === 0) {
        setMetrics({
          repCount: 12 + Math.floor(t / 8) % 4,
          formStatus: smoothPhase > 0.82 ? "CHECK DEPTH" : "PERFECT FORM",
          kneeAngle: currentKnee,
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative w-full h-[420px] md:h-[500px] rounded-3xl bg-slate-950 border border-slate-700/60 backdrop-blur-xl overflow-hidden shadow-2xl shadow-cyan-950/40 flex flex-col items-center justify-center">
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-slate-950/85 border border-emerald-500/30 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-mono text-emerald-400 backdrop-blur-md shadow-lg shadow-emerald-950/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>AI POSE TRACKING</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-slate-950/85 border border-cyan-500/25 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-mono text-cyan-300 backdrop-blur-md">
          <span>33 LANDMARKS</span>
          <span className="text-slate-600">|</span>
          <span>60 FPS</span>
          <span className="text-slate-600">|</span>
          <span>12ms</span>
        </div>
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/55 border border-white/5 backdrop-blur-md">
          <span className="text-[9px] font-mono tracking-[0.18em] text-slate-500">
            SQUAT ANALYSIS
          </span>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-20 grid grid-cols-3 gap-2 md:gap-4 pointer-events-none">
        <div className="bg-slate-950/90 border border-cyan-500/15 rounded-2xl p-2.5 md:p-3 text-center backdrop-blur-xl shadow-lg shadow-black/20">
          <p className="text-[9px] md:text-[10px] text-slate-500 font-mono tracking-wider">
            REPETITIONS
          </p>
          <p className="text-lg md:text-2xl font-bold font-mono text-cyan-400 mt-0.5">
            {metrics.repCount}
          </p>
        </div>

        <div className="bg-slate-950/90 border border-emerald-500/15 rounded-2xl p-2.5 md:p-3 text-center backdrop-blur-xl shadow-lg shadow-black/20">
          <p className="text-[9px] md:text-[10px] text-slate-500 font-mono tracking-wider">
            FORM STATUS
          </p>
          <p className="text-[10px] md:text-sm font-bold font-mono text-emerald-400 mt-1 truncate">
            {metrics.formStatus}
          </p>
        </div>

        <div className="bg-slate-950/90 border border-teal-500/15 rounded-2xl p-2.5 md:p-3 text-center backdrop-blur-xl shadow-lg shadow-black/20">
          <p className="text-[9px] md:text-[10px] text-slate-500 font-mono tracking-wider">
            KNEE ANGLE
          </p>
          <p className="text-lg md:text-2xl font-bold font-mono text-emerald-300 mt-0.5">
            {metrics.kneeAngle}°
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ feature }) {
  const accentClasses = {
    cyan: {
      text: "text-cyan-300",
      icon: "text-cyan-300",
      border: "group-hover:border-cyan-400/50",
      glow: "group-hover:shadow-cyan-500/10",
      line: "bg-cyan-400",
      dot: "bg-cyan-400",
    },
    emerald: {
      text: "text-emerald-300",
      icon: "text-emerald-300",
      border: "group-hover:border-emerald-400/50",
      glow: "group-hover:shadow-emerald-500/10",
      line: "bg-emerald-400",
      dot: "bg-emerald-400",
    },
    sky: {
      text: "text-sky-300",
      icon: "text-sky-300",
      border: "group-hover:border-sky-400/50",
      glow: "group-hover:shadow-sky-500/10",
      line: "bg-sky-400",
      dot: "bg-sky-400",
    },
    teal: {
      text: "text-teal-300",
      icon: "text-teal-300",
      border: "group-hover:border-teal-400/50",
      glow: "group-hover:shadow-teal-500/10",
      line: "bg-teal-400",
      dot: "bg-teal-400",
    },
    indigo: {
      text: "text-indigo-300",
      icon: "text-indigo-300",
      border: "group-hover:border-indigo-400/50",
      glow: "group-hover:shadow-indigo-500/10",
      line: "bg-indigo-400",
      dot: "bg-indigo-400",
    },
    purple: {
      text: "text-purple-300",
      icon: "text-purple-300",
      border: "group-hover:border-purple-400/50",
      glow: "group-hover:shadow-purple-500/10",
      line: "bg-purple-400",
      dot: "bg-purple-400",
    },
  };

  const accent = accentClasses[feature.accent];

  return (
    <div className={`group relative min-h-[330px] p-7 rounded-[28px] bg-slate-950/70 border border-slate-800/80 backdrop-blur-xl overflow-hidden transition-all duration-500 ease-out hover:-translate-y-3 hover:bg-slate-900/90 hover:shadow-2xl ${accent.border} ${accent.glow}`}>
      <div className="absolute -right-4 -top-8 text-[130px] leading-none font-black tracking-tighter text-white/[0.025] select-none transition-all duration-700 group-hover:text-white/[0.06] group-hover:scale-110">
        {feature.number}
      </div>

      <div className={`absolute inset-0 rounded-[28px] bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] pointer-events-none" />

      <div className={`absolute top-4 right-4 w-5 h-5 border-t border-r ${accent.border} opacity-50 group-hover:opacity-100 transition-all`} />

      <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-slate-700 group-hover:border-slate-500 transition-all" />

      <div className="relative z-10 flex items-center justify-between mb-8">
        <div className={`relative w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center ${accent.icon} transition-all duration-500 group-hover:border-current group-hover:shadow-[0_0_25px_rgba(0,242,254,0.12)]`}>
          <div className="absolute inset-1 rounded-xl border border-white/[0.04]" />
          <div className="absolute -inset-1 rounded-2xl border border-current opacity-0 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500" />
          <FeatureIcon type={feature.icon} />
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-[9px] font-mono font-bold tracking-wider text-slate-400 group-hover:text-slate-200 transition-colors">
          <span className={`w-1.5 h-1.5 rounded-full ${accent.dot} opacity-60 group-hover:opacity-100 group-hover:animate-pulse`} />
          {feature.tag}
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-3 mb-3">
        <span className={`text-[10px] font-mono font-bold ${accent.text} tracking-[0.25em]`}>
          MODULE {feature.number}
        </span>
        <div className="h-px flex-1 bg-slate-800 group-hover:bg-slate-700 transition-colors" />
      </div>

      <h3 className="relative z-10 text-xl md:text-[21px] font-bold text-white mb-3 tracking-tight transition-all duration-300 group-hover:translate-x-1">
        {feature.title}
      </h3>

      <p className="relative z-10 text-sm text-slate-400 leading-7 max-w-[95%] transition-colors duration-300 group-hover:text-slate-300">
        {feature.text}
      </p>

      <div className="absolute bottom-7 right-7 left-7 flex items-center justify-between opacity-60 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className={`w-1 h-1 rounded-full ${accent.dot}`} />
            <span className={`w-1 h-1 rounded-full ${accent.dot} opacity-60`} />
            <span className={`w-1 h-1 rounded-full ${accent.dot} opacity-30`} />
          </div>
          <span className="text-[9px] font-mono tracking-widest text-slate-500">
            AI SYSTEM ONLINE
          </span>
        </div>

        <span className={`text-sm ${accent.text} transition-transform duration-300 group-hover:translate-x-1`}>
          →
        </span>
      </div>
    </div>
  );
}

export default function FitStreakAI() {
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWorkflowStep(prev => (prev + 1) % WORKFLOW.length);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-[35%] right-10 w-[450px] h-[450px] bg-emerald-600/15 rounded-full blur-[150px]" />
        <div className="absolute top-[70%] left-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#060a12]/80 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group">
            <Logo size={42} />

            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-300">
                FitStreak{" "}
                <span className="text-emerald-400">AI</span>
              </span>

              <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase -mt-1">
                ADAPTIVE COACH
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-cyan-400 transition-colors">
              Features
            </a>
            <a href="#workflow" className="hover:text-cyan-400 transition-colors">
              How It Works
            </a>
            <a href="#analytics" className="hover:text-cyan-400 transition-colors">
              AI Engine
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                window.location.href = "/login";
              }}
              className="hidden sm:inline-flex text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 transition-colors"
            >
              Sign In
            </button>

            <button className="relative group overflow-hidden rounded-full p-px font-semibold text-xs md:text-sm">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-emerald-400 to-teal-500 rounded-full" />
              <span className="relative block px-5 py-2.5 bg-slate-950 rounded-full text-white group-hover:bg-opacity-0 transition-all duration-300">
                Start Free Trial
              </span>
            </button>
          </div>
        </div>
      </header>

      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-mono backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>NEXT-GEN COMPUTER VISION v2.4</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Transform Fitness
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                With Real-Time AI
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Experience the future of personal training. Computer vision tracks your pose, detects repetitions, corrects form live, and automatically adapts your workouts.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-base shadow-lg shadow-cyan-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all">
                <span>Get Started Now</span>
                <span className="text-xl">→</span>
              </button>

              <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 hover:border-slate-500 text-slate-200 font-semibold text-base backdrop-blur-md transition-all">
                <span>Watch Live Demo</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
              <div>
                <p className="text-2xl font-black text-white font-mono">99.4%</p>
                <p className="text-xs text-slate-400">Pose Accuracy</p>
              </div>

              <div>
                <p className="text-2xl font-black text-emerald-400 font-mono">33+</p>
                <p className="text-xs text-slate-400">Joint Points</p>
              </div>

              <div>
                <p className="text-2xl font-black text-cyan-400 font-mono">100k+</p>
                <p className="text-xs text-slate-400">Active Workouts</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-[32px] blur-xl opacity-30" />
            <AIPoseVisualizer />
          </div>
        </div>
      </section>

      <section id="features" className="relative py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/60">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative text-center max-w-3xl mx-auto mb-20 space-y-5">
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-px bg-cyan-500/50" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400">
              INTELLIGENT CAPABILITIES
            </span>
            <span className="w-8 h-px bg-cyan-500/50" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Everything You Need
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              To Level Up
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-7">
            A connected intelligence layer that transforms every movement, repetition, and performance signal into actionable fitness data.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(feature => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </section>

      <section id="workflow" className="py-28 bg-slate-950/60 border-t border-slate-800/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-5">
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-px bg-emerald-500/50" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400">
                ADAPTIVE WORKFLOW
              </span>
              <span className="w-8 h-px bg-emerald-500/50" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white">
              From Movement To{" "}
              <span className="text-cyan-400">Intelligence</span>
            </h2>

            <p className="text-sm text-slate-400">
              Every workout becomes a feedback loop that continuously improves your training experience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 relative">
            {WORKFLOW.map((step, index) => {
              const isActive = activeWorkflowStep === index;

              return (
                <div
                  key={step.title}
                  onClick={() => setActiveWorkflowStep(index)}
                  className={`relative cursor-pointer p-6 rounded-2xl transition-all duration-500 border overflow-hidden ${
                    isActive
                      ? "bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-950/60 scale-[1.02]"
                      : "bg-slate-900/40 border-slate-800 hover:border-slate-700 opacity-70"
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`font-mono text-xs px-2.5 py-1 rounded-md font-bold ${
                        isActive
                          ? "bg-cyan-500 text-slate-950"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      STEP {step.number}
                    </span>

                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    )}
                  </div>

                  <h3
                    className={`text-base font-bold mb-2 ${
                      isActive ? "text-white" : "text-slate-300"
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center shrink-0">
                <Logo size={36} />
              </div>

              <div>
                <p className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                  CONTINUOUS FEEDBACK LOOP
                </p>

                <h4 className="text-lg font-bold text-white">
                  Your Workout Automatically Gets Smarter Every Single Rep
                </h4>
              </div>
            </div>

            <button className="shrink-0 px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 hover:scale-105 transition-all">
              Activate AI Session
            </button>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-800/80 bg-[#04070d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo size={32} />

            <span className="font-bold text-base text-white tracking-tight">
              FitStreak{" "}
              <span className="text-emerald-400">AI</span>
            </span>
          </div>

          <p className="text-xs text-slate-500 text-center">
            © {new Date().getFullYear()} FitStreak AI Inc. All rights reserved. Adaptive Biomechanical Coaching.
          </p>

          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Privacy
            </a>

            <a href="#" className="hover:text-cyan-400 transition-colors">
              Terms
            </a>

            <a href="#" className="hover:text-cyan-400 transition-colors">
              Security
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}