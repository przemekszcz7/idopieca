/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  Compass, 
  Sparkles, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Flame, 
  Utensils,
  Share2,
  Heart,
  ExternalLink,
  Info
} from "lucide-react";
import { polishMenu, worldMenu, sauces, MenuItem } from "./menuData";

export default function App() {
  // Navigation states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Menu filtering & search states
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "polish" | "world">("all");

  // Lightbox picture index state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Happy selector mini-game states
  const [rolledZapiekanka, setRolledZapiekanka] = useState<MenuItem | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [rollNumbers, setRollNumbers] = useState<number[]>([]);

  // Array of gallery photos as listed by user
  const galleryImages = [
    "https://i.ibb.co/BVxJG0Mj/698228556-122104506981306296-3797738921322934845-n.jpg",
    "https://i.ibb.co/BVnrGRty/698751442-122104245009306296-3770086173935577384-n.jpg",
    "https://i.ibb.co/m5g0YGzf/716650279-122109606243306296-4322593971461742474-n.jpg",
    "https://i.ibb.co/xqr3HqKZ/709135885-122108442363306296-3194484470180328538-n.jpg",
    "https://i.ibb.co/1GHxyqJQ/705950085-122106679683306296-3221069082012316454-n.jpg",
    "https://i.ibb.co/gMVfgMgG/685535508-122094807201306296-6486521211296837185-n.jpg"
  ];

  // Map section anchors to update active nav state using IntersectionObserver
  useEffect(() => {
    const sections = ["hero", "o-nas", "menu", "galeria", "opinie", "kontakt"];
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Handle ESC key for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowLeft" && lightboxIndex !== null) {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryImages.length - 1));
      } else if (e.key === "ArrowRight" && lightboxIndex !== null) {
        setLightboxIndex((prev) => (prev !== null && prev < galleryImages.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  // Combined menu filtering logic
  const filteredPolish = polishMenu.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.ingredients.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredWorld = worldMenu.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.ingredients.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Play "Lotto & Zapieks Matcher" mini-game roller
  const rollZapiekankaWheel = () => {
    if (isRolling) return;
    setIsRolling(true);
    setRolledZapiekanka(null);
    setRollNumbers([]);

    // Simulating lotto balls rolling
    let counter = 0;
    const interval = setInterval(() => {
      const randomBalls = Array.from({ length: 6 }, () => Math.floor(Math.random() * 49) + 1);
      setRollNumbers(randomBalls);
      counter++;
      if (counter > 12) {
        clearInterval(interval);
        
        // Grab a random zapiekanka from the combined pool
        const combinedPool = [...polishMenu, ...worldMenu];
        const luckyChoice = combinedPool[Math.floor(Math.random() * combinedPool.length)];
        
        // Final lotto draw numbers including a special double bonus
        const finalBalls = [7, 13, 24, 32, 45, Math.floor(Math.random() * 9) + 1].sort((a,b) => a - b);
        setRollNumbers(finalBalls);
        setRolledZapiekanka(luckyChoice);
        setIsRolling(false);
      }
    }, 120);
  };

  // Nav Links renderer helper
  const renderNavLinks = (isMobile = false) => {
    const links = [
      { name: "O Nas", id: "o-nas" },
      { name: "Menu", id: "menu" },
      { name: "Galeria", id: "galeria" },
      { name: "Opinie", id: "opinie" },
      { name: "Kontakt", id: "kontakt" }
    ];

    return (
      <>
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            id={`nav-link-${link.id}`}
            onClick={() => isMobile && setMobileMenuOpen(false)}
            className={`nav-link font-sans text-xs tracking-widest font-semibold uppercase ${
              activeSection === link.id ? "text-[#E8621A] active" : "text-[#A89880] hover:text-[#E8621A]"
            } transition-colors duration-300 py-2`}
          >
            {link.name}
          </a>
        ))}
      </>
    );
  };

  return (
    <div className="min-h-screen chalkboard-noise text-[#F5EFE6] selection:bg-[#E8621A] selection:text-black">
      
      {/* 2. NAVIGATION BAR */}
      <nav id="navbar" className="fixed top-0 left-0 w-full z-50 bg-[#0D0D0D]/95 backdrop-blur-[14px] border-b border-[#E8621A]/40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Left */}
          <a href="#hero" className="flex flex-col select-none group">
            <span className="font-bebas text-2xl sm:text-3xl tracking-wide text-white group-hover:text-[#E8621A] transition-colors duration-300 leading-none">
              MANUFAKTURA ZAPIEKANKI
            </span>
            <span className="font-dancing text-[#E8621A] text-sm self-start tracking-wide leading-none mt-1 pl-1">
              ..i do pieca
            </span>
          </a>

          {/* Desktop Nav Right */}
          <div className="hidden md:flex items-center space-x-8">
            {renderNavLinks(false)}
          </div>

          {/* Mobile Hamburger Trigger */}
          <button 
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-[#E8621A] hover:text-[#FF7A2F] transition-colors focus:outline-none"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Full Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            id="mobile-drawer"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-45 bg-[#0D0D0D] flex flex-col justify-center items-center h-screen w-screen block"
          >
            <div className="absolute top-6 left-6">
              <span className="font-bebas text-xl text-white">MANUFAKTURA ZAPIEKANKI</span>
              <p className="font-dancing text-[#E8621A] text-xs">..i do pieca</p>
            </div>
            
            <div className="flex flex-col space-y-8 text-center text-xl">
              {renderNavLinks(true)}
            </div>

            <div className="absolute bottom-10 text-center">
              <span className="text-xs text-[#A89880] uppercase tracking-widest block mb-2">Grodzka 8, Krosno</span>
              <a href="tel:504355195" className="font-bebas text-[#E8621A] tracking-wider text-lg hover:text-[#FF7A2F]">
                504 355 195
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* 3. HERO SECTION */}
      <header 
        id="hero" 
        className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(13,13,13,0.85) 0%, rgba(232,98,26,0.25) 100%), url('https://i.ibb.co/d4jnc3G0/685039030-122093569689306296-103358382328825199-n.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center select-none pt-12">
          
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm text-spacing-wide text-[#E8621A] font-semibold tracking-[0.25em] mb-4"
          >
            Krosno · ul. Grodzka 8
          </motion.p>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="font-bebas text-white tracking-widest leading-none drop-shadow-2xl neon-glow"
            style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
          >
            MANUFAKTURA ZAPIEKANKI
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col items-center mt-3"
          >
            <span className="font-dancing text-[#E8621A] text-3xl sm:text-4xl">
              ..i do pieca
            </span>
            <div className="w-[120px] h-[2px] bg-[#E8621A] my-6"></div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="font-sans font-light text-[#F5EFE6] italic text-base sm:text-lg max-w-lg mx-auto leading-relaxed mb-10"
          >
            Prawdziwa mapa smaków – inspirowana Polską i światem
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a 
              href="#menu" 
              className="px-8 py-4.5 bg-[#E8621A] hover:bg-[#FF7A2F] text-black font-bebas text-lg tracking-widest rounded-[2px] transition-all duration-300 transform hover:scale-105 btn-neon w-full sm:w-auto"
            >
              SPRAWDŹ MENU
            </a>
            <a 
              href="#wheel" 
              className="px-8 py-4 bg-transparent hover:bg-white/5 text-[#E8621A] border-2 border-[#E8621A] hover:border-[#FF7A2F] font-bebas text-lg tracking-widest rounded-[2px] transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              ZAPIEKANKA & MILION?
            </a>
          </motion.div>
        </div>

        {/* Animated bounce scroll-down indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-[#E8621A] bounce-chevron cursor-pointer select-none">
          <a href="#o-nas" className="flex flex-col items-center text-xs tracking-widest uppercase opacity-75 hover:opacity-100 transition-opacity">
            <span className="mb-1 text-[10px]">Przewiń</span>
            <ChevronDown className="w-6 h-6" />
          </a>
        </div>
      </header>


      {/* 4. O NAS (About Us) */}
      <section id="o-nas" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#161616] relative transition-all overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Story text */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-6"
            >
              <span className="text-xs text-spacing-wide text-[#E8621A] font-semibold block">
                KIM JESTEŚMY
              </span>
              <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                NASZE ZAPIEKANKI TO COŚ WIĘCEJ NIŻ KLASYKA
              </h2>
              <p className="font-sans font-light text-[#F5EFE6] text-lg leading-relaxed">
                To prawdziwa mapa smaków inspirowana różnymi regionami Polski i zakątkami świata. 
                Każda zapiekanka to ręczne rzemiosło, świeże składniki i niepowtarzalny charakter. 
                Unikamy sztampowych rozwiązań — tworzymy z wielką pasją w sercu Krosna, łącząc chrupiące bagietki najwyższej jakości i wyselekcjonowane lokalne sery.
              </p>

              {/* Two feature blocks with orange left-border */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="border-l-4 border-[#E8621A] pl-4 space-y-2">
                  <h3 className="font-bebas text-xl text-white tracking-wider flex items-center gap-2">
                    <span>🥖</span> Na wynos
                  </h3>
                  <p className="font-sans text-xs text-[#A89880] leading-relaxed">
                    Zgarnij kraftową zapiekę i leć dalej — nasza chrupiąca receptura smakuje doskonale wszędzie!
                  </p>
                </div>
                <div className="border-l-4 border-[#E8621A] pl-4 space-y-2">
                  <h3 className="font-bebas text-xl text-white tracking-wider flex items-center gap-2">
                    <span>🎰</span> Zapiekanka i milion?
                  </h3>
                  <p className="font-sans text-xs text-[#A89880] leading-relaxed">
                    Przyjdź, zjedz, sprawdź ofertę gier liczbowych Lotto. Znajdź swoje nowe szczęśliwe miejsce na ul. Grodzkiej!
                  </p>
                </div>
              </div>

              {/* Three dynamic stats chips */}
              <div className="flex flex-wrap gap-3 pt-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 border border-[#E8621A]/30 text-xs uppercase tracking-widest text-[#F5EFE6] font-semibold rounded-full select-none">
                  🗺️ 26+ Smaków
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 border border-[#E8621A]/30 text-xs uppercase tracking-widest text-[#F5EFE6] font-semibold rounded-full select-none">
                  🔥 Świeżo z pieca
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 border border-[#E8621A]/30 text-xs uppercase tracking-widest text-[#F5EFE6] font-semibold rounded-full select-none">
                  📦 Na wynos
                </span>
              </div>
            </motion.div>

            {/* Right Column: Artisan Photo with Corner Bracket decorations */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 flex justify-center py-6"
            >
              <div className="relative bracket-container bg-[#1E1B18] p-2 max-w-sm sm:max-w-md">
                <img 
                  src="https://i.ibb.co/gMVfgMgG/685535508-122094807201306296-6486521211296837185-n.jpg" 
                  alt="Craft zapiekanki prepping" 
                  className="w-full h-auto object-cover grayscale-[15%] rounded-[1px] shadow-2xl block"
                  loading="lazy"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* 5. MENU SECTION */}
      <section id="menu" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D] chalkboard-noise relative border-t border-b border-[#E8621A]/10">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Headers */}
          <div className="text-center space-y-4 mb-12">
            <span className="text-xs text-spacing-wide text-[#E8621A] font-semibold block">
              NASZE SPECJALNOŚCI
            </span>
            <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl text-white tracking-widest">
              MAPA SMAKÓW
            </h2>
            <p className="font-dancing text-[#E8621A] text-2xl sm:text-3xl max-w-md mx-auto">
              Na życzenie każdą zapiekankę zamienimy bezpłatnie
            </p>
            <p className="text-xs sm:text-sm font-sans text-[#A89880] italic">
              * ceny podane za wersje: <span className="text-[#E8621A] font-semibold">XXL (ok. 50cm)</span> / <span className="text-white font-semibold">XL (ok. 30cm)</span>
            </p>
          </div>

          {/* Optional Interactive Enhancement - Filter Toggle & Live Search */}
          <div className="max-w-2xl mx-auto mb-16 space-y-4">
            {/* Custom search filter bar */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#A89880]">
                <Search className="w-5 h-5" />
              </span>
              <input 
                type="text" 
                placeholder="Filtruj menu np. kabanos, cebula, ostry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#161616] border border-[#E8621A]/30 focus:border-[#E8621A] focus:ring-1 focus:ring-[#E8621A] rounded-[2px] text-sm text-[#F5EFE6] placeholder-[#A89880]/60 outline-none transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#E8621A] hover:text-[#FF7A2F]"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Segment control tabs */}
            <div className="flex bg-[#161616] p-1.5 rounded-[2px] border border-[#2A2520] select-none">
              <button 
                onClick={() => setActiveCategory("all")}
                className={`flex-1 py-2 text-xs font-semibold uppercase tracking-widest rounded-[1px] transition-all flex items-center justify-center gap-2 ${
                  activeCategory === "all" ? "bg-[#E8621A] text-black" : "text-[#A89880] hover:text-white"
                }`}
              >
                🔥 Wszystkie ({polishMenu.length + worldMenu.length})
              </button>
              <button 
                onClick={() => setActiveCategory("polish")}
                className={`flex-1 py-2 text-xs font-semibold uppercase tracking-widest rounded-[1px] transition-all flex items-center justify-center gap-2 ${
                  activeCategory === "polish" ? "bg-[#E8621A] text-black" : "text-[#A89880] hover:text-white"
                }`}
              >
                🇵🇱 Polskie ({polishMenu.length})
              </button>
              <button 
                onClick={() => setActiveCategory("world")}
                className={`flex-1 py-2 text-xs font-semibold uppercase tracking-widest rounded-[1px] transition-all flex items-center justify-center gap-2 ${
                  activeCategory === "world" ? "bg-[#E8621A] text-black" : "text-[#A89880] hover:text-white"
                }`}
              >
                🌍 Świat ({worldMenu.length})
              </button>
            </div>
          </div>

          {/* GRID OF CATEGORY 1: POLISH MENU */}
          {(activeCategory === "all" || activeCategory === "polish") && (
            <div className="space-y-8 mb-16">
              
              {/* Category Header */}
              <div className="flex items-center bg-[#1E1B18] px-4 py-4 border-l-[5px] border-[#E8621A] card-noise shadow-md">
                <span className="text-2xl mr-3 font-sans" role="img" aria-label="Polish Flag">🇵🇱</span>
                <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wider">
                  Różnorodność smaków Polski
                </h3>
              </div>

              {filteredPolish.length === 0 ? (
                <p className="text-center text-[#A89880] py-6 italic text-sm">Nie znaleziono pozycji w tej kategorii dla "{searchQuery}"</p>
              ) : (
                /* Cards CSS Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPolish.map((item, idx) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.4, delay: Math.min((idx % 3) * 0.1, 0.3) }}
                      className="card-noise bg-[#1E1B18] p-6 border-l-0 hover:border-l-4 hover:border-[#E8621A] card-bracket relative flex flex-col justify-between h-56 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl group"
                    >
                      <div className="space-y-2">
                        {/* Name bold */}
                        <h4 className="font-sans font-semibold text-white group-hover:text-[#E8621A] text-lg transition-colors pr-8">
                          {item.name}
                        </h4>
                        {/* Description / ingredients */}
                        <p className="font-sans font-light text-xs text-[#A89880] italic leading-relaxed pr-2">
                          {item.ingredients}
                        </p>
                      </div>

                      {/* Price Badge bottom-right */}
                      <div className="self-end mt-4">
                        <span className="inline-block bg-[#E8621A] hover:bg-[#FF7A2F] text-black font-bebas text-sm font-semibold tracking-wider px-4 py-1.5 rounded-full select-none shadow-md transition-colors">
                          {item.priceXXL} / {item.priceXL} zł
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* GRID OF CATEGORY 2: WORLD MENU */}
          {(activeCategory === "all" || activeCategory === "world") && (
            <div className="space-y-8 mb-16">
              
              {/* Category Header */}
              <div className="flex items-center bg-[#221A14] px-4 py-4 border-l-[5px] border-[#E8621A] card-noise shadow-md">
                <span className="text-2xl mr-3 font-sans" role="img" aria-label="Globe">🌍</span>
                <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wider">
                  Róża Smaków Świata
                </h3>
              </div>

              {filteredWorld.length === 0 ? (
                <p className="text-center text-[#A89880] py-6 italic text-sm">Nie znaleziono pozycji w tej kategorii dla "{searchQuery}"</p>
              ) : (
                /* Cards CSS Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredWorld.map((item, idx) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.4, delay: Math.min((idx % 3) * 0.1, 0.3) }}
                      className="card-noise bg-[#1E1B18] p-6 border-l-0 hover:border-l-4 hover:border-[#E8621A] card-bracket relative flex flex-col justify-between h-56 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl group"
                    >
                      <div className="space-y-2">
                        {/* Name with country flag */}
                        <h4 className="font-sans font-semibold text-white group-hover:text-[#E8621A] text-lg transition-colors pr-8 flex items-center gap-2">
                          <span>{item.flag}</span>
                          <span>{item.name}</span>
                        </h4>
                        {/* Description / ingredients */}
                        <p className="font-sans font-light text-xs text-[#A89880] italic leading-relaxed pr-2">
                          {item.ingredients}
                        </p>
                      </div>

                      {/* Price Badge bottom-right */}
                      <div className="self-end mt-4">
                        <span className="inline-block bg-[#E8621A] hover:bg-[#FF7A2F] text-black font-bebas text-sm font-semibold tracking-wider px-4 py-1.5 rounded-full select-none shadow-md transition-colors">
                          {item.priceXXL} / {item.priceXL} zł
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 5B. SOSY SECTION */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mt-16 bg-[#1E1B18] card-noise rounded-[2px] p-8 border border-[#E8621A]/20"
          >
            <div className="text-center space-y-4">
              <span className="font-bebas text-2xl sm:text-3xl text-[#E8621A] tracking-widest block">
                DO WYBORU SOSY
              </span>
              <p className="text-xs text-[#A89880] max-w-xl mx-auto italic mb-6">
                Wykończ swą potrawę idealnym akcentem. Wszystkie sosy rzemieślnicze przygotowywane na bazie naturalnych składników:
              </p>
              
              {/* Pills chips rendering */}
              <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
                {sauces.map((sauce, idx) => (
                  <span 
                    key={idx}
                    className="px-3.5 py-1.5 bg-[#2A2520] hover:bg-[#E8621A] hover:text-black border border-[#E8621A]/25 rounded-full text-xs font-sans text-white uppercase tracking-wider select-none transition-colors duration-200"
                  >
                    {sauce}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </section>


      {/* INTERACTIVE COMPONENT: "ZAPIEKANKA & MILION?" LOTTO WHEEL MATCH GAME */}
      <section id="wheel" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#161616] relative overflow-hidden text-center border-b border-[#E8621A]/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#E8621A]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-3xl mx-auto relative z-10 space-y-8">
          
          <div className="space-y-2">
            <span className="text-xs text-spacing-wide text-[#E8621A] font-semibold block">ZABAWA I SMUTKI NA BOK</span>
            <h2 className="font-bebas text-4xl sm:text-5xl text-white tracking-widest leading-none">
              ZAPIEKANKA I MILION? 🎲
            </h2>
            <p className="font-sans text-sm text-[#A89880] max-w-lg mx-auto leading-relaxed">
              Nie potrafisz zdecydować, na którą zapiekankę masz dziś ochotę? Wylosuj swoją potrawę na dziś z naszym generatorem szczęśliwych liczb! Przy okazji sprawdź ofertę gier Lotto i zdrapuj u nas na miejscu.
            </p>
          </div>

          <div className="bg-[#1E1B18]/60 p-6 sm:p-8 rounded-[3px] border border-[#2A2520] card-noise space-y-6">
            
            {/* Display lotto-like random simulation balls */}
            <div className="flex flex-wrap gap-3 justify-center">
              {rollNumbers.length > 0 ? (
                rollNumbers.map((num, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: idx * 0.05 }}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-bebas text-lg tracking-normal shadow-lg ${
                      idx === 5 
                        ? "bg-[#E8621A] text-black border-2 border-white animate-pulse" 
                        : "bg-black text-[#F5EFE6] border border-[#E8621A]/40"
                    }`}
                  >
                    {num}
                  </motion.div>
                ))
              ) : (
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, "?"].map((placeholder, idx) => (
                    <div key={idx} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/50 border border-[#231A14] flex items-center justify-center font-bebas text-lg text-[#A89880]/30 select-none">
                      {placeholder}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Generated luck display outcome results */}
            <AnimatePresence mode="wait">
              {rolledZapiekanka ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-[#0D0D0D]/90 p-5 border-l-4 border-[#E8621A] rounded-[2px] transition-all max-w-xl mx-auto space-y-2 text-left"
                >
                  <span className="text-[10px] text-spacing-wide text-[#E8621A] font-semibold block">TWÓJ DZISIEJSZY SZCZĘŚLIWY WYBÓR:</span>
                  <h4 className="font-bebas text-2xl text-white tracking-wide flex items-center gap-2">
                    {rolledZapiekanka.flag && <span className="text-xl">{rolledZapiekanka.flag}</span>}
                    <span>{rolledZapiekanka.name}</span>
                  </h4>
                  <p className="font-sans text-xs text-[#A89880] italic leading-relaxed">
                    {rolledZapiekanka.ingredients}
                  </p>
                  <p className="text-[#E8621A] font-bebas text-base tracking-wider pt-2">
                    Wersja XXL: {rolledZapiekanka.priceXXL} zł / XL: {rolledZapiekanka.priceXL} zł
                  </p>
                </motion.div>
              ) : isRolling ? (
                <div className="text-[#E8621A] text-xs font-semibold uppercase tracking-widest animate-pulse h-20 flex items-center justify-center">
                  Bębny maszyny losującej są puste... Kręcimy! 🎰
                </div>
              ) : (
                <div className="text-[#A89880] text-xs italic h-20 flex items-center justify-center">
                  Naciśnij przycisk poniżej, aby wytypować swoje szczęśliwe liczby i zapiekę!
                </div>
              )}
            </AnimatePresence>

            <button
              onClick={rollZapiekankaWheel}
              disabled={isRolling}
              className={`px-8 py-3.5 bg-transparent border-2 border-[#E8621A] hover:bg-[#E8621A] hover:text-black font-bebas text-base tracking-wider rounded-[2px] transition-all duration-300 w-full sm:w-auto ${
                isRolling ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isRolling ? "LOSOWANIE..." : "LOSUJ SZCZĘŚLIWĄ ZAPIEKANKĘ"}
            </button>
          </div>

        </div>
      </section>


      {/* 6. NA WYNOS CALLOUT SECTION */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#E8621A] to-[#C44E0F] relative shadow-inner text-black select-none text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl tracking-wider uppercase mb-2 text-black leading-none">
            ZAPIEKANKI NA WYNOS
          </h2>
          <p className="font-sans font-medium text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-black/90">
            Nie masz czasu usiąść? Wpadaj, bierz zapiekę i lecisz dalej. Bo dobra zapiekanka smakuje wszędzie!
          </p>
          <p className="font-sans font-light italic text-sm text-black/80">
            Zapiekanka, piwo i... no wiesz, może milion? Sprawdź ofertę gier liczbowych u nas na miejscu!
          </p>
        </div>
      </section>


      {/* 7. GALERIA (Gallery) SECTION */}
      <section id="galeria" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#161616] transition-all">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs text-spacing-wide text-[#E8621A] font-semibold block">
              ZERKNIJ DO ŚRODKA
            </span>
            <h2 className="font-bebas text-5xl sm:text-6xl text-white tracking-widest">
              GALERIA
            </h2>
            <div className="w-[80px] h-[2px] bg-[#E8621A] mx-auto"></div>
          </div>

          {/* Masonry-like dynamic Columns Layout */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance] box-border">
            {galleryImages.map((src, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="break-inside-avoid mb-4 overflow-hidden rounded-[2px] cursor-pointer group relative bg-black border border-[#E8621A]/10 shadow-lg"
                onClick={() => setLightboxIndex(index)}
              >
                <img 
                  src={src} 
                  alt={`Zapiekanki craft Krosno ${index + 1}`} 
                  className="w-full h-auto object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500 hover:shadow-[0_0_20px_rgba(232,98,26,0.4)]"
                  loading="lazy"
                />
                
                {/* Visual hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-4 py-2 bg-black/80 border border-[#E8621A] text-xs font-bebas text-[#E8621A] uppercase tracking-widest rounded-full flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5" /> Powiększ zdjęcie
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* LIGHTBOX FOR GALLERY */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md cursor-zoom-out"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Gallery top status */}
            <div className="absolute top-4 left-4 font-mono text-xs text-[#A89880] select-none">
              Zdjęcie {lightboxIndex + 1} / {galleryImages.length}
            </div>

            {/* Close button top right */}
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
              className="absolute top-4 right-4 text-white hover:text-[#E8621A] transition-colors p-3 focus:outline-none"
              aria-label="Zamknij"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Left selector */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryImages.length - 1));
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 border border-[#E8621A]/30 text-white hover:text-[#E8621A] rounded-full hover:bg-black/90 transition-all focus:outline-none z-10"
              aria-label="Poprzednie"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image display */}
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-full max-h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={galleryImages[lightboxIndex]} 
                alt="Zoomed zapiekanki" 
                className="max-w-full max-h-[85vh] object-contain rounded-[1px] border-2 border-[#E8621A]/40"
              />
            </motion.div>

            {/* Right selector */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev !== null && prev < galleryImages.length - 1 ? prev + 1 : 0));
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 border border-[#E8621A]/30 text-white hover:text-[#E8621A] rounded-full hover:bg-black/90 transition-all focus:outline-none z-10"
              aria-label="Następne"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image helper info footer */}
            <div className="absolute bottom-6 text-center select-none max-w-sm px-4">
              <span className="text-xs font-sans text-[#A89880] italic">
                Kliknij dowolne miejsce poza zdjęciem lub wciśnij <kbd className="bg-white/10 px-1 py-0.5 rounded text-[10px] text-white font-mono uppercase">ESC</kbd> aby zamknąć
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      
      {/* 8. OPINIE (Reviews) SECTION */}
      <section id="opinie" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D] relative border-t border-b border-[#E8621A]/10">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          
          <div className="space-y-4">
            <span className="text-xs text-spacing-wide text-[#E8621A] font-semibold block">
              CO MÓWIĄ GOŚCIE
            </span>
            <h2 className="font-bebas text-5xl sm:text-6xl text-white tracking-widest">
              OPINIE
            </h2>
            <div className="w-[80px] h-[2px] bg-[#E8621A] mx-auto"></div>
          </div>

          {/* Centered Single Review card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="bg-[#1E1B18] card-noise border-l-5 border-[#E8621A] rounded-[3px] p-8 sm:p-12 shadow-2xl relative text-left"
          >
            {/* Massive Open Quote */}
            <span className="absolute top-4 right-8 font-bebas text-8xl text-[#E8621A]/10 leading-none select-none pointer-events-none">
              ”
            </span>
            
            <div className="space-y-6">
              <span className="font-bebas text-6rem text-[#E8621A] block leading-none select-none h-12">
                “
              </span>
              
              <blockquote className="font-sans font-light text-lg sm:text-xl text-[#F5EFE6] italic leading-relaxed pl-1 pl-sm-4">
                Najlepsze zapiekanki w całym regionie ❤️ Przemiła Pani, która dba o każdy szczegół ❤️ zawsze świeżo i pysznie! Nic dodać nic ująć! Miejsce, które warto odwiedzić!
              </blockquote>

              <div className="flex items-center gap-3 pt-4 border-t border-[#2A2520]">
                <div className="w-8 h-8 rounded-full bg-[#E8621A] flex items-center justify-center font-bebas text-black text-sm font-semibold select-none">
                  ZG
                </div>
                <div>
                  <cite className="font-sans font-semibold text-white text-base not-italic block">
                    — Zadowolona Gościni
                  </cite>
                  <span className="text-xs text-[#A89880]">Google & Facebook Reviewer</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social review reference button */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-4"
          >
            <a 
              href="https://www.facebook.com/profile.php?id=61589188883049&sk=reviews" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-[#E8621A] text-[#E8621A] hover:bg-[#E8621A] hover:text-black font-bebas text-base tracking-widest rounded-[2px] transition-colors duration-300"
            >
              <span>ZOBACZ WIĘCEJ OPINII</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>

        </div>
      </section>


      {/* 9. KONTAKT (Contact) SECTION */}
      <section id="kontakt" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#161616] relative transition-all">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center md:text-left space-y-4 mb-16">
            <span className="text-xs text-spacing-wide text-[#E8621A] font-semibold block">
              GDZIE NAS ZNAJDZIESZ
            </span>
            <h2 className="font-bebas text-5xl sm:text-6xl text-white tracking-widest">
              KONTAKT
            </h2>
            <div className="w-[80px] h-[2px] bg-[#E8621A] md:mx-0 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Contact info details & Map */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="bg-[#1E1B18] card-noise p-6 sm:p-8 rounded-[3px] border border-[#2A2520] space-y-6">
                
                <h3 className="font-bebas text-2xl text-white tracking-widest border-b border-[#2A2520] pb-3">
                  MANUFAKTURA ZAPIEKANKI ..i do pieca
                </h3>

                <ul className="space-y-4 text-sm sm:text-base font-sans">
                  <li className="flex items-start gap-3">
                    <span className="text-[#E8621A] text-lg select-none mt-0.5">✦</span>
                    <span className="flex items-center gap-2 text-[#A89880]">
                      <MapPin className="w-5 h-5 text-[#E8621A] flex-shrink-0" />
                      <span className="text-[#F5EFE6]">ul. Grodzka 8, 38-400 Krosno, Polska</span>
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-[#E8621A] text-lg select-none mt-0.5">✦</span>
                    <span className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-[#E8621A] flex-shrink-0" />
                      <a href="tel:504355195" className="text-[#E8621A] hover:text-[#FF7A2F] font-semibold transition-colors">
                        504 355 195
                      </a>
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-[#E8621A] text-lg select-none mt-0.5">✦</span>
                    <span className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-[#E8621A] flex-shrink-0" />
                      <a href="mailto:magda_cichon@op.pl" className="text-[#E8621A] hover:text-[#FF7A2F] transition-colors">
                        magda_cichon@op.pl
                      </a>
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-[#E8621A] text-lg select-none mt-0.5">✦</span>
                    <span className="flex items-center gap-2 text-[#A89880]">
                      <Clock className="w-5 h-5 text-[#E8621A] flex-shrink-0" />
                      <div>
                        <div className="text-[#F5EFE6]">Pn - Sob: <span className="text-[#E8621A] font-semibold">12:00 - 21:00</span></div>
                        <div className="text-xs">Niedziela: nieczynne / rzemieślnicza przerwa</div>
                      </div>
                    </span>
                  </li>
                </ul>

                {/* Facebook CTA buttons */}
                <div className="pt-4">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61589188883049" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3.5 bg-[#E8621A] hover:bg-[#FF7A2F] text-black font-bebas text-base tracking-widest rounded-[2px] transition-colors duration-300 hover:shadow-lg focus:outline-none"
                  >
                    <i className="fa-brands fa-facebook text-lg"></i>
                    <span>OBSERWUJ NAS NA FACEBOOKU</span>
                  </a>
                </div>

              </div>

              {/* Working Google Maps Embed */}
              <div className="w-full relative rounded-[4px] overflow-hidden border-2 border-[#E8621A]/50 shadow-2xl">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2581.0642734666812!2d21.764165676997926!3d49.69076244177071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473c48b3463e3f2f%3A0x2d1ef2ff151c29c8!2sGrodzka%208%2C%2038-400%20Krosno!5e0!3m2!1spl!2spl!4v1780993349597!5m2!1spl!2spl" 
                  width="100%" 
                  height="340" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location - Manufaktura Zapiekanki"
                ></iframe>
              </div>

            </motion.div>

            {/* Right Column: High Quality Restaurant Portrait with Bracket Corners */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 flex justify-center py-6"
            >
              <div className="relative bracket-container bg-[#1E1B18] p-2 max-w-sm sm:max-w-md">
                <img 
                  src="https://i.ibb.co/BVxJG0Mj/698228556-122104506981306296-3797738921322934845-n.jpg" 
                  alt="Beautiful zapiekanka bar storefront" 
                  className="w-full h-auto object-cover grayscale-[10%] rounded-[1px] shadow-2xl block"
                  loading="lazy"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* 10. FOOTER */}
      <footer className="bg-[#080808] border-t border-[#E8621A]/10 text-center py-12 px-4 space-y-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Logo center */}
          <div className="flex flex-col items-center space-y-1">
            <span className="font-bebas text-3xl sm:text-4xl text-[#E8621A] tracking-wider neon-glow">
              MANUFAKTURA ZAPIEKANKI
            </span>
            <span className="font-dancing text-sm text-[#A89880] tracking-wide">
              ..i do pieca
            </span>
          </div>

          <div className="w-[150px] h-[1px] bg-[#E8621A]/20 mx-auto"></div>

          {/* Quick Footer Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-widest font-sans font-semibold">
            <a href="https://www.facebook.com/profile.php?id=61589188883049" target="_blank" rel="noopener noreferrer" className="text-[#A89880] hover:text-[#E8621A] transition-colors flex items-center gap-1.5">
              <i className="fa-brands fa-facebook"></i> Facebook
            </a>
            <a href="#opinie" className="text-[#A89880] hover:text-[#E8621A] transition-colors">
              Opinie
            </a>
            <a href="#kontakt" className="text-[#A89880] hover:text-[#E8621A] transition-colors">
              Kontakt
            </a>
          </div>

          {/* Copyright description */}
          <div className="space-y-1 text-xs text-[#A89880]/70 font-sans tracking-wide">
            <p>
              © 2026 Manufaktura Zapiekanki · ul. Grodzka 8, Krosno · Wszelkie prawa zastrzeżone
            </p>
            <p className="opacity-50 text-[10px]">
              Krosno - Tradycyjne i Światowe Chrupiące Zapiekanki z Pieca
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
