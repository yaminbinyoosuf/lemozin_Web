export type LessonId = 'city' | 'parking' | 'highway' | 'refresher'

export type Lesson = {
  id: LessonId
  title: string
  description: string
}

export const lessons: Lesson[] = [
  {
    id: 'city',
    title: 'City Driving',
    description:
      'Practise everyday roads, traffic awareness, intersections, and common urban driving situations.',
  },
  {
    id: 'parking',
    title: 'Parking Practice',
    description:
      'Work on parking manoeuvres, vehicle positioning, and handling tighter spaces.',
  },
  {
    id: 'highway',
    title: 'Highway Driving',
    description:
      'Discuss practical highway driving experience and the skills you want to develop.',
  },
  {
    id: 'refresher',
    title: 'Refresher Lessons',
    description:
      'Get additional practice in the areas where you would like to feel more comfortable.',
  },
]

export const bookingLessonOptions = [
  ...lessons.map(({ id, title }) => ({ value: id, label: title })),
  { value: 'not-sure', label: 'Not Sure Yet — Help Me Choose' },
] as const

export function isLessonId(value: string | null): value is LessonId {
  return lessons.some((lesson) => lesson.id === value)
}
