export interface ReviewItem {
  id: string;
  rating: number;
  quote: string;
  author: string;
  role: string;
  serverName: string;
  avatar: string;
  verifiedOrder: string;
  date: string;
}

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: '1',
    rating: 5,
    quote: "Outstanding work and very professional. Delivered our custom SMP system in 3 days with zero bugs. TPS stayed rock solid at 20.0 during our 300 player launch!",
    author: "Alex V.",
    role: "Minecraft Server Owner",
    serverName: "PlayMine Network",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    verifiedOrder: "Custom SMP Systems & Folia Engine",
    date: "Aug 2026"
  },
  {
    id: '2',
    rating: 5,
    quote: "Delivered exactly what we needed for our Lifesteal server. The heart crafting system and revive beacons were coded cleanly with beautiful particle FX.",
    author: "Marcus K.",
    role: "SMP Creator",
    serverName: "Vortex SMP",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    verifiedOrder: "Lifesteal Core & Anti-Dupe",
    date: "Jul 2026"
  },
  {
    id: '3',
    rating: 5,
    quote: "One of the best developers I've worked with in my 6 years of server management. Fast communication, clean code, and super friendly support.",
    author: "Sarah T.",
    role: "Community Manager",
    serverName: "CraftHQ Studios",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    verifiedOrder: "RecHelp Recording Suite",
    date: "Jul 2026"
  },
  {
    id: '4',
    rating: 5,
    quote: "Zyt Studio fixed a massive memory leak crash on our Skyblock proxy within 12 hours of placing the order. Saved our entire peak weekend traffic!",
    author: "David R.",
    role: "Network Lead",
    serverName: "Aetheria Skyblock",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    verifiedOrder: "Performance Optimization & Bug Fix",
    date: "Jun 2026"
  },
  {
    id: '5',
    rating: 5,
    quote: "The MLG Arena plugin is incredible. Players can practice 5 different clutches without any arena reset delay. Worth every single cent.",
    author: "Liam P.",
    role: "PvP Arena Director",
    serverName: "ClutchCraft PvP",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
    verifiedOrder: "MLG Arena Plugin",
    date: "May 2026"
  }
];
