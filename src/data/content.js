export const GYM_INFO = {
  name: 'Smart Gym Ennasr',
  phone: '58 805 805',
  phoneFull: '(+216) 58 805 805',
  email: 'smartgymennasr@gmail.com',
  instagram: 'smartgymennasr',
  instagramUrl: 'https://www.instagram.com/smartgymennasr',
  facebookUrl: 'https://www.facebook.com/smartgymennasr',
  mapsUrl: 'https://maps.app.goo.gl/ZPg9HH1jYB77RtmKA',
  coords: { lat: 36.8598354, lng: 10.163022 },
  mapsEmbedUrl:
    'https://www.google.com/maps?q=36.8598354,10.163022&hl=fr&z=16&output=embed',
};

export const SCHEDULE_KEYS = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday',
];

export const SCHEDULE = {
  monday: [
    { time: '09H00', name: 'LesMills RPM', coach: 'Amido' },
    { time: '18H30', name: 'CAF', coach: 'Aziz' },
    { time: '18H30', name: 'Pilates', coach: 'Ahlem' },
    { time: '19H30', name: 'Cross Training', coach: 'Kais' },
    { time: '19H30', name: 'Zumba', coach: 'Ahmed' },
    { time: '20H30', name: 'ABS', coach: 'Neifer' },
  ],
  tuesday: [
    { time: '09H00', name: 'LesMills BODYPUMP', coach: 'Amido' },
    { time: '19H00', name: 'Danse Orientale', coach: 'Nada' },
    { time: '19H30', name: 'Spinning', coach: 'Oussema' },
    { time: '19H30', name: 'LesMills BODYCOMBAT', coach: 'Jawher' },
    { time: '20H30', name: 'Boxe', coach: 'Mosaad' },
  ],
  wednesday: [
    { time: '09H00', name: 'Circuit Training', coach: 'Amido' },
    { time: '18H30', name: 'LesMills BODYATTACK', coach: 'Amine' },
    { time: '19H30', name: 'LesMills BODYPUMP', coach: 'Amine' },
    { time: '20H30', name: 'ABS', coach: 'Neifer' },
  ],
  thursday: [
    { time: '09H00', name: 'Cross Training', coach: 'Kais' },
    { time: '18H30', name: 'Body Sculpt', coach: 'Aziz' },
    { time: '18H30', name: 'Afro', coach: 'Amido' },
    { time: '19H30', name: 'Cross Training', coach: 'Kais' },
    { time: '20H30', name: 'Boxe', coach: 'Mosaad' },
  ],
  friday: [
    { time: '09H00', name: 'Yoga', coach: 'Ahlem' },
    { time: '18H30', name: 'Mix BODYATTACK & BODYCOMBAT', coach: 'Amine' },
    { time: '19H30', name: 'LesMills BODYPUMP', coach: 'Amine' },
    { time: '19H30', name: 'Pilates', coach: 'Ahlem' },
  ],
  saturday: [
    { time: '11H00', name: 'Step', coach: 'Aziz' },
  ],
};

export const SERVICE_ITEMS = [
  { id: 'group', image: '/images/gym/group-class.jpg' },
  { id: 'boxing', image: '/images/gym/boxing-class.jpg' },
  { id: 'cross', image: '/images/gym/instructor-class.jpg' },
  { id: 'smart', image: '/images/gym/gym-interior-1.jpg' },
  { id: 'bodypump', image: '/images/gym/bodypump-class.jpg' },
  { id: 'cardio', image: '/images/gym/cardio.jpg' },
];
