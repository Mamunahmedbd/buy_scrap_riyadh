'use client';

import { useEffect } from 'react';
import { trackWhatsAppClick, trackPhoneCall } from '../_lib/gtm';

export default function GTMClickTracker() {
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // 1. Intercept all WhatsApp link clicks
      const whatsappLink = target.closest('a[href*="wa.me"], a[href*="whatsapp.com"]');
      if (whatsappLink) {
        const location = whatsappLink.getAttribute('data-gtm-whatsapp') || 'unknown';
        trackWhatsAppClick(location as any);
        return; // Event handled
      }

      // 2. Intercept all direct call link clicks
      const telLink = target.closest('a[href^="tel:"]');
      if (telLink) {
        const phoneNumber = telLink.getAttribute('href')?.replace('tel:', '') || '';
        const location = telLink.getAttribute('data-gtm-call') || 'unknown';
        trackPhoneCall(phoneNumber, location);
        return; // Event handled
      }
    };

    document.addEventListener('click', handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleDocumentClick, { capture: true });
    };
  }, []);

  return null;
}
