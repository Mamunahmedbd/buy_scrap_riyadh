// Declare standard dataLayer structure for TypeScript
declare global {
  interface Window {
    dataLayer: Array<Record<string, any>>;
  }
}

/**
 * Get GTM ID from environment variable or default fallback
 */
export const getGtmId = (): string => {
  return process.env.NEXT_PUBLIC_GTM_ID || 'GTM-T6NQP9PF';
};

/**
 * Standard utility to push raw events to Google Tag Manager dataLayer
 */
export const sendGTMEvent = (event: string, parameters?: Record<string, any>) => {
  if (typeof window === 'undefined') {
    return;
  }

  // Initialize dataLayer if it does not exist
  window.dataLayer = window.dataLayer || [];

  // Push the event to dataLayer
  window.dataLayer.push({
    event,
    timestamp: new Date().toISOString(),
    ...parameters,
  });
};

/**
 * Track user clicks on WhatsApp links/buttons
 * @param location The position/UI component where the click occurred
 */
export const trackWhatsAppClick = (location: 'floating_button' | 'top_bar' | 'footer' | 'cta_banner' | 'blog_share') => {
  sendGTMEvent('whatsapp_click', {
    click_location: location,
  });
};

/**
 * Track user successfully submitting the scrap valuation form
 * @param scrapType Selected scrap material type
 * @param neighborhood User's specified location/neighborhood
 */
export const trackContactFormSubmit = (scrapType: string, neighborhood: string) => {
  sendGTMEvent('contact_form_submit', {
    scrap_type: scrapType || 'unspecified',
    neighborhood: neighborhood || 'unspecified',
  });
};

/**
 * Track user clicks on phone numbers to initiate calls
 * @param phoneNumber The phone number dialled
 * @param location The position/UI component where the click occurred
 */
export const trackPhoneCall = (phoneNumber: string, location: string) => {
  sendGTMEvent('phone_call', {
    phone_number: phoneNumber,
    click_location: location,
  });
};

/**
 * Track user switching site language preference
 * @param newLocale Target language code (e.g. 'en', 'ar')
 */
export const trackLanguageSwitch = (newLocale: string) => {
  sendGTMEvent('language_switch', {
    new_locale: newLocale,
  });
};
