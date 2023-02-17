const ACHIEVEMENTS_DATA = [
  {
    title: 'Flip It!',
    description: 'Flip your first card',
    xp: 20,
    badge: 'card_badge',
    hierarchy: 'none',
    total_progress: 1,
    iterator_progress_bar_width: 100
  },
  {
    title: 'Perfect Move',
    description: 'Flip three sets of cards sequentially at a game',
    xp: 80,
    badge: 'card_badge',
    hierarchy: 'none',
    total_progress: 3,
    iterator_progress_bar_width: 100 / 3
  },
  {
    title: 'Player Harder Than Rock',
    description: 'Win your first Hard match',
    xp: 100,
    badge: 'crown_badge',
    hierarchy: 'bronze',
    total_progress: 1,
    iterator_progress_bar_width: 100
  },
  {
    title: 'Unstoppable',
    description: 'Win a match without losing a combination',
    xp: 180,
    badge: 'crown_badge',
    hierarchy: 'gold',
    total_progress: 1,
    iterator_progress_bar_width: 100
  },
  {
    title: '3 wins',
    description: 'Win 3 games',
    xp: 300,
    badge: 'crown_badge',
    hierarchy: 'bronze',
    total_progress: 3,
    iterator_progress_bar_width: 100 / 3
  },
  {
    title: '5 wins',
    description: 'Win 5 games',
    xp: 500,
    badge: 'crown_badge',
    hierarchy: 'silver',
    total_progress: 5,
    iterator_progress_bar_width: 100 / 5
  },
  {
    title: '15 wins',
    description: 'Win 15 games',
    xp: 1000,
    badge: 'crown_badge',
    hierarchy: 'silver',
    total_progress: 15,
    iterator_progress_bar_width: 100 / 15
  },
  {
    title: '50 wins',
    description: 'Win 50 games',
    xp: 2000,
    badge: 'crown_badge',
    hierarchy: 'gold',
    total_progress: 50,
    iterator_progress_bar_width: 100 / 50
  },
  {
    title: '100 wins',
    description: 'Win 100 games',
    xp: 4000,
    badge: 'crown_badge',
    hierarchy: 'gold',
    total_progress: 100,
    iterator_progress_bar_width: 100 / 100
  },
  {
    title: 'Win Streak - Easy',
    description: 'Get 3 win streak in Any Difficulty',
    xp: 500,
    badge: 'win_streak_badge',
    hierarchy: 'bronze',
    total_progress: 3,
    iterator_progress_bar_width: 100 / 3
  },
  {
    title: 'Win Streak - Normal',
    description: 'Get 5 win streak in Any Difficulty',
    xp: 600,
    badge: 'win_streak_badge',
    hierarchy: 'silver',
    total_progress: 5,
    iterator_progress_bar_width: 100 / 5
  },
  {
    title: 'Win Streak - Hard',
    description: 'Get 10 win streak in Any Difficulty',
    xp: 1000,
    badge: 'win_streak_badge',
    hierarchy: 'silver',
    total_progress: 10,
    iterator_progress_bar_width: 100 / 10
  },
  {
    title: 'Win Streak - Insane',
    description: 'Get 20 win streak in Hard Difficulty',
    xp: 5000,
    badge: 'win_streak_badge',
    hierarchy: 'gold',
    total_progress: 20,
    iterator_progress_bar_width: 100 / 20
  }
];

export { ACHIEVEMENTS_DATA };
