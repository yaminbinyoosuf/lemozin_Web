export type FaqItem = {
  id: string
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    id: 'location',
    question: 'Where is Lemozin based?',
    answer:
      'Lemozin is based in Calicut, Kerala. Contact us to discuss lesson availability and arrangements.',
  },
  {
    id: 'enquire',
    question: 'How can I enquire about lessons?',
    answer:
      'You can contact Lemozin through WhatsApp or phone to discuss your requirements.',
  },
  {
    id: 'practice',
    question: 'What types of driving practice are available?',
    answer:
      'You can enquire about city driving, parking practice, highway driving, and refresher lessons.',
  },
  {
    id: 'refresher',
    question: 'Can I enquire about refresher lessons?',
    answer:
      'Yes. Contact Lemozin to discuss the areas where you would like additional practice.',
  },
  {
    id: 'cost',
    question: 'How much does a lesson cost?',
    answer: 'Please contact Lemozin for current pricing and availability.',
  },
  {
    id: 'confirm',
    question: 'How do I confirm a lesson?',
    answer:
      'Contact Lemozin directly to discuss availability and confirm the arrangements.',
  },
]
