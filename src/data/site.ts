/**
 * Single source of truth for verified business details.
 * Anything not confirmed by the business owner should stay out of this file.
 */
export const site = {
  name: 'Lemozin',
  wordmark: 'LEMOZIN',
  descriptor: 'Personal Driving Mentor',
  location: 'Calicut, Kerala',
  phoneDisplay: '+91 6235 050 176',
  phoneHref: 'tel:+916235050176',
  whatsappNumber: '916235050176',
  email: null,
  social: [],
} as const

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Lessons', href: '#lessons' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const
