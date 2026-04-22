import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LegalModalProps {
  type: 'terms' | 'privacy' | null;
  onClose: () => void;
}

const TERMS_CONTENT = `
## 1. Aceite dos Termos
Ao acessar e utilizar o site da LabAds ("Nós", "Nosso"), você concorda com estes Termos de Uso. Caso não concorde, recomendamos que não utilize nossos serviços.

## 2. Serviços Oferecidos
A LabAds atua como laboratório de tráfego pago, oferecendo serviços de gestão de mídia, modelagem de funil, otimização de campanhas e consultoria estratégica em plataformas de anúncios digitais (Google Ads, Meta Ads, LinkedIn Ads e similares).

## 3. Resultados e Projeções
Todos os dados, métricas e projeções apresentados neste site são de caráter ilustrativo e baseados em padrões de mercado. Resultados reais dependem de múltiplos fatores incluindo, mas não limitados a: qualidade do produto/serviço, oferta, maturidade do funil, sazonalidade e investimento em mídia. Não garantimos resultados específicos.

## 4. Uso do Site
O conteúdo deste site é protegido por direitos autorais. É permitida a visualização para uso pessoal e informativo. É proibida a reprodução, distribuição ou modificação do conteúdo sem autorização prévia e expressa.

## 5. Comunicações
Ao enviar suas informações através dos formulários disponíveis no site, você autoriza a LabAds a entrar em contato via WhatsApp, e-mail ou telefone para fins de atendimento comercial e prestação de serviços.

## 6. Limitação de Responsabilidade
A LabAds não se responsabiliza por decisões tomadas com base em informações apresentadas neste site. Recomendamos que todas as decisões de investimento em mídia sejam discutidas diretamente com nossa equipe de consultoria.

## 7. Alterações nos Termos
Reservamo-nos o direito de atualizar estes Termos de Uso a qualquer momento, sem aviso prévio. A versão vigente será sempre a publicada nesta página.

## 8. Foro
Fica eleito o foro da Comarca de Curitiba/PR para dirimir quaisquer questões oriundas destes termos.

*Última atualização: Abril de 2026*
`;

const PRIVACY_CONTENT = `
## 1. Dados Coletados
Coletamos apenas os dados que você fornece voluntariamente através dos formulários de contato do site:
- Nome completo
- Endereço de e-mail
- Número de WhatsApp
- Nome da empresa
- Faixa de investimento mensal em mídia

## 2. Finalidade do Tratamento
Os dados coletados são utilizados exclusivamente para:
- Retorno de contato comercial via WhatsApp
- Envio de propostas e diagnósticos solicitados
- Comunicação sobre serviços da LabAds

## 3. Base Legal (LGPD)
O tratamento dos seus dados pessoais é realizado com base no seu consentimento (Art. 7°, I da LGPD), fornecido ao submeter o formulário de contato, e na execução de contrato ou de procedimentos preliminares (Art. 7°, V da LGPD).

## 4. Compartilhamento
Não compartilhamos, vendemos ou transferimos seus dados pessoais para terceiros, exceto quando necessário para a prestação dos serviços contratados ou quando exigido por lei.

## 5. Armazenamento e Segurança
Os dados são transmitidos diretamente via WhatsApp (Meta Platforms, Inc.) e não são armazenados em servidores próprios além do necessário para o atendimento. Adotamos medidas de segurança compatíveis com a natureza dos dados tratados.

## 6. Seus Direitos
Conforme a Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018), você tem direito a:
- Confirmar a existência de tratamento de dados
- Acessar seus dados pessoais
- Corrigir dados incompletos ou desatualizados
- Solicitar a eliminação dos dados
- Revogar seu consentimento

Para exercer esses direitos, entre em contato pelo e-mail: **lab@labads.com.br**

## 7. Cookies
Este site pode utilizar cookies de análise (ex: Google Analytics) para entender o comportamento dos visitantes. Você pode desabilitá-los nas configurações do seu navegador.

## 8. Alterações nesta Política
Esta Política de Privacidade pode ser atualizada periodicamente. A versão vigente será sempre a publicada nesta página.

## 9. Contato do Encarregado (DPO)
Para questões relacionadas à proteção de dados, entre em contato: **lab@labads.com.br**

*Última atualização: Abril de 2026*
`;

export const LegalModal = ({ type, onClose }: LegalModalProps) => {
  const title = type === 'terms' ? 'Termos de Uso' : 'Política de Privacidade';
  const content = type === 'terms' ? TERMS_CONTENT : PRIVACY_CONTENT;

  return (
    <AnimatePresence>
      {type && (
        <motion.div
          className="fixed inset-0 z-[9500] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

          <motion.div
            className="relative w-full max-w-2xl max-h-[85vh] bg-background border border-white/[0.08] rounded-sm overflow-hidden shadow-2xl flex flex-col"
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-10 h-px bg-neonCyan/50" />
            <div className="absolute top-0 left-0 w-px h-10 bg-neonCyan/50" />

            {/* Top bar */}
            <div className="h-10 border-b border-white/[0.08] flex items-center justify-between px-4 bg-surface/60 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
                  Lab.Ads — {title}
                </span>
              </div>
              <button onClick={onClose} className="w-7 h-7 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 rounded-sm transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 p-6 md:p-8 legal-content">
              <h2 className="font-display font-bold text-2xl text-white mb-8">{title}</h2>
              <div className="prose-legal">
                {content.trim().split('\n\n').map((block, i) => {
                  if (block.startsWith('## ')) {
                    return <h3 key={i} className="font-display font-semibold text-base text-white mt-8 mb-3">{block.replace('## ', '')}</h3>;
                  }
                  if (block.startsWith('- ')) {
                    return (
                      <ul key={i} className="space-y-1.5 ml-4 mb-4">
                        {block.split('\n').map((li, j) => (
                          <li key={j} className="text-textMuted text-sm leading-relaxed list-disc">{li.replace('- ', '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (block.startsWith('*')) {
                    return <p key={i} className="text-textMuted/50 text-xs mt-8 font-mono italic">{block.replace(/\*/g, '')}</p>;
                  }
                  return <p key={i} className="text-textMuted text-sm leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />;
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
