export interface BadgeMetadata {
  id: string;
  title: string;
  description: string;
}

export const badgeRegistry: Record<string, BadgeMetadata> = {
  nightOwl: { id: 'nightOwl', title: 'Night Owl', description: '20%+ commits between 00:00 and 05:00' },
  earlyBird: { id: 'earlyBird', title: 'Early Bird', description: '20%+ commits between 04:00 and 08:00' },
  weekendWarrior: { id: 'weekendWarrior', title: 'Weekend Warrior', description: 'Over 50% commits on weekends' },
  marathoner: { id: 'marathoner', title: 'Marathoner', description: '30+ day contribution streak' },
  sprinter: { id: 'sprinter', title: 'Sprinter', description: '50+ contributions in a single day' },
  
  polyglot: { id: 'polyglot', title: 'Polyglot', description: 'Used 5+ languages >1%' },
  omniglot: { id: 'omniglot', title: 'Omniglot', description: 'Used 10+ languages >1%' },
  wordsmith: { id: 'wordsmith', title: 'Wordsmith', description: 'Over 25% of code is Markdown/Text' },
  
  mergeMaster: { id: 'mergeMaster', title: 'Merge Master', description: '50+ merged PRs' },
  hawkEye: { id: 'hawkEye', title: 'Hawk Eye', description: '50+ PR Reviews' },
  bugHunter: { id: 'bugHunter', title: 'Bug Hunter', description: '50+ total closed issues' },
  theCleaner: { id: 'theCleaner', title: 'The Cleaner', description: 'Closed/Helped more than opened' },
  necromancer: { id: 'necromancer', title: 'Necromancer', description: 'Fixed an issue after 365+ days' },
  teamPlayer: { id: 'teamPlayer', title: 'Team Player', description: 'Contributed to repo with 10+ active members' },
  explorer: { id: 'explorer', title: 'Explorer', description: 'Contributed to 10+ unique external repos' },
  
  starMagnet: { id: 'starMagnet', title: 'Star Magnet', description: 'Over 100 total stars' },
  trendSetter: { id: 'trendSetter', title: 'Trend Setter', description: 'Repo with 128+ stars gaining 128+/mo' },
  socialButterfly: { id: 'socialButterfly', title: 'Social Butterfly', description: '50+ followers and following' },
  soloArtist: { id: 'soloArtist', title: 'Solo Artist', description: '500+ commits in solo repos' },
  archivist: { id: 'archivist', title: 'Archivist', description: 'Maintain 5+ archived repos' },
};
