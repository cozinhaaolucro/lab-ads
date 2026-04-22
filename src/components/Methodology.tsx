import { FadeIn, StaggerContainer, StaggerItem } from './FadeIn';
import { Database, Activity, Network, Zap, ArrowRight } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Coleta de Dados',
    desc: 'Integração com plataformas + leitura completa do funil atual. Mapeamos cada ponto de contato e métrica relevante.',
    deliverable: 'Relatório de diagnóstico inicial',
    icon: Database,
  },
  {
    step: '02',
    title: 'Modelagem Estatística',
    desc: 'Identificação de padrões de conversão e desperdício. Análise de regressão e anomalias no custo de aquisição.',
    deliverable: 'Mapa de oportunidades com priorização',
    icon: Activity,
  },
  {
    step: '03',
    title: 'Execução de Tráfego',
    desc: 'Testes controlados com hipóteses claras. Cada campanha é um experimento com variáveis isoladas.',
    deliverable: 'Plano de testes com metas definidas',
    icon: Network,
  },
  {
    step: '04',
    title: 'Otimização Preditiva',
    desc: 'Escala baseada em dados, não em tentativa e erro. Ajustes algorítmicos contínuos via modelos preditivos.',
    deliverable: 'Dashboard com métricas em tempo real',
    icon: Zap,
  },
];

export const Methodology = () => {
  return (
    <section id="metodologia" className="px-6 py-16 md:py-24 max-w-[1440px] mx-auto relative">
      {/* Section accent line */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-neonCyan/20 via-transparent to-neonCyan/20" />

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Sticky Sidebar Left */}
        <div className="lg:w-1/3 lg:sticky lg:top-40 self-start">
          <FadeIn>
            <p className="text-neonCyan font-mono text-xs uppercase tracking-[0.25em] mb-4">
              // pipeline de processamento
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              A Metodologia de<br />
              <span className="text-gradient">Cientifização.</span>
            </h2>
            <p className="text-textMuted leading-relaxed">
              Cada campanha é tratada como um experimento científico com hipótese, grupo
              de controle, variáveis isoladas e conclusão baseada em significância estatística.
            </p>
          </FadeIn>
        </div>

        {/* Content Right */}
        <div className="lg:w-2/3">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {steps.map((item, i) => (
          <StaggerItem key={i}>
            <div className="glass-panel p-8 relative z-10 h-full group hover:bg-surface/90 transition-all duration-500 gradient-border flex flex-col overflow-hidden">
              
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-neonCyan/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Matrix/Binary subtle hover effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] transition-opacity duration-700 pointer-events-none font-mono text-[8px] text-neonCyan break-all p-4 leading-[10px] [mask-image:linear-gradient(to_bottom,black,transparent)]">
                {'10 '.repeat(200)}
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                  <span className="font-mono text-2xl font-semibold text-neonCyan/60">
                    {item.step}
                  </span>
                  <item.icon className="w-5 h-5 text-white/20 group-hover:text-neonCyan transition-colors duration-300" />
                </div>
                <h3 className="text-white font-bold text-lg mb-3 font-display">{item.title}</h3>
                <p className="text-sm text-textMuted leading-relaxed mb-6">{item.desc}</p>

                {/* Deliverable — "O que você recebe" */}
                <div className="mt-auto pt-5 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-3 h-3 text-neonCyan/60 flex-shrink-0" />
                    <span className="font-mono text-[10px] text-neonCyan/70 uppercase tracking-wider">
                      {item.deliverable}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
