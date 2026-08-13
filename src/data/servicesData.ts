export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  deliveryTime: string;
  priceStart: string;
  popular?: boolean;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'custom-plugin-dev',
    title: 'Custom Plugin Development',
    shortDesc: 'Unique plugins built from scratch tailored specifically to your server vision.',
    fullDesc: 'Get handcrafted Bukkit/Spigot/Paper/Folia plugins coded to your exact specifications. From complex economy systems to unique custom mechanics, built with zero bloat and maximum speed.',
    iconName: 'Code',
    features: [
      'Built for Spigot, Paper, Purpur & Folia',
      'Asynchronous database & packet handling',
      'Clean OOP architecture & fully documented',
      '1 Month free post-launch bug warranty'
    ],
    deliveryTime: '2 - 5 Days',
    priceStart: 'From $49',
    popular: true
  },
  {
    id: 'server-setup',
    title: 'Server Setup',
    shortDesc: 'Complete server setup and optimization from proxy to backend nodes.',
    fullDesc: 'Complete end-to-end Minecraft server network architecture setup. Includes BungeeCord/Velocity configuration, permission nodes, anti-cheat tuning, and seamless server teleports.',
    iconName: 'Server',
    features: [
      'Velocity / BungeeCord Proxy setup',
      'LuckPerms permission group hierarchy',
      'Anti-cheat & anti-exploit configuration',
      'Custom tablists, scoreboards & MOTD'
    ],
    deliveryTime: '3 - 7 Days',
    priceStart: 'From $89'
  },
  {
    id: 'bug-fixing',
    title: 'Bug Fixing',
    shortDesc: 'Fix issues, crashes, and exceptions in existing custom or public plugins.',
    fullDesc: 'Is your server experiencing console spam, memory leaks, duplication glitches, or plugin conflicts? Our deep debugging process quickly pinpoints root causes and patches them permanently.',
    iconName: 'Bug',
    features: [
      'Console NullPointer & StackTrace diagnostic',
      'Item duplication & chunk loading exploit fixes',
      'Version updates & API migration',
      'Detailed crash root cause breakdown'
    ],
    deliveryTime: '24 - 48 Hours',
    priceStart: 'From $29'
  },
  {
    id: 'performance-optimization',
    title: 'Performance Optimization',
    shortDesc: 'Improve TPS, reduce memory footprint, and eliminate server tick lag.',
    fullDesc: 'Transform laggy 12 TPS servers into buttery-smooth 20.0 TPS powerhouses. We audit paper.yml, spigot.yml, spark profiler traces, entity limits, and database query latency.',
    iconName: 'Zap',
    features: [
      'Spark & Timings profiler analysis',
      'Entity, redstone & chunk tick optimization',
      'Async database pool & Redis caching',
      'Guaranteed TPS boost under heavy player loads'
    ],
    deliveryTime: '1 - 3 Days',
    priceStart: 'From $59',
    popular: true
  },
  {
    id: 'plugin-configuration',
    title: 'Plugin Configuration',
    shortDesc: 'Professional plugin configuration, custom GUIs, and translations.',
    fullDesc: 'Don\'t waste weeks tweaking complex YAML files. We professionally design custom inventory GUIs, balance reward crates, format chat prefix tags, and translate plugin text.',
    iconName: 'Sliders',
    features: [
      'Custom DeluxeMenus & ChestCommands GUI layouts',
      'Balanced crate drop tables & economy scaling',
      'Multi-language translation & color formatting',
      'Clean organized YAML file structure'
    ],
    deliveryTime: '1 - 2 Days',
    priceStart: 'From $35'
  }
];
