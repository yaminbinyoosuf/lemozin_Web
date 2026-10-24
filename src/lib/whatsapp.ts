import { site } from '../data/site'

/**
 * Build a WhatsApp click-to-chat URL with a correctly encoded message.
 */
export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export const whatsappMessages = {
  general:
    'Hello Lemozin, I would like to enquire about driving lessons in Calicut. Please share the details and availability.',
  city: 'Hello Lemozin, I am interested in city driving practice. Could you share the details and availability?',
  parking:
    'Hello Lemozin, I am interested in parking practice. Could you share the details and availability?',
  highway:
    'Hello Lemozin, I am interested in highway driving practice. Could you share the details and availability?',
  refresher:
    'Hello Lemozin, I am interested in refresher driving lessons. Could you share the details and availability?',
} as const

export type LessonId = keyof typeof whatsappMessages

export const generalWhatsAppUrl = getWhatsAppUrl(whatsappMessages.general)
