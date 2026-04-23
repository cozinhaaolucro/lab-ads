/**
 * Utilitário para enviar eventos ao Google Tag Manager (GTM) via dataLayer.
 */

type GTMEvent = {
  event: string;
  [key: string]: any;
};

export const pushToDataLayer = (eventData: GTMEvent) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);
  }
};

// Declaração global para evitar erros de TypeScript com window.dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}
