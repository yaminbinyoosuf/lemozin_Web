import { getWhatsAppUrl, whatsappMessages, type LessonId } from '../lib/whatsapp'

type Lesson = {
  id: LessonId
  number: string
  title: string
  description: string
  whatsappUrl: string
}

const copy: Array<Omit<Lesson, 'whatsappUrl'>> = [
  {
    id: 'city',
    number: '01',
    title: 'City Driving',
    description:
      'Practise everyday driving situations, traffic awareness, intersections, and navigating busy roads.',
  },
  {
    id: 'parking',
    number: '02',
    title: 'Parking Practice',
    description:
      'Work on parking manoeuvres, vehicle positioning, and handling tighter spaces.',
  },
  {
    id: 'highway',
    number: '03',
    title: 'Highway Driving',
    description:
      'Build familiarity with highway driving situations and appropriate driving techniques.',
  },
  {
    id: 'refresher',
    number: '04',
    title: 'Refresher Lessons',
    description:
      'Get additional practice in the areas where you would like to improve.',
  },
]

export const lessons: Lesson[] = copy.map((lesson) => ({
  ...lesson,
  whatsappUrl: getWhatsAppUrl(whatsappMessages[lesson.id]),
}))
