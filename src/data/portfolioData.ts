export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  details: string;
  client: string;
  stats: { label: string; value: string }[];
  tags: string[];
  gradient: string;
  accentColor: string;
  badge: string;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'custom-smp-ecosystem',
    title: 'Custom SMP Systems',
    category: 'Full Engine Suite',
    description: 'Enterprise survival multiplayer infrastructure featuring custom hearts, revive beacons, claims, and real-time cross-server sync.',
    details: 'Designed for high-traffic survival networks. Handles over 300 concurrent players with 20.0 TPS using Folia multi-threading and Redis pub/sub.',
    client: 'Vortex SMP Network',
    stats: [
      { label: 'Active Players', value: '350+' },
      { label: 'TPS Maintained', value: '20.0' },
      { label: 'Delivery Time', value: '5 Days' }
    ],
    tags: ['Paper API', 'Folia Multi-threading', 'Redis Sync', 'MySQL', 'Custom GUIs'],
    gradient: 'from-purple-900/40 via-indigo-900/30 to-blue-900/40',
    accentColor: '#8b5cf6',
    badge: 'Flagship Case Study'
  },
  {
    id: 'lifesteal-hardcore',
    title: 'Lifesteal Plugins',
    category: 'PvP & Survival Mechanics',
    description: 'High-stakes heart stealing mechanics with revive totems, custom crafting altars, and anti-alt farming detection systems.',
    details: 'Features custom NMS packet-based item rendering for heart altars and real-time combat logging prevention with inventory locks.',
    client: 'BloodLust SMP',
    stats: [
      { label: 'Hearts Crafted', value: '50K+' },
      { label: 'Eliminations Handled', value: '12K+' },
      { label: 'Rating', value: '5.0 ★' }
    ],
    tags: ['NMS Packets', 'Combat System', 'SQL Storage', 'Discord Bot Link'],
    gradient: 'from-red-900/40 via-purple-900/30 to-slate-900/40',
    accentColor: '#ef4444',
    badge: 'Popular'
  },
  {
    id: 'recording-helper',
    title: 'Recording Helper Systems',
    tagline: 'RecHelp Engine',
    category: 'Content Creator Tools',
    description: 'Dedicated camera automation suite built specifically for Minecraft YouTubers and Streamers to capture cinematic 60 FPS video tracks.',
    details: 'Includes smooth spline-based camera interpolation, silent spectator mode without phantom footstep sounds, and live frame buffers.',
    client: 'CraftHQ Studios (1.2M Subs)',
    stats: [
      { label: 'Videos Rendered', value: '450+' },
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Efficiency', value: '100%' }
    ],
    tags: ['Camera Paths', 'Cinematic Bezier', 'Vanish NMS', 'Replay Buffer'],
    gradient: 'from-blue-900/40 via-cyan-900/30 to-purple-900/40',
    accentColor: '#06b6d4',
    badge: 'Creator Choice'
  },
  {
    id: 'minigame-engine',
    title: 'Minigame Plugins',
    category: 'Competitive Arenas',
    description: 'Autonomous minigame framework supporting BedWars, Duels, and Arena clutches with instant map reset and party queue matchmaking.',
    details: 'Integrated with BungeeCord / Velocity network proxy for seamless arena dynamic instance scaling and automatic server balance loading.',
    client: 'PlayMine Games',
    stats: [
      { label: 'Matches Played', value: '1.2M' },
      { label: 'Reset Delay', value: '<50ms' },
      { label: 'Arena Capacity', value: '64 Games' }
    ],
    tags: ['Matchmaking Engine', 'Map Reset', 'Velocity Proxy', 'Leaderboards'],
    gradient: 'from-emerald-900/40 via-teal-900/30 to-blue-900/40',
    accentColor: '#10b981',
    badge: 'High Performance'
  },
  {
    id: 'event-systems',
    title: 'Event Systems',
    category: 'Server-Wide Events',
    description: 'Dynamic event scheduler for Boss Raids, King of the Hill (KOTH), Supply Drop Air-crafts, and Loot Pinatas with live scoreboards.',
    details: 'Fully configurable boss AI using MythicMobs API hooks and custom packet bossbars with automated Discord notifications.',
    client: 'Aetheria Skyblock',
    stats: [
      { label: 'Events Scheduled', value: '2.5K+' },
      { label: 'Concurrent Bosses', value: '20+' },
      { label: 'Uptime', value: '99.9%' }
    ],
    tags: ['Boss AI', 'KOTH Engine', 'Discord Webhooks', 'Hologram FX'],
    gradient: 'from-amber-900/40 via-purple-900/30 to-indigo-900/40',
    accentColor: '#f59e0b',
    badge: 'Automated'
  },
  {
    id: 'custom-mechanics',
    title: 'Custom Minecraft Mechanics',
    category: 'Advanced NMS & Packets',
    description: 'Bespoke game physics, custom weapons with custom model data, raycast spells, and interactive custom GUI inventory layouts.',
    details: 'Direct NMS manipulation to bypass vanilla constraints. Custom entity hitboxes, custom particle beams, and 3D item rotations.',
    client: 'Aetheria Network',
    stats: [
      { label: 'Custom Spells', value: '80+' },
      { label: 'Packet Speed', value: '0.1ms' },
      { label: 'Exploit Resistance', value: '100%' }
    ],
    tags: ['NMS Bytecode', 'Raycasting', 'Model Engine', 'PacketEvents'],
    gradient: 'from-fuchsia-900/40 via-purple-900/30 to-cyan-900/40',
    accentColor: '#d946ef',
    badge: 'Cutting Edge'
  }
];
