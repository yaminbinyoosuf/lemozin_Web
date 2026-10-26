import { site } from '../data/site'

/**
 * Build a WhatsApp click-to-chat URL with a correctly encoded message.
 */
export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export const generalWhatsAppUrl = getWhatsAppUrl(
  'Hello Lemozin, I would like to enquire about driving lessons in Calicut. Please share the details and availability.',
)

export type BookingEnquiry = {
  name: string
  phone: string
  lessonType: string
  preferredDate: string
  preferredTime: string
  additionalInfo?: string
}

export function buildBookingMessage({
  name,
  phone,
  lessonType,
  preferredDate,
  preferredTime,
  additionalInfo,
}: BookingEnquiry): string {
  const lines = [
    'Hello Lemozin,',
    '',
    'I would like to enquire about a driving lesson.',
    '',
    `Name: ${name}`,
    `Contact number: ${phone}`,
    `Lesson type: ${lessonType}`,
    `Preferred date: ${preferredDate}`,
    `Preferred time: ${preferredTime}`,
  ]

  if (additionalInfo?.trim()) {
    lines.push(`Additional information: ${additionalInfo.trim()}`)
  }

  lines.push(
    '',
    'Could you please let me know whether this date and time are available?',
    '',
    'Thank you.',
  )

  return lines.join('\n')
}
