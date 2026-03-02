export type Mood = 'positive' | 'neutral' | 'low';

export function generateAffirmation(mood: Mood): string {
  switch (mood) {
    case 'positive':
      return 'You are already closer to calm than you think. Let this good energy gently guide your day.';
    case 'neutral':
      return 'Even in a regular day, you can pause, breathe, and choose a softer pace for yourself.';
    case 'low':
    default:
      return 'You are allowed to rest. You are enough, even when you feel low. Let today be gentle.';
  }
}

