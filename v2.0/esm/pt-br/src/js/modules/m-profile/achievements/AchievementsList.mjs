const ACHIEVEMENTS_DATA = [
  {
    title: 'Flip It!',
    description: 'Vire a sua primeira carta',
    xp: 20,
    badge: 'card_badge',
    hierarchy: 'none',
    total_progress: 1,
    iterator_progress_bar_width: 100
  },
  {
    title: 'Perfect Move',
    description: 'Faça três combinações em uma partida',
    xp: 80,
    badge: 'card_badge',
    hierarchy: 'none',
    total_progress: 3,
    iterator_progress_bar_width: 100 / 3
  },
  {
    title: 'Player Harder Than Rock',
    description: 'Vença sua primeira partida difícil',
    xp: 100,
    badge: 'crown_badge',
    hierarchy: 'bronze',
    total_progress: 1,
    iterator_progress_bar_width: 100
  },
  {
    title: 'Unstoppable',
    description: 'Vença uma partida sem perder uma combinação',
    xp: 180,
    badge: 'crown_badge',
    hierarchy: 'gold',
    total_progress: 1,
    iterator_progress_bar_width: 100
  },
  {
    title: '3 wins',
    description: 'Vença 3 partidas',
    xp: 300,
    badge: 'crown_badge',
    hierarchy: 'bronze',
    total_progress: 3,
    iterator_progress_bar_width: 100 / 3
  },
  {
    title: '5 wins',
    description: 'Vença 5 partidas',
    xp: 500,
    badge: 'crown_badge',
    hierarchy: 'silver',
    total_progress: 5,
    iterator_progress_bar_width: 100 / 5
  },
  {
    title: '15 wins',
    description: 'Vença 15 partidas',
    xp: 1000,
    badge: 'crown_badge',
    hierarchy: 'silver',
    total_progress: 15,
    iterator_progress_bar_width: 100 / 15
  },
  {
    title: '50 wins',
    description: 'Vença 50 partidas',
    xp: 2000,
    badge: 'crown_badge',
    hierarchy: 'gold',
    total_progress: 50,
    iterator_progress_bar_width: 100 / 50
  },
  {
    title: '100 wins',
    description: 'Vença 100 partidas',
    xp: 4000,
    badge: 'crown_badge',
    hierarchy: 'gold',
    total_progress: 100,
    iterator_progress_bar_width: 100 / 100
  },
  {
    title: 'Win Streak - Easy',
    description: 'Consiga 3 vitórias seguidas em qualquer dificuldade',
    xp: 500,
    badge: 'win_streak_badge',
    hierarchy: 'bronze',
    total_progress: 3,
    iterator_progress_bar_width: 100 / 3
  },
  {
    title: 'Win Streak - Normal',
    description: 'Consiga 5 vitórias seguidas em qualquer dificuldade',
    xp: 600,
    badge: 'win_streak_badge',
    hierarchy: 'silver',
    total_progress: 5,
    iterator_progress_bar_width: 100 / 5
  },
  {
    title: 'Win Streak - Hard',
    description: 'Consiga 10 vitórias seguidas em qualquer dificuldade',
    xp: 1000,
    badge: 'win_streak_badge',
    hierarchy: 'silver',
    total_progress: 10,
    iterator_progress_bar_width: 100 / 10
  },
  {
    title: 'Win Streak - Insane',
    description: 'Consiga 20 vitórias seguidas em qualquer dificuldade',
    xp: 5000,
    badge: 'win_streak_badge',
    hierarchy: 'gold',
    total_progress: 20,
    iterator_progress_bar_width: 100 / 20
  }
];

export { ACHIEVEMENTS_DATA };
