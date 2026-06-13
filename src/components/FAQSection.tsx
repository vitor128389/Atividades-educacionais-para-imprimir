import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, ShieldQuestion } from 'lucide-react';
import { FAQS } from '../data';

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1'); // Keep first item open by default

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-20"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="bg-blue-100 text-blue-700 font-bold px-4 py-1.5 rounded-full text-xs sm:text-sm tracking-wide uppercase shadow-sm inline-flex items-center gap-1.5">
            <ShieldQuestion className="w-4 h-4 text-blue-500" /> DÚVIDAS FREQUENTES
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-gray-900 mt-4 tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Tem alguma dúvida sobre o material? Encontre as respostas rápidas abaixo.
          </p>
        </div>

        {/* FAQ Accordion Elements */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border-2 transition-all duration-300 ${
                  isOpen 
                    ? 'border-emerald-500 shadow-lg shadow-emerald-50/50' 
                    : 'border-emerald-500/40 hover:border-emerald-500 shadow-sm'
                }`}
              >
                {/* Trigger Row */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left py-5 px-6 sm:px-8 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-100 rounded-2xl"
                >
                  <div className="flex items-center gap-3.5">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-blue-500' : 'text-gray-400'}`} />
                    <span className="text-base sm:text-lg font-bold text-gray-800 leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-blue-500' : ''
                    }`}
                  />
                </button>

                {/* Animated Collapsible Answer Block */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-5 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>



      </div>
    </section>
  );
}
