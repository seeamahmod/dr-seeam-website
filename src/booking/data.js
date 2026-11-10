export const PRICE = 150

export const SERVICES = [
  {
    id: 'initial',
    tag: 'Consultation',
    title: 'Initial Consultation',
    text: 'Comprehensive first session to understand your needs and create a personalized treatment plan.',
    minutes: 60,
  },
  {
    id: 'follow-up',
    tag: 'Therapy',
    title: 'Follow-up Session',
    text: 'Regular therapy session to continue your treatment and track progress.',
    minutes: 45,
  },
  {
    id: 'couples',
    tag: 'therapy',
    title: 'Couples Therapy',
    text: 'Joint session for couples to improve communication and relationship dynamics.',
    minutes: 90,
  },
  {
    id: 'check-in',
    tag: 'consultation',
    title: 'Quick Check-in',
    text: 'Brief session for medication management or quick progress check.',
    minutes: 20,
  },
  {
    id: 'workshop',
    tag: 'workshop',
    title: 'Group Workshop',
    text: 'Interactive group session focusing on stress management techniques.',
    minutes: 120,
  },
  {
    id: 'health',
    tag: 'Consultation',
    title: 'Health Consultation',
    text: 'Comprehensive first session to understand your needs and create a personalized treatment plan.',
    minutes: 60,
  },
]

export const MEETING_TYPES = [
  {
    id: 'online',
    title: 'Online Consultation',
    text: 'Video call from the comfort of your home',
    summary: 'Online Consultation',
    short: 'online',
    features: ['Secure video platform', 'No travel required', 'Screen sharing available', 'Session recording (optional)'],
  },
  {
    id: 'in-person',
    title: 'In-Person Visit',
    text: 'Face-to-face meeting at our office',
    summary: 'In-Person Visit',
    short: 'in-person',
    features: ['Private consultation room', 'Comfortable environment', 'Direct interaction', 'Physical assessment available'],
    location: ['456 Wellness Center, Suite 200', 'San Francisco, CA 94102'],
  },
]

/** Time slots shown exactly as labelled in the design; `value` is 24-hour time. */
export const SLOTS = {
  morning: [
    { label: '09:00', value: '09:00' },
    { label: '10:00', value: '10:00' },
    { label: '11:00', value: '11:00' },
    { label: '12:00', value: '12:00' },
    { label: '01:00', value: '13:00' },
  ],
  afternoon: [
    { label: '02:00', value: '14:00' },
    { label: '03:00', value: '15:00' },
    { label: '04:00', value: '16:00' },
    { label: '05:00', value: '17:00' },
    { label: '06:00', value: '18:00' },
  ],
}

export const STEPS = [
  { path: 'service', title: 'Service', sub: 'Choose your service' },
  { path: 'type', title: 'Type', sub: 'Online or In-person' },
  { path: 'schedule', title: 'Schedule', sub: 'Pick date & time' },
  { path: 'details', title: 'Details', sub: 'Your information' },
  { path: 'review', title: 'Confirm', sub: 'Review & pay' },
]

export const serviceById = (id) => SERVICES.find((s) => s.id === id) ?? SERVICES[0]
export const typeById = (id) => MEETING_TYPES.find((t) => t.id === id) ?? MEETING_TYPES[1]

/** Dates are stored as YYYY-MM-DD strings so they survive sessionStorage. */
export const toKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export const fromKey = (key) => {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export const formatLong = (key) =>
  fromKey(key).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

export const formatLongYear = (key) =>
  fromKey(key).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })

export const formatShort = (key) =>
  fromKey(key).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
