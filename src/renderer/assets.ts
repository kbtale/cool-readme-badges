export interface BadgeAsset {
  id: string;
  title: string;
  description: string;
  variants: Record<string, string>; // Maps a theme name (e.g., 'dark', 'light') to an SVG string
}

export const badgeAssets: Record<string, BadgeAsset> = {
  nightOwl: { id: 'nightOwl', title: 'Night Owl', description: '20%+ commits between 00:00 and 05:00', variants: { dark: '<circle cx="50" cy="50" r="40" fill="gray" />', light: '<circle cx="50" cy="50" r="40" fill="lightgray" />' } },
  earlyBird: { id: 'earlyBird', title: 'Early Bird', description: '20%+ commits between 04:00 and 08:00', variants: { dark: '<circle cx="50" cy="50" r="40" fill="orange" />', light: '<circle cx="50" cy="50" r="40" fill="orange" />' } },
  weekendWarrior: { id: 'weekendWarrior', title: 'Weekend Warrior', description: 'Over 50% commits on weekends', variants: { dark: '<circle cx="50" cy="50" r="40" fill="red" />', light: '<circle cx="50" cy="50" r="40" fill="red" />' } },
  marathoner: { id: 'marathoner', title: 'Marathoner', description: '30+ day contribution streak', variants: { dark: '<circle cx="50" cy="50" r="40" fill="blue" />', light: '<circle cx="50" cy="50" r="40" fill="lightblue" />' } },
  sprinter: { id: 'sprinter', title: 'Sprinter', description: '50+ contributions in a single day', variants: { dark: '<circle cx="50" cy="50" r="40" fill="yellow" />', light: '<circle cx="50" cy="50" r="40" fill="yellow" />' } },
  
  polyglot: { id: 'polyglot', title: 'Polyglot', description: 'Used 5+ languages >1%', variants: { dark: '<circle cx="50" cy="50" r="40" fill="cyan" />', light: '<circle cx="50" cy="50" r="40" fill="cyan" />' } },
  omniglot: { id: 'omniglot', title: 'Omniglot', description: 'Used 10+ languages >1%', variants: { dark: '<circle cx="50" cy="50" r="40" fill="magenta" />', light: '<circle cx="50" cy="50" r="40" fill="magenta" />' } },
  wordsmith: { id: 'wordsmith', title: 'Wordsmith', description: 'Over 25% of code is Markdown/Text', variants: { dark: '<circle cx="50" cy="50" r="40" fill="lightblue" />', light: '<circle cx="50" cy="50" r="40" fill="blue" />' } },
  codeDiet: { id: 'codeDiet', title: 'Code Diet', description: 'Popular repo under 50KB', variants: { dark: '<circle cx="50" cy="50" r="40" fill="green" />', light: '<circle cx="50" cy="50" r="40" fill="lightgreen" />' } },
  
  mergeMaster: { id: 'mergeMaster', title: 'Merge Master', description: '50+ merged PRs', variants: { dark: '<circle cx="50" cy="50" r="40" fill="purple" />', light: '<circle cx="50" cy="50" r="40" fill="purple" />' } },
  hawkEye: { id: 'hawkEye', title: 'Hawk Eye', description: '50+ PR Reviews', variants: { dark: '<circle cx="50" cy="50" r="40" fill="teal" />', light: '<circle cx="50" cy="50" r="40" fill="teal" />' } },
  bugHunter: { id: 'bugHunter', title: 'Bug Hunter', description: '50+ closed issues', variants: { dark: '<circle cx="50" cy="50" r="40" fill="brown" />', light: '<circle cx="50" cy="50" r="40" fill="brown" />' } },
  necromancer: { id: 'necromancer', title: 'Necromancer', description: 'Resolved 365+ day old issue', variants: { dark: '<circle cx="50" cy="50" r="40" fill="black" />', light: '<circle cx="50" cy="50" r="40" fill="gray" />' } },
  teamPlayer: { id: 'teamPlayer', title: 'Team Player', description: 'Contributed to repo with 10+ active members', variants: { dark: '<circle cx="50" cy="50" r="40" fill="navy" />', light: '<circle cx="50" cy="50" r="40" fill="blue" />' } },
  explorer: { id: 'explorer', title: 'Explorer', description: 'Contributed to 10+ unique external repos', variants: { dark: '<circle cx="50" cy="50" r="40" fill="olive" />', light: '<circle cx="50" cy="50" r="40" fill="olive" />' } },
  
  starMagnet: { id: 'starMagnet', title: 'Star Magnet', description: 'Over 100 total stars', variants: { dark: '<circle cx="50" cy="50" r="40" fill="gold" />', light: '<circle cx="50" cy="50" r="40" fill="gold" />' } },
  trendSetter: { id: 'trendSetter', title: 'Trend Setter', description: 'Repo with 128+ stars gaining 128+/mo', variants: { dark: '<circle cx="50" cy="50" r="40" fill="pink" />', light: '<circle cx="50" cy="50" r="40" fill="pink" />' } },
  socialButterfly: { id: 'socialButterfly', title: 'Social Butterfly', description: '50+ followers and following', variants: { dark: '<circle cx="50" cy="50" r="40" fill="salmon" />', light: '<circle cx="50" cy="50" r="40" fill="salmon" />' } },
  soloArtist: { id: 'soloArtist', title: 'Solo Artist', description: '500+ commits in solo repos', variants: { dark: '<circle cx="50" cy="50" r="40" fill="silver" />', light: '<circle cx="50" cy="50" r="40" fill="silver" />' } },
  archivist: { id: 'archivist', title: 'Archivist', description: 'Maintain 5+ archived repos', variants: { dark: '<circle cx="50" cy="50" r="40" fill="wheat" />', light: '<circle cx="50" cy="50" r="40" fill="wheat" />' } },
};
