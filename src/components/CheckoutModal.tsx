import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Lock, CreditCard, CheckCircle2, Copy, Clock, Download, CircleDot, AlertCircle } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: 'basic' | 'premium';
}

export default function CheckoutModal({ isOpen, onClose, selectedPlan }: CheckoutModalProps) {
  const [tab, setTab] = useState<'pix' | 'card'>('pix');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  
  // Pix Specific State
  const [pixCopied, setPixCopied] = useState(false);
  const [pixTimeLeft, setPixTimeLeft] = useState(600); // 10 minutes
  
  // Checkout Process flow state
  const [status, setStatus] = useState<'form' | 'processing' | 'success'>('form');

  // Internal local states to support R$ 17 Premium Discount Upsell
  const [currentPlan, setCurrentPlan] = useState<'basic' | 'premium' | 'premium-upsell'>('premium');
  const [showUpsell, setShowUpsell] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentPlan(selectedPlan);
      setShowUpsell(selectedPlan === 'basic');
      setStatus('form');
    }
  }, [isOpen, selectedPlan]);

  const priceText = currentPlan === 'basic' 
    ? 'R$ 10,00' 
    : currentPlan === 'premium-upsell' 
    ? 'R$ 17,00' 
    : 'R$ 27,00';

  const productName = currentPlan === 'basic' 
    ? 'Plano Básico • 500+ Atividades Educacionais' 
    : currentPlan === 'premium-upsell'
    ? 'Plano Premium (Oferta com Desconto) • 500+ Atividades + Todos os Bônus'
    : 'Plano Premium • 500+ Atividades Educacionais + Todos os Bônus';

  // Pix timer effect
  useEffect(() => {
    if (isOpen && tab === 'pix' && pixTimeLeft > 0) {
      const timer = setInterval(() => {
        setPixTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, tab, pixTimeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const copyPixCode = () => {
    const payValue = currentPlan === 'basic' ? '10.00' : currentPlan === 'premium-upsell' ? '17.00' : '27.00';
    navigator.clipboard.writeText(`00020126580014BR.GOV.BCB.PIX0136atividadeseducativasinfantis-pix-99052040000530398654049.${payValue}5802BR5925AtividadesEducativas6009SAO_PAULO620705030006304EDFF`);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2500);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail) {
      alert('Por favor, preencha seu nome e e-mail para darmos andamento à entrega.');
      return;
    }
    
    // Switch to simulated transaction processing
    setStatus('processing');
    
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border-4 border-emerald-400 overflow-hidden"
          >
            {/* Header branding secure check */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500"></div>

            {/* Close Button unless success state */}
            {status !== 'success' && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-500 w-8.5 h-8.5 rounded-full flex items-center justify-center transition cursor-pointer"
              >
                ✕
              </button>
            )}

            {/* --- STATE 1: FORM INPUT AND PAYMENT CHANNEL SELECTOR --- */}
            {status === 'form' && (
              showUpsell ? (
                <div className="text-center space-y-3.5 py-1">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-amber-100 text-amber-500 rounded-full text-lg select-none animate-bounce">
                    🎁
                  </div>
                  
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-rose-600 tracking-tight leading-tight uppercase">
                      🚨 ESPERE! NÃO PERCA ESTA DIRETO DO PRODUTOR!
                    </h3>
                    <p className="text-gray-600 text-[11px] sm:text-xs mt-0.5 font-semibold font-sans">
                      Você escolheu o Plano Básico por <strong className="text-gray-900">R$ 10,00</strong>.
                    </p>
                  </div>

                  <div className="bg-emerald-50/70 border-2 border-dashed border-emerald-400 p-3 rounded-xl text-left space-y-2">
                    <p className="text-[10px] text-emerald-800 font-black text-center uppercase tracking-wider">
                      💥 POR APENAS + R$ 7,00: LEVE O PLANO PREMIUM + TODOS OS BÔNUS:
                    </p>
                    
                    <div className="space-y-1 text-[11px] text-gray-700 font-sans">
                      <div className="flex items-start gap-1 font-bold text-gray-800">
                        <span className="text-emerald-500 font-black">✔</span>
                        <span>500+ Atividades Educacionais em alta definição</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 text-emerald-600 font-semibold pt-0.5 border-t border-emerald-100">
                        <div className="flex items-start gap-1">
                          <span className="text-emerald-500 font-black">✔</span>
                          <span className="text-[10px]">Bingo do Alfabeto</span>
                        </div>
                        <div className="flex items-start gap-1">
                          <span className="text-emerald-500 font-black">✔</span>
                          <span className="text-[10px]">Caça-Palavras Infantil</span>
                        </div>
                        <div className="flex items-start gap-1">
                          <span className="text-emerald-500 font-black">✔</span>
                          <span className="text-[10px]">Dominó de Sílabas</span>
                        </div>
                        <div className="flex items-start gap-1 text-blue-600">
                          <span className="text-emerald-500 font-black">✔</span>
                          <span className="text-[10px]">Jogo da Memória</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center pt-1.5 border-t border-dashed border-emerald-200">
                      <span className="text-[9px] text-gray-400 line-through block font-medium">Preço normal: R$ 27,00</span>
                      <span className="text-[11px] font-bold text-gray-700 block">Upgrade imediato exclusivo por apenas:</span>
                      <span className="text-2xl font-black text-emerald-600 block my-0.5">R$ 17,00</span>
                      <span className="text-[8px] text-gray-400 uppercase font-semibold block">Sem mensalidades, pagamento único!</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    <a
                      href="https://pay.wiapy.com/AgumUrd9H-8"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-2.5 px-4 rounded-xl shadow-[0_3px_0_rgb(5,150,105)] active:translate-y-0.5 active:shadow-none transition-all duration-75 text-xs sm:text-sm cursor-pointer uppercase tracking-tight flex items-center justify-center gap-1.5 soft-pulse text-center"
                    >
                      SIM! QUERO O PLANO PREMIUM COM DESCONTO (R$ 17)
                    </a>

                    <a
                      href="https://pay.wiapy.com/Pa1XKNff1v"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="text-[10px] font-bold text-gray-400 hover:text-gray-600 underline cursor-pointer block text-center mx-auto"
                    >
                      Não, obrigado. Quero apenas o Básico por R$ 10,00
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-6 h-6 text-emerald-500" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 tracking-tight">Checkout 100% Seguro</h3>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Ambiente CRIPTOGRAFADO & PROTEGIDO</p>
                    </div>
                  </div>

                  <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
                    <span>💼 Produto: {productName}</span>
                    <span className="text-sm font-black text-emerald-600 font-mono">{priceText}</span>
                  </div>

                  {/* Core User Contact Info Section */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b pb-1">Seus dados para envio</h4>
                    
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Seu Nome Completo:</label>
                      <input
                        type="text"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Ex: Ana Paula da Cruz"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 text-gray-800 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Seu E-mail Principal (Envio Imediato):</label>
                      <input
                        type="email"
                        required
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="Ex: ana.paula@gmail.com"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 text-gray-800 transition"
                      />
                      <p className="text-[10px] text-amber-600 mt-1 flex items-center gap-1 font-semibold">
                        <AlertCircle className="w-3 h-3 text-amber-500 shrink-0" /> Verifique se digitou o e-mail corretamente!
                      </p>
                    </div>
                  </div>

                  {/* Payment Channel Selector Tabs */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b pb-1">Escolha a Forma de Pagamento</h4>
                    
                    <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setTab('pix')}
                        className={`py-2 px-3.5 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          tab === 'pix'
                            ? 'bg-emerald-500 text-white shadow'
                            : 'text-gray-500 hover:bg-gray-200/60'
                        }`}
                      >
                        <CircleDot className="w-4 h-4" /> PIX (Imediato)
                      </button>
                      <button
                        type="button"
                        onClick={() => setTab('card')}
                        className={`py-2 px-3.5 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          tab === 'card'
                            ? 'bg-blue-600 text-white shadow'
                            : 'text-gray-500 hover:bg-gray-200/60'
                        }`}
                      >
                        <CreditCard className="w-4 h-4" /> Cartão de Crédito
                      </button>
                    </div>

                    {/* Channel Details Content */}
                    <div>
                      {tab === 'pix' && (
                        <div className="bg-emerald-50/70 rounded-2xl p-5 border border-emerald-100 flex flex-col items-center text-center space-y-3.5">
                          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xl shadow-sm">
                            ⚡
                          </div>
                          <div className="space-y-1 max-w-xs">
                            <h5 className="text-sm font-bold text-emerald-800 tracking-tight">PIX com Liberação Imediata</h5>
                            <p className="text-xs text-emerald-700 leading-relaxed font-semibold">
                              O QR Code e o código PIX Copia e Cola serão gerados automaticamente na próxima etapa.
                            </p>
                          </div>
                          <div className="text-[10px] text-emerald-600 font-bold bg-white px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            Aprovação automática em até 15 segundos
                          </div>
                        </div>
                      )}

                      {tab === 'card' && (
                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3">
                          <div className="flex items-center gap-1 text-xs font-bold text-gray-500 self-start mb-1">
                            <CreditCard className="w-4 " /> Informações do Cartão
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">Número do Cartão:</label>
                              <input
                                type="text"
                                maxLength={19}
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value.replace(/[^0-9 ]/g, ''))}
                                placeholder="0000 0000 0000 0000"
                                className="w-full bg-white border border-gray-200 px-3.5 py-2 text-xs rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">Validade (MM/AA):</label>
                              <input
                                type="text"
                                maxLength={5}
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                placeholder="12/31"
                                className="w-full bg-white border border-gray-200 px-3.5 py-2 text-xs rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">Código CVV:</label>
                              <input
                                type="password"
                                maxLength={4}
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, ''))}
                                placeholder="123"
                                className="w-full bg-white border border-gray-200 px-3.5 py-2 text-xs rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">Opções de Parcelamento:</label>
                            <select className="w-full bg-white border border-gray-200 px-3.5 py-2 text-xs rounded-xl text-gray-700 outline-none">
                              <option>1x de {priceText} (Sem Juros)</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Action Button wrapper */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 px-6 rounded-2xl shadow-[0_5px_0_rgb(5,150,105)] active:translate-y-1 active:shadow-none transition-all duration-75 flex items-center justify-center gap-1.5 text-base cursor-pointer uppercase tracking-tight"
                    >
                      <Lock className="w-5 h-5 shrink-0" /> EFETUAR PAGAMENTO SEGURO
                    </button>

                    <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400 font-medium mt-3.5">
                      <span className="flex items-center gap-1">🔒 Conexão SSL Habilitada</span>
                      <span className="flex items-center gap-1">⭐ 500+ Alunos Ativos</span>
                    </div>
                  </div>
                </form>
              )
            )}

            {/* --- STATE 2: LOADING TRANSACTION PROCESSOR --- */}
            {status === 'processing' && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-gray-100 border-t-emerald-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-xl">
                    🔐
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-800">Processando seu Pagamento...</h4>
                <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                  Estamos conectando com a operadora financeira para auditoria e autorização segura do seu pedido de {priceText}. Não feche esta janela.
                </p>
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-600 animate-pulse bg-emerald-50 px-3 py-1 rounded-full">
                  Status: Criptografando Canal...
                </span>
              </div>
            )}

            {/* --- STATE 3: TRANSACTION APPROVED SUCCESS SCREEN --- */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-5 flex flex-col items-center justify-center text-center space-y-4"
              >
                {tab === 'pix' ? (
                  <>
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl shadow-inner shadow-emerald-50 animate-pulse">
                      ⚡
                    </div>

                    <div>
                      <h4 className="text-xl font-black text-emerald-600 tracking-tight">PIX Gerado com Sucesso!</h4>
                      <p className="text-[11px] text-gray-500 uppercase tracking-wide font-bold mt-1">Efetue o pagamento abaixo para liberação imediata</p>
                    </div>

                    {/* QR Code and Timer inside the success screen */}
                    <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex flex-col items-center w-full max-w-sm">
                      <div className="flex items-center gap-1.5 text-emerald-800 text-[11px] font-bold mb-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Monitoramento automático com liberação em segundos
                      </div>

                      {/* Pix QR Code */}
                      <div className="w-28 h-28 bg-white border border-gray-100 rounded-xl p-2 flex flex-col justify-center items-center shadow-inner relative">
                        <div className="grid grid-cols-5 gap-1.5 w-full h-full p-1 opacity-85">
                          {Array.from({ length: 25 }).map((_, i) => (
                            <div
                              key={i}
                              className={`rounded-sm ${
                                (i * 7 + 13) % 4 === 0 || i % 6 === 0 ? 'bg-gray-900' : 'bg-transparent'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="absolute bg-[#32BCAD] text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded-full select-none shadow">
                          pix
                        </div>
                      </div>

                      {/* Countdown Timer */}
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-3 font-mono">
                        <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Expira em: <strong className="text-gray-700">{formatTime(pixTimeLeft)}</strong>
                      </div>

                      {/* Copy Pix Key */}
                      <button
                        type="button"
                        onClick={copyPixCode}
                        className="mt-3.5 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 active:scale-95 transition shadow-md"
                      >
                        <Copy className="w-4 h-4 shrink-0" />
                        {pixCopied ? 'CÓDIGO COPIADO!' : 'COPIAR CHAVE COPIA E COLA'}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center text-3xl shadow-inner shadow-emerald-50 animate-bounce">
                      🎉
                    </div>

                    <div>
                      <h4 className="text-xl font-black text-emerald-600 tracking-tight">Pagamento Aprovado!</h4>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-black mt-1">Sua compra foi autorizada com sucesso</p>
                    </div>
                  </>
                )}

                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-left space-y-2 max-w-sm w-full divide-y divide-gray-200/50">
                  <div className="pb-1.5">
                    <span className="text-[9px] text-gray-500 font-bold block uppercase tracking-wider">Cliente:</span>
                    <strong className="text-xs font-bold text-gray-800">{userName || 'Usuário de Demonstração'}</strong>
                  </div>
                  <div className="pt-1.5 pb-1.5">
                    <span className="text-[9px] text-gray-500 font-bold block uppercase tracking-wider">E-mail de envio:</span>
                    <strong className="text-xs font-semibold text-gray-700">{userEmail || 'envio.imediato@seu-email.com'}</strong>
                  </div>
                  <div className="pt-1.5 text-[11px] font-medium text-emerald-800 leading-snug">
                    {currentPlan === 'basic' ? (
                      <span>📥 Enviamos os links de acesso aos arquivos PDF das <strong>500+ Atividades Educacionais completas</strong> para seu e-mail cadastrado.</span>
                    ) : (
                      <span>📥 Enviamos os links de acesso aos arquivos PDF das <strong>500+ Atividades Educacionais</strong> mais todos os <strong>4 Super Bônus exclusivos</strong> para seu e-mail cadastrado.</span>
                    )}
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 max-w-sm text-left flex items-start gap-2.5">
                  <span className="text-lg">🎁</span>
                  <div>
                    <h5 className="text-[10px] font-black text-amber-800 uppercase tracking-widest">Amostra imediata liberada!</h5>
                    <p className="text-[10px] text-amber-700 mt-0.5 leading-snug font-medium">
                      Liberamos um lote de <strong>15 atividades gratuitas</strong> em PDF de alta qualidade para você testar e imprimir agora!
                    </p>
                  </div>
                </div>

                {/* Direct Sample PDF Download Link simulation */}
                <div className="w-full flex flex-col gap-2.5 pt-2">
                  <a
                    href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-3 px-5 rounded-xl shadow-[0_4px_0_rgb(5,150,105)] active:translate-y-1 active:shadow-none transition-all duration-75 flex items-center justify-center gap-1.5 text-xs sm:text-sm cursor-pointer uppercase tracking-tight"
                  >
                    <Download className="w-4 h-4 shrink-0" /> BAIXAR ATIVIDADES DO TESTE EM PDF
                  </a>

                  <button
                    onClick={() => {
                      setStatus('form');
                      onClose();
                    }}
                    className="text-[10px] font-bold text-gray-400 hover:text-gray-600 underline cursor-pointer"
                  >
                    Voltar para a página de vendas
                  </button>
                </div>
              </motion.div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
