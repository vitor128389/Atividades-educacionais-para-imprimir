import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Smile, Printer, Clock, Check, Gift, Palette, BookOpen, 
  Award, FileText, Lock, BadgePercent, ShoppingCart, CalendarDays, 
  Users, CheckCircle2, Home, School, Brain, Baby, Laugh, PenTool, 
  CaseSensitive, CheckSquare, TrendingDown, LayoutGrid, ArrowRight, 
  ShieldCheck, ShieldAlert 
} from 'lucide-react';

// Subcomponents
import FAQSection from './components/FAQSection';
import CheckoutModal from './components/CheckoutModal';

// Static Data
import { 
  WHO_IS_FOR, BENEFITS, TESTIMONIALS, INTRO_HIGHLIGHTS 
} from './data';

// Import the mockup image using standard ES modules so Vite can resolve and bundle it correctly
// @ts-expect-error - Vite handles static image imports during bundling
import heroWorksheets from './assets/images/hero_worksheets_1781354834148.jpg';

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [countdown, setCountdown] = useState(899); // 14 minutes, 59 seconds for urgency
  const [notification, setNotification] = useState<string | null>(null);
  const [checkoutPlan, setCheckoutPlan] = useState<'basic' | 'premium'>('premium');

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 899));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format countdown
  const formatCountdown = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Simulated social proof purchase alerts
  useEffect(() => {
    const customers = [
      'Renata S. (Rio de Janeiro)', 'Mariana G. (Belo Horizonte)', 
      'Karla M. (Salvador)', 'Priscila F. (Gramado)', 
      'Ana Clara D. (Franca)', 'Professor Gustavo (Campinas)', 
      'Viviane L. (Brasília)', 'Cláudio R. (Juiz de Fora)',
      'Patrícia F. (Porto Alegre)', 'Juliana T. (Fortaleza)'
    ];

    const triggers = [
      'acabou de comprar o Plano Premium por R$ 27,00 no Pix! ⚡',
      'garantiu o Plano Básico por R$ 10,00 no Cartão de Crédito! 💳',
      'acabou de garantir o Plano Premium com todos os 4 Super Bônus inclusos! 🎉',
      'adquiriu o Plano Básico de 500+ Atividades para Imprimir! ✏️',
      'acabou de aproveitar a oferta e adquiriu o Plano Premium por Pix! 🔥',
      'comprou o Plano Básico e iniciou o download imediato! 🚀'
    ];

    const pushNotification = () => {
      const randCust = customers[Math.floor(Math.random() * customers.length)];
      const randTrig = triggers[Math.floor(Math.random() * triggers.length)];
      setNotification(`${randCust} ${randTrig}`);
      
      // Hide notification after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    };

    // First trigger after 4s, recurring every 18s
    const firstTimeout = setTimeout(pushNotification, 4000);
    const intervalNotification = setInterval(pushNotification, 18000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(intervalNotification);
    };
  }, []);

  const handleOpenCheckout = (plan: 'basic' | 'premium' = 'premium') => {
    setCheckoutPlan(plan);
    setIsCheckoutOpen(true);
  };

  const scrollToPricing = () => {
    const el = document.getElementById('plano-basico-btn');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800 antialiased selection:bg-yellow-200 selection:text-gray-900">
      
      {/* 1. OFFERS TICKER URGENCY BAR (Top) - FIXED */}
      <div className="bg-red-600 text-white font-semibold fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4 text-center">
          <span className="text-xs sm:text-sm font-black tracking-wide flex items-center gap-1.5 justify-center">
            PROMOÇÃO VÁLIDA APENAS HOJE!
          </span>
          <div className="flex items-center gap-1 bg-white/20 px-3 py-0.5 rounded-full text-xs font-mono select-none">
            <Clock className="w-4.5 h-4.5" />
            <span>Restam apenas: <strong>{formatCountdown(countdown)}</strong></span>
          </div>
        </div>
      </div>

      {/* Spacer to prevent layout overlap with fixed top bar */}
      <div className="h-[68px] sm:h-[44px]" />

      {/* 2. HERO SECTION / DESKTOP SPLIT CONTAINER */}
      <section className="relative overflow-hidden bg-white pt-10 pb-20 md:py-24">
        
        {/* Dynamic kids circles vectors in negative space */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-300 rounded-full mix-blend-multiply opacity-20 filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-pink-300 rounded-full mix-blend-multiply opacity-20 filter blur-2xl animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              


              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.1] font-display">
                500+ Atividades <span className="text-blue-600">Educacionais Infantis</span> para Imprimir
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
                Material completo para alfabetização e developmento infantil, com atividades prontas para imprimir e aprender brincando.
              </p>

              {/* Main Call to Action Area */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <button
                  id="hero-cta-btn"
                  onClick={scrollToPricing}
                  className="btn-artistic-emerald text-center sm:text-lg tracking-wide flex items-center justify-center gap-2 touch-manipulation soft-pulse cursor-pointer"
                >
                  <ShoppingCart className="w-5.5 h-5.5" />
                  QUERO ACESSAR AGORA
                </button>
              </div>

            </div>

            {/* Right Graphic/Mockup Column (Responsive Tablet & Sheets) */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
              
              {/* Back glowing halo styling */}
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-300 via-blue-200 to-rose-200 rounded-full filter blur-2xl opacity-40 scale-95 slow-rotate -z-10"></div>

              <div className="relative max-w-[480px] w-full p-4 sm:p-5 bg-white rounded-3xl border-4 border-emerald-500 shadow-[8px_8px_0px_rgba(16,185,129,1)] transform hover:rotate-1 duration-300 group">
                
                <img
                  src={heroWorksheets}
                  alt="500+ Atividades Educacionais Para Imprimir"
                  referrerPolicy="no-referrer"
                  className="rounded-2xl w-full h-auto object-cover max-h-[440px] shadow"
                />

                {/* Overlaid tags for child attraction criteria */}
                <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-black py-2 px-3 rounded-full shadow-lg transform rotate-6 tracking-wide flex items-center gap-1 uppercase">
                  <Award className="w-4 h-4" /> Campeão de Vendas
                </div>

                <div className="absolute -bottom-3 -left-3 bg-blue-600 text-white text-xs font-bold py-2 px-3.5 rounded-full shadow-lg transform -rotate-3 leading-tight">
                  ⭐ 500+ Atividades Prontas
                </div>

                <div className="absolute bottom-1/2 -right-4 bg-yellow-400 text-gray-900 text-[11px] font-black p-2.5 rounded-2xl shadow-md rotate-12 flex flex-col items-center">
                  <span>VITALÍCIO</span>
                  <span className="text-[10px] opacity-80">A PARTIR DE R$ 10</span>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. "O QUE ESTÁ INCLUSO" SECTION (Detailed grids) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="bg-blue-100 text-blue-800 font-bold px-4 py-1.5 rounded-full text-xs sm:text-sm tracking-wide uppercase shadow-sm">
              📚 CONTEÚDO COMPLETO
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-gray-900 mt-4 tracking-tight">
              O que você vai receber no seu e-mail?
            </h2>
            <p className="text-gray-600 mt-4 text-base sm:text-lg">
              São mais de <strong>500 atividades educativas exclusivas</strong> prontas para a criança treinar, colorir, exercitar e se divertir com foco total.
            </p>
          </div>

          {/* Curriculum Checklist Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { title: 'Alfabetização Completa', desc: 'Introdução fonológica com associação didática de imagens e rimas.', icon: '✏️' },
              { title: 'Estudo das Vogais', desc: 'Fixação das vogais A, E, I, O, U maiúsculas e minúsculas.', icon: '🅰️' },
              { title: 'Caligrafia Guiada', desc: 'Fontes educativas apropriadas para o treino da primeira escrita.', icon: '✍️' },
              { title: 'Matemática e Números', desc: 'Contando pequenos dinossauros, bichinhos e frutas coloridas.', icon: '🧮' },
              { title: 'Atividades Bíblicas', desc: 'Aprenda e brinque com histórias da Bíblia, versículos e ensinamentos lúdicos de forma leve.', icon: '📖' },
              { title: 'Atividades para Autistas', desc: 'Material adaptado e focado na facilitação da comunicação, rotinas e aprendizado cognitivo.', icon: '🧩' },
              { title: 'Atividades para Páscoa', desc: 'Exercícios temáticos divertidos e desenhos comemorativos prontos para as datas festivas.', icon: '🐰' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border-2 border-dashed border-emerald-500 bg-white transition-all duration-305 hover:border-solid hover:shadow-md hover:scale-[1.01] flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl select-none animate-bounce" role="img">{item.icon}</span>
                    <h3 className="font-extrabold text-gray-900 text-sm sm:text-base leading-tight">{item.title}</h3>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5 leading-snug">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-3.5 pt-2.5 border-t border-gray-100 flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold">
                  <CheckSquare className="w-3.5 h-3.5 shrink-0" />
                  <span>Pronto em PDF para Impressão</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. FINAL OFFER SECTION (Pricing block) */}
      <section id="pricing" className="py-20 bg-white relative overflow-hidden border-t border-gray-100 scroll-mt-16">
        
        {/* Dynamic cute dots in canvas */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full mix-blend-multiply opacity-20"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div id="pricing-header-scroll" className="max-w-2xl mx-auto mb-10 scroll-mt-24 sm:scroll-mt-28">
            <span className="bg-emerald-100 text-emerald-800 font-bold px-4 py-1.5 rounded-full text-xs sm:text-sm tracking-wide uppercase shadow-sm inline-flex items-center gap-1">
              🎉 SUPER DESCONTO DE LANÇAMENTO
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-gray-900 mt-4 tracking-tight">
              Escolha o Plano Ideal para seu Filho
            </h2>
            <p className="text-gray-500 mt-3 text-sm sm:text-base">
              Aproveite esta promoção incrível por tempo extremamente limitado. O preço promocional é válido apenas hoje!
            </p>
          </div>

          {/* Dual Pricing Cards */}
          <div id="pricing-cards" className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            
            {/* PLANO BÁSICO */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-emerald-500 shadow-[8px_8px_0px_rgba(16,185,129,1)] relative flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <span className="bg-gray-150 text-gray-800 font-extrabold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">Acesso Essencial</span>
                  <h3 className="text-2xl font-black text-gray-950 mt-2 font-display">Plano Básico</h3>
                  <p className="text-xs text-gray-500">Apenas o material principal em PDF.</p>
                </div>

                <div className="border-t border-dashed border-gray-150 pt-4 space-y-2.5 text-xs sm:text-sm">
                  <div className="flex items-start gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0 stroke-[3.5]" />
                    <span className="font-semibold">500+ Atividades Educacionais</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0 stroke-[3.5]" />
                    <span className="font-semibold">Acesso imediato no seu e-mail após a compra</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0 stroke-[3.5]" />
                    <span className="font-semibold">Formato PDF pronto para imprimir</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-dashed border-gray-150">
                <div className="text-center py-2">
                  <span className="text-gray-400 text-xs line-through font-bold block">De: R$ 49,90</span>
                  <span className="text-gray-450 text-[10px] font-bold block mt-0.5">Por apenas:</span>
                  <span className="text-4xl font-black text-emerald-600 tracking-tight my-1 block">R$ 10,00</span>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold">Sem mensalidades, pagamento único</span>
                </div>

                <button
                  id="plano-basico-btn"
                  onClick={() => handleOpenCheckout('basic')}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-3 px-6 rounded-2xl shadow-[0_4px_0_rgb(5,150,105)] active:translate-y-0.5 active:shadow-none transition-all duration-75 text-sm sm:text-base cursor-pointer uppercase tracking-tight flex items-center justify-center gap-2 mt-4"
                >
                  <ShoppingCart className="w-4 h-4 shrink-0" />
                  ADQUIRIR PLANO BÁSICO
                </button>
              </div>
            </div>

            {/* PLANO PREMIUM */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-emerald-500 shadow-[8px_8px_0px_rgba(16,185,129,1)] relative flex flex-col justify-between">
              {/* Highlight Badge */}
              <div className="absolute -top-4 right-6 bg-red-500 text-white font-extrabold py-1 px-3.5 rounded-full text-[10px] shadow-md tracking-wider uppercase">
                RECOMENDADO ⭐⭐
              </div>

              <div className="space-y-4">
                <div>
                  <span className="bg-emerald-100 text-emerald-800 font-extrabold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">Acesso Completo + Presentes</span>
                  <h3 className="text-2xl font-black text-emerald-950 mt-2 font-display">Plano Premium</h3>
                  <p className="text-xs text-gray-500">Coleção completa de estudos + todos os bônus exclusivos.</p>
                </div>

                <div className="border-t border-dashed border-gray-150 pt-4 space-y-2.5 text-xs sm:text-sm">
                  <div className="flex items-start gap-2 text-gray-800 font-bold">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0 stroke-[3.5]" />
                    <span>500+ Atividades Educacionais</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-800 font-bold">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0 stroke-[3.5]" />
                    <span>Acesso imediato no seu e-mail após a compra</span>
                  </div>
                  <div className="flex items-start gap-2 text-emerald-600 font-bold">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0 stroke-[3.5]" />
                    <span>🎁 Bônus 1: BINGO DO ALFABETO INFANTIL</span>
                  </div>
                  <div className="flex items-start gap-2 text-emerald-600 font-bold">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0 stroke-[3.5]" />
                    <span>🎁 Bônus 2: CAÇA-PALAVRAS INFANTIL</span>
                  </div>
                  <div className="flex items-start gap-2 text-emerald-600 font-bold">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0 stroke-[3.5]" />
                    <span>🎁 Bônus 3: DOMINÓ DE SÍLABAS</span>
                  </div>
                  <div className="flex items-start gap-2 text-blue-600 font-bold">
                    <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0 stroke-[3.5]" />
                    <span>🎁 Bônus 4: JOGO DA MEMÓRIA</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0 stroke-[3.5]" />
                    <span className="font-semibold">Suporte prioritário via e-mail</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-dashed border-gray-150">
                <div className="text-center py-2">
                  <span className="text-gray-400 text-xs line-through font-bold block font-sans">De: R$ 149,00</span>
                  <span className="text-gray-450 text-[10px] font-bold block mt-0.5 font-sans">Por apenas pagamento único:</span>
                  <span className="text-4xl font-black text-emerald-600 tracking-tight my-1 block">R$ 27,00</span>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block font-sans">Sem mensalidades, bônus inclusos!</span>
                </div>

                <a
                  href="https://pay.wiapy.com/bFiA7MC0-Ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-3 px-6 rounded-2xl shadow-[0_4px_0_rgb(5,150,105)] active:translate-y-0.5 active:shadow-none transition-all duration-75 text-sm sm:text-base cursor-pointer uppercase tracking-tight flex items-center justify-center gap-2 mt-4 soft-pulse text-center justify-center"
                >
                  <ShoppingCart className="w-4 h-4 shrink-0" />
                  ADQUIRIR PLANO PREMIUM
                </a>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. TESTIMONIALS MODULE */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="bg-rose-100 text-rose-700 font-bold px-4 py-1.5 rounded-full text-xs sm:text-sm tracking-wide uppercase shadow-sm">
              💬 DEPOIMENTOS DE CLIENTES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-gray-900 mt-4 tracking-tight">
              Quem usa, aprova de olhos fechados!
            </h2>
            <p className="text-gray-600 mt-4 text-base sm:text-lg">
              Veja a opinião de pais, professores e especialistas que estão transformando a rotina de estudos de crianças em todo o Brasil.
            </p>
          </div>

          {/* Testimonial grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 relative flex flex-col justify-between shadow-sm shadow-emerald-50/50"
              >
                
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 text-amber-400 text-base mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>

                  {/* Testimony Content */}
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal italic">
                    "{testimonial.text}"
                  </p>
                </div>

                {/* Profile info footer */}
                <div className="flex items-center gap-4 border-t border-gray-200/60 pt-4 mt-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow shadow-gray-200 shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                    <p className="text-[11px] text-gray-400 font-semibold">{testimonial.role}</p>
                    <p className="text-[10px] text-blue-500 font-bold">{testimonial.city}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. FAQ ACCORDION COMPONENT */}
      <FAQSection />

      {/* 9. WARRANTY SECTION */}
      <section className="py-20 bg-white text-gray-800 relative overflow-hidden border-t border-gray-100">
        
        {/* Background glow vector */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl opacity-60"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white border-4 border-emerald-500 rounded-3xl p-6 sm:p-12 shadow-xl relative flex flex-col md:flex-row items-center gap-8 md:gap-12">
            
            {/* Visual seal stamp */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 shrink-0 relative flex items-center justify-center bg-gradient-to-tr from-emerald-500 to-green-600 rounded-full shadow-2xl text-white font-black p-4 text-center text-xs border-4 border-white select-none scale-105 transform hover:rotate-12 duration-300">
              <div className="flex flex-col items-center justify-center">
                <span className="text-[10px] uppercase font-black tracking-widest leading-none">Selo de</span>
                <span className="text-3xl sm:text-4xl font-extrabold leading-none my-0.5">7</span>
                <span className="text-sm font-bold uppercase leading-none tracking-wider">DIAS</span>
                <span className="text-[9px] uppercase font-black leading-none mt-1">Garantia</span>
              </div>
            </div>

            {/* Warranty Text Copy */}
            <div className="space-y-4 text-center md:text-left">
              <span className="bg-emerald-500 text-white font-black px-3.5 py-1 rounded-full text-xs uppercase tracking-wider block self-start mx-auto md:mx-0 w-max shadow-sm">
                Risco Zero Incondicional
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 animate-pulse">
                Satisfação total ou seu dinheiro de volta!
              </h3>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                "Se por qualquer motivo você não ficar satisfeito, devolvemos 100% do seu dinheiro dentro de 7 dias."
              </p>

              <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                Basta nos enviar uma única mensagem no e-mail de suporte dentro do prazo e providenciaremos o estorno do valor pago imediatamente, sem burocracias, sem questionamentos e sem stress. Seu investimento está 100% amparado.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 12. FLOATING REAL-TIME SOCIAL PROOF TICKER */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: -50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: -50 }}
            className="fixed bottom-4 left-4 bg-gray-900 text-white rounded-2xl p-4 shadow-2xl border border-gray-800 flex items-center gap-3.5 z-40 max-w-sm"
          >
            <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center text-xl shrink-0 shadow">
              ⚡
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold leading-snug">{notification}</p>
              <span className="text-[9px] text-emerald-400 font-mono block mt-0.5 uppercase tracking-wider">● Compra Confirmada</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 13. SECURE CHECKOUT DRAWERS DIALOG MODAL */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        selectedPlan={checkoutPlan}
      />

      {/* 14. FOOTER */}
      <footer className="bg-gray-50 border-t border-gray-100 py-8 text-center text-xs text-gray-400 font-sans">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 - 500+ Atividades Educacionais Infantis para Imprimir. Todos os direitos reservados.</p>
        </div>
      </footer>

    </div>
  );
}
