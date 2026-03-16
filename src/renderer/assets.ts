export interface BadgeAsset {
  id: string;
  title: string;
  description: string;
  iconSvg: string;
}

export const badgeAssets: Record<string, BadgeAsset> = {
  nightOwl: { id: 'nightOwl', title: 'Night Owl', description: '20%+ commits between 00:00 and 05:00', iconSvg: '<circle cx="50" cy="50" r="40" fill="gray" />' },
  earlyBird: { id: 'earlyBird', title: 'Early Bird', description: '20%+ commits between 04:00 and 08:00', iconSvg: '<circle cx="50" cy="50" r="40" fill="orange" />' },
  weekendWarrior: { id: 'weekendWarrior', title: 'Weekend Warrior', description: 'Over 50% commits on weekends', iconSvg: '<circle cx="50" cy="50" r="40" fill="red" />' },
  marathoner: { id: 'marathoner', title: 'Marathoner', description: '30+ day contribution streak', iconSvg: '<circle cx="50" cy="50" r="40" fill="blue" />' },
  sprinter: { id: 'sprinter', title: 'Sprinter', description: '50+ contributions in a single day', iconSvg: '<circle cx="50" cy="50" r="40" fill="yellow" />' },
  
  polyglot: { id: 'polyglot', title: 'Polyglot', description: 'Used 5+ languages >1%', iconSvg: '<circle cx="50" cy="50" r="40" fill="cyan" />' },
  omniglot: { id: 'omniglot', title: 'Omniglot', description: 'Used 10+ languages >1%', iconSvg: '<circle cx="50" cy="50" r="40" fill="magenta" />' },
  wordsmith: { id: 'wordsmith', title: 'Wordsmith', description: 'Over 25% of code is Markdown/Text', iconSvg: '<circle cx="50" cy="50" r="40" fill="lightblue" />' },
  codeDiet: { id: 'codeDiet', title: 'Code Diet', description: 'Popular repo under 50KB', iconSvg: '<circle cx="50" cy="50" r="40" fill="green" />' },
  
  mergeMaster: { id: 'mergeMaster', title: 'Merge Master', description: '50+ merged PRs', iconSvg: '<circle cx="50" cy="50" r="40" fill="purple" />' },
  hawkEye: { id: 'hawkEye', title: 'Hawk Eye', description: '50+ PR Reviews', iconSvg: '<circle cx="50" cy="50" r="40" fill="teal" />' },
  bugHunter: { id: 'bugHunter', title: 'Bug Hunter', description: '50+ closed issues', iconSvg: '<circle cx="50" cy="50" r="40" fill="brown" />' },
  necromancer: { id: 'necromancer', title: 'Necromancer', description: 'Resolved 365+ day old issue', iconSvg: '<circle cx="50" cy="50" r="40" fill="black" />' },
  teamPlayer: { id: 'teamPlayer', title: 'Team Player', description: 'Contributed to repo with 10+ active members', iconSvg: '<circle cx="50" cy="50" r="40" fill="navy" />' },
  explorer: { id: 'explorer', title: 'Explorer', description: 'Contributed to 10+ unique external repos', iconSvg: '<circle cx="50" cy="50" r="40" fill="olive" />' },
  
  starMagnet: { id: 'starMagnet', title: 'Star Magnet', description: 'Over 100 total stars', iconSvg: '<circle cx="50" cy="50" r="40" fill="gold" />' },
  trendSetter: { id: 'trendSetter', title: 'Trend Setter', description: 'Repo with 128+ stars gaining 128+/mo', iconSvg: '<circle cx="50" cy="50" r="40" fill="pink" />' },
  socialButterfly: { id: 'socialButterfly', title: 'Social Butterfly', description: '50+ followers and following', iconSvg: '<circle cx="50" cy="50" r="40" fill="salmon" />' },
  soloArtist: { id: 'soloArtist', title: 'Solo Artist', description: '500+ commits in solo repos', iconSvg: '<circle cx="50" cy="50" r="40" fill="silver" />' },
  archivist: { id: 'archivist', title: 'Archivist', description: 'Maintain 5+ archived repos', iconSvg: '<circle cx="50" cy="50" r="40" fill="wheat" />' },
};
