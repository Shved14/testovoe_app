export type MeditationSession = {
  id: string;
  title: string;
  duration: string;
  image: string;
};

export const MEDITATION_SESSIONS: MeditationSession[] = [
  {
    id: '1',
    title: 'Morning Calm',
    duration: '10 min',
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg',
  },
  {
    id: '2',
    title: 'Deep Sleep Journey',
    duration: '20 min',
    image: 'https://images.pexels.com/photos/355863/pexels-photo-355863.jpeg',
  },
  {
    id: '3',
    title: 'Anxiety Release',
    duration: '12 min',
    image: 'https://images.pexels.com/photos/3823207/pexels-photo-3823207.jpeg',
  },
  {
    id: '4',
    title: 'Focus & Flow',
    duration: '15 min',
    image: 'https://images.pexels.com/photos/3822929/pexels-photo-3822929.jpeg',
  },
  {
    id: '5',
    title: 'Evening Gratitude',
    duration: '8 min',
    image: 'https://images.pexels.com/photos/3822623/pexels-photo-3822623.jpeg',
  },
  {
    id: '6',
    title: 'Stress Reset',
    duration: '18 min',
    image: 'https://images.pexels.com/photos/3822625/pexels-photo-3822625.jpeg',
  },
];

