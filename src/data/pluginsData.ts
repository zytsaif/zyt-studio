export interface PluginItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 'Utility' | 'PvP & Games' | 'SMP & Economy' | 'Featured' | 'Recording / Cinematic Tools' | 'Premium Plugin';
  minecraftVersion: string;
  price: string;
  inrPrice?: string;
  rating: number;
  salesCount: number;
  features: string[];
  fullFeatures: string[];
  commands: { command: string; permission: string; description: string }[];
  configSnippet: string;
  iconName: string;
  imageUrl?: string;
  downloadUrl?: string;
}

export const PLUGINS_DATA: PluginItem[] = [
  {
    id: 'mocap',
    name: 'Mocap',
    tagline: 'Professional Motion Capture & Cinematic Animation Plugin',
    description: 'Professional Minecraft motion capture and cinematic animation plugin with camera paths, emotes, NPC animation and recording tools.',
    category: 'Premium Plugin',
    minecraftVersion: 'Minecraft 1.21 - 1.21.11',
    price: '$24.99',
    inrPrice: '₹2,099',
    rating: 5.0,
    salesCount: 120,
    iconName: 'Video',
    imageUrl: '/zyt_mascot.jpg',
    downloadUrl: 'https://zytstudio.com/download/mocap.jar',
    features: [
      'Camera Paths & Bezier Interpolation',
      'Player Emotes & Custom NPC Animation',
      'Recording Tools & Replay Buffer',
      'Sub-tick Motion Capture Tracking'
    ],
    fullFeatures: [
      'Camera Paths & Bezier Interpolation with keyframe speed control',
      'Player Emotes & Custom NPC Animation puppet control',
      'Recording Tools & Replay Buffer with instant file export',
      'Sub-tick Motion Capture Tracking with PacketEvents NMS optimization'
    ],
    commands: [
      { command: '/mocap record', permission: 'mocap.admin', description: 'Start recording motion capture' },
      { command: '/mocap play', permission: 'mocap.use', description: 'Play recorded cinematic' }
    ],
    configSnippet: `# Mocap Configuration
mocap:
  camera_paths: true
  recording_fps: 60`
  },
  {
    id: 'rechelp',
    name: 'RecHelp',
    tagline: 'Studio-grade content creation & cinematic camera tracking',
    description: 'The ultimate recording helper system for YouTubers & Streamers. Enables smooth camera paths, invisible spectator vanish, auto-replay buffers, and HUD toggles.',
    category: 'Utility',
    minecraftVersion: 'Minecraft 1.21 - 1.21.11',
    price: '$14.99',
    inrPrice: '₹1,299',
    rating: 4.9,
    salesCount: 142,
    iconName: 'Video',
    features: [
      '60 FPS Bezier Camera Tracking Paths',
      'Silent Vanish with Ghost Entity Hiding',
      'Auto-Replay Recording Buffer Integration',
      'Custom HUD Hide & Cinematic Filters'
    ],
    fullFeatures: [
      '60 FPS Bezier Camera Tracking Paths with Keyframe Editor',
      'Silent Vanish with Ghost Entity Hiding & Sound Suppressor',
      'Auto-Replay Recording Buffer with instant local saving',
      'Custom HUD Hide & Cinematic Filters (FOV, Speed, NightVision)',
      'Multi-player synchronized camera paths for cinematic battles',
      'Discord Webhook alerts when recording sessions start/stop'
    ],
    commands: [
      { command: '/rechelp cam start <path>', permission: 'rechelp.admin', description: 'Start camera track path' },
      { command: '/rechelp vanish', permission: 'rechelp.vanish', description: 'Toggle silent recorder vanish' },
      { command: '/rechelp replay save', permission: 'rechelp.replay', description: 'Save the last 5 minutes of gameplay buffer' }
    ],
    configSnippet: `# RecHelp Configuration File
camera:
  default_speed: 1.5
  smooth_transitions: true
  interpolate_fov: true
vanish:
  hide_nametags: true
  suppress_footsteps: true
  ghost_transparency: 0.4`
  },
  {
    id: 'deathloot',
    name: 'DeathLoot',
    tagline: 'Customizable gravestones, soul binding & anti-grief death system',
    description: 'Protect player items with custom animated grave monuments, retrieval compasses, soul key locks, and timed decay protection to eliminate item voiding.',
    category: 'SMP & Economy',
    minecraftVersion: 'Minecraft 1.21 - 1.21.11',
    price: '$9.99',
    inrPrice: '₹899',
    rating: 4.95,
    salesCount: 218,
    iconName: 'Skull',
    features: [
      'Custom Holographic Gravestone Monuments',
      'Soul Binding Key & Compass Tracking',
      'Anti-Lava & Void Loot Auto-Recovery',
      'Configurable Expiration & Public Decay'
    ],
    fullFeatures: [
      'Custom Holographic Gravestone Monuments with skin heads',
      'Soul Binding Key system requiring grave keys to unlock',
      'Anti-Lava & Void Loot Auto-Recovery (Teleports grave to safety)',
      'Configurable Expiration timer before public player looting',
      'EXP percentage retention and soul jar storage',
      'MySQL / SQLite cross-server grave persistence'
    ],
    commands: [
      { command: '/deathloot graves', permission: 'deathloot.use', description: 'Open GUI list of your current graves' },
      { command: '/deathloot compass', permission: 'deathloot.use', description: 'Get a tracking compass to your last death' },
      { command: '/deathloot recover <player>', permission: 'deathloot.admin', description: 'Force recover a player\'s grave' }
    ],
    configSnippet: `# DeathLoot Config
grave_protection_seconds: 300
anti_void_teleport: true
keep_exp_percent: 75
particles:
  enabled: true
  type: "SOUL_FIRE_FLAME"`
  },
  {
    id: 'spinwheel',
    name: 'SpinWheel',
    tagline: 'High-engagement GUI reward wheel with particle victory effects',
    description: 'Boost player retention with custom roulette reward wheels, sound tracks, daily free spins, probability tiers, and Discord broadcast integration.',
    category: 'SMP & Economy',
    minecraftVersion: 'Minecraft 1.21 - 1.21.11',
    price: '$7.99',
    inrPrice: '₹699',
    rating: 4.88,
    salesCount: 310,
    iconName: 'Disc',
    features: [
      'Dynamic Inventory GUI Wheel Animation',
      'Custom Weighted Drop Probability Tiers',
      'Daily Free Spin & Streak Rewards',
      'Particle Explosion & Sound Blast FX'
    ],
    fullFeatures: [
      'Dynamic Inventory GUI Wheel Animation with tick physics',
      'Custom Weighted Drop Probability Tiers (Common to Mythic)',
      'Daily Free Spin & Multi-day login streak bonuses',
      'Particle Explosion & Sound Blast FX on Legendary wins',
      'Supports Commands, Items, Money, Keys, and Ranks as rewards',
      'Full Discord Webhook logger for mythic drops'
    ],
    commands: [
      { command: '/wheel spin <category>', permission: 'spinwheel.spin', description: 'Open and spin a reward wheel' },
      { command: '/wheel givekey <player> <amount>', permission: 'spinwheel.admin', description: 'Give wheel spin keys to player' }
    ],
    configSnippet: `# SpinWheel Config
spin_duration_ticks: 100
sound_pitch_ramp: true
rewards:
  mythic_key:
    chance: 0.05
    display_item: "NETHER_STAR"
    broadcast: "&d&lMYTHIC! &f%player% won a Mythic Key!"`
  },
  {
    id: 'killstreak',
    name: 'Kill Streak',
    tagline: 'Action-packed bounty announcements, sound tracks & streak perks',
    description: 'Hyper-motivate PvP combat on your server. Awards streak abilities, sound cues, global chat broadcasts, and customizable kill brawls.',
    category: 'PvP & Games',
    minecraftVersion: 'Minecraft 1.21 - 1.21.11',
    price: '$12.99',
    inrPrice: '₹1,099',
    rating: 4.92,
    salesCount: 185,
    iconName: 'Swords',
    features: [
      'Customizable Kill Streak Milestones (5, 10, 25, 50)',
      'Temporary Potion & Ability Buffs',
      'Dynamic Global Bounty System',
      'Custom Actionbar & Title Announcements'
    ],
    fullFeatures: [
      'Customizable Kill Streak Milestones with unique rewards',
      'Temporary Potion & Ability Buffs (Speed, Strength, Resistance)',
      'Dynamic Global Bounty System with head rewards',
      'Custom Actionbar, Bossbar, and Title Announcements',
      'Kill Sound FX played globally or to nearby combatants',
      'Leaderboards for highest streaks and active bounties'
    ],
    commands: [
      { command: '/streak', permission: 'killstreak.use', description: 'View current streak & leaderboard' },
      { command: '/bounty place <player> <amount>', permission: 'killstreak.bounty', description: 'Place a bounty on a player' }
    ],
    configSnippet: `# KillStreak Config
bounty_auto_increment: 50
streaks:
  5:
    title: "&c&lKILLING SPREE!"
    buffs: ["SPEED:1:10", "REGENERATION:1:5"]
  10:
    title: "&5&lRAMPAGE!"
    sound: "ENTITY_ENDER_DRAGON_GROWL"`
  },
  {
    id: 'mlgarena',
    name: 'MLG Arena',
    tagline: 'Automatic clutch practice system with instant arena reset',
    description: 'Autonomous clutch training system for players. Practice water bucket MLG, ladder clutch, cobweb, boat, and block clutching with zero tick delay.',
    category: 'PvP & Games',
    minecraftVersion: 'Minecraft 1.21 - 1.21.11',
    price: '$14.99',
    inrPrice: '₹1,299',
    rating: 4.97,
    salesCount: 129,
    iconName: 'Trophy',
    features: [
      'Multi-Mode Clutch Practice (Water, Ladder, Web, Block)',
      'Instant Map & Block Reset Engine',
      'Dynamic Height & Distance Tuning',
      'Personal Best Tracker & Leaderboards'
    ],
    fullFeatures: [
      'Multi-Mode Clutch Practice (Water, Ladder, Web, Boat, Block)',
      'Instant Map & Block Reset Engine without lag spikes',
      'Dynamic Height & Distance Tuning per player level',
      'Personal Best Tracker, Success Rate %, and Leaderboards',
      'Automatic Fall Damage Shield and inventory restore',
      'Multi-arena isolation supporting 100+ concurrent practice bots/players'
    ],
    commands: [
      { command: '/mlg join <mode>', permission: 'mlgarena.use', description: 'Join an MLG clutch practice arena' },
      { command: '/mlg stats', permission: 'mlgarena.use', description: 'View your clutch percentage and high scores' }
    ],
    configSnippet: `# MLG Arena Config
auto_reset_delay_ticks: 5
modes:
  WATER_BUCKET:
    min_height: 20
    max_height: 150
  LADDER_CLUTCH:
    wall_distance: 3`
  },
  {
    id: 'customsmp',
    name: 'Custom SMP Systems',
    tagline: 'Enterprise-grade modular SMP suite with Lifesteal & custom mechanics',
    description: 'Complete all-in-one survival multiplayer system. Features Lifesteal heart crafting, land claim protection, custom enchantments, and economy.',
    category: 'SMP & Economy',
    minecraftVersion: 'Minecraft 1.21 - 1.21.11',
    price: '$24.99',
    inrPrice: '₹2,099',
    rating: 5.0,
    salesCount: 420,
    iconName: 'ShieldCheck',
    features: [
      'Modular Lifesteal Heart Crafting & Revive Beacons',
      'Seamless Land Claiming & Anti-Grief Protection',
      '50+ Custom Enchantment Modules',
      'Redis & MySQL Cross-Server Synchronization'
    ],
    fullFeatures: [
      'Modular Lifesteal Heart Crafting & Revive Beacons',
      'Seamless Land Claiming & Anti-Grief Protection',
      '50+ Custom Enchantment Modules with lore glow',
      'Redis & MySQL Cross-Server Player Data Synchronization',
      'Integrated Player Auctions, Shop GUIs, and Coin Flip',
      'Custom scoreboard HUD with real-time TPS & player stats'
    ],
    commands: [
      { command: '/smp hearts withdraw <amount>', permission: 'customsmp.hearts', description: 'Withdraw physical hearts as item' },
      { command: '/smp revive <player>', permission: 'customsmp.revive', description: 'Use beacon to revive eliminated player' },
      { command: '/claim', permission: 'customsmp.claim', description: 'Claim land chunk for team' }
    ],
    configSnippet: `# Custom SMP Core Config
lifesteal:
  max_hearts: 30
  min_hearts: 1
  elimination_action: "BAN" # BAN, SPECTATOR, JAIL
  revive_beacon_recipe_enabled: true
claim:
  max_chunks_per_player: 16`
  }
];
