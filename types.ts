import { MoodData, MoodType, ThemePreset } from "./types";

export const moods: Record<MoodType, MoodData> = {
  vibe: {
    name: "vibe",
    color: "#9F7AEA",
    emojis: ["😂", "💀", "🔥", "✨", "❤️", "🌙", "🫶", "💅", "👀", "😭", "🤩", "🫠"],
    vocabulary: ["Cooked", "Locked In", "Main Character", "Nahhh", "Delulu", "Aura Farming"]
  },
  chaos: {
    name: "chaos",
    color: "#E24B4A",
    emojis: ["🔥", "💀", "🚨", "⚡", "😈", "👹", "🌀", "💥", "🎭", "🤡", "😤", "🗡️"],
    vocabulary: ["Unhinged", "No chill", "Feral mode", "Send help", "It's giving", "Chaotic evil"]
  },
  romantic: {
    name: "romantic",
    color: "#D4537E",
    emojis: ["❤️", "🌹", "✨", "💕", "🥰", "💖", "🌸", "💌", "🫦", "💞", "🌷", "💫"],
    vocabulary: ["Miss u", "Thinking of u", "Soft life", "Aura farming", "Dreaming", "Heart eyes"]
  },
  sad: {
    name: "sad",
    color: "#378ADD",
    emojis: ["😭", "🌧/", "🧊", "💔", "🫂", "😢", "🖤", "🌫/", "💀", "😶", "🌊", "🥺"], // Clean emojis, removing slash indicators
    vocabulary: ["Not okay", "Heavy heart", "Quiet rn", "Give hugs", "Low battery", "Need a hug"]
  },
  hype: {
    name: "hype",
    color: "#EF9F27",
    emojis: ["🔥", "⚡", "🏆", "💪", "🎉", "🚀", "👑", "💯", "🎯", "🥳", "🙌", "✅"],
    vocabulary: ["Let's go!!", "W behavior", "Ate & left", "Era unlocked", "Top tier", "Bestieeee"]
  }
};

// Clean Sad emojis to bypass slash escapes:
moods.sad.emojis = ["😭", "🌧️", "🧊", "💔", "🫂", "😢", "🖤", "🌫️", "💀", "😶", "🌊", "🥺"];

export const keywordEmojiMap: Record<string, string> = {
  miss: "🥺😭💔🫂",
  love: "🥰❤️🫶💖",
  insane: "🤪🌀🧠💥",
  crazy: "🤯👽👹💥",
  tired: "🥱😴💤🔋",
  excited: "🤩🎉🥳🚀",
  sad: "😭💔🥶🌧️",
  happy: "😊✨☀️🙌",
  bored: "😐🙄🥱🌫️",
  angry: "😡😤🤬👿",
  fire: "🔥👑💯🏆",
  cooked: "💀🍳🫠❌",
  done: "🛑💆‍♂️🥱🏳️",
  wtf: "🤨👀❓🫨",
  cute: "🥺🐱🐾🌸",
  vibes: "✨🌙💅👀",
  winning: "🏆💯💪✅",
  cold: "🥶❄️🧊🌬️",
  hot: "🥵🔥🌶️☀️"
};

// Mood-matched auto-replies
export const autoReplies: Record<MoodType, string[]> = {
  vibe: [
    "No caps, real aura farming rn 😂✨",
    "Honestly, main character vibes only 💅",
    "Wait, is that delulu or are we locked in? 💀🫠",
    "Lmao literally me",
    "It's giving everything it needs to give 🫶"
  ],
  chaos: [
    "Feral mode fully activated 😈🔥",
    "Let the unhinged energy guide us 👹🌀",
    "No chill, absolute pure chaotic evil status ⚡🗡️",
    "Send help, it's starting 🚨💀",
    "This is why we can't have nice things lmao!"
  ],
  romantic: [
    "Omg thinking of u always 💕🌹",
    "My heart is literally doing backflips 🥰💖",
    "Entering soft life with you immediately 🌸🌷",
    "You give me the ultimate heart eyes 🫦💫",
    "Warmest hugs and starry dreams 🌙🥰"
  ],
  sad: [
    "Virtual hug incoming right now 🫂🥺",
    "Ugh, low battery today... quiet rn 😭🖤",
    "I'm here for you and heavy hearts together 💔🌧️",
    "Not okay but we will get through this 🧊🌫️",
    "Take it super easy, quiet time is okay 😶"
  ],
  hype: [
    "LET'S GOOO!!! absolute top tier behavior 🔥🚀",
    "Literally ate and left no crumbs 💯🏆",
    "A total and complete W!! 🙌🎉🎯",
    "New favorite era unlocked 👑⚡",
    "W behavior, bestie! 🎉✅"
  ]
};

// Emora Theme Presets
export const themePresets: ThemePreset[] = [
  {
    id: "minimal_dark",
    name: "Minimal Dark",
    background: "#09090B",
    backgroundSecondary: "#121215",
    surface: "#18181B",
    text: "#F4F4F5",
    textMuted: "#A1A1AA",
    border: "rgba(255, 255, 255, 0.08)",
    accent: "#F4F4F5",
    bubbleOut: "#27272A",
    bubbleIn: "#18181B",
    keyboardBackground: "#27272A",
    emojiGlow: "rgba(255, 255, 255, 0.15)",
    isDark: true
  },
  {
    id: "neon_pulse",
    name: "Neon Pulse",
    background: "#06040A",
    backgroundSecondary: "#0E0A1A",
    surface: "#140F26",
    text: "#D6C7FF",
    textMuted: "#8C7CB3",
    border: "rgba(168, 85, 247, 0.2)",
    accent: "#22C55E",
    bubbleOut: "#8B5CF6",
    bubbleIn: "#1E1B4B",
    keyboardBackground: "#1E1A3C",
    emojiGlow: "rgba(34, 197, 94, 0.3)",
    isDark: true
  },
  {
    id: "cherry_blossom",
    name: "Cherry Blossom",
    background: "#FFF5F7",
    backgroundSecondary: "#FFE4E9",
    surface: "#FFFFFF",
    text: "#4F1A2D",
    textMuted: "#9C6A7B",
    border: "rgba(212, 83, 126, 0.15)",
    accent: "#D4537E",
    bubbleOut: "#D4537E",
    bubbleIn: "#FFF0F3",
    keyboardBackground: "#FFF0F3",
    emojiGlow: "rgba(212, 83, 126, 0.2)",
    isDark: false
  },
  {
    id: "cyber_grid",
    name: "Cyber Grid",
    background: "#0A0E17",
    backgroundSecondary: "#101626",
    surface: "#161E33",
    text: "#38BDF8",
    textMuted: "#64748B",
    border: "rgba(56, 189, 248, 0.22)",
    accent: "#38BDF8",
    bubbleOut: "#0EA5E9",
    bubbleIn: "#1E293B",
    keyboardBackground: "#1E293B",
    emojiGlow: "rgba(56, 189, 248, 0.25)",
    isDark: true
  },
  {
    id: "warm_latte",
    name: "Warm Latte",
    background: "#FAF7F2",
    backgroundSecondary: "#EFEBE3",
    surface: "#FFFFFF",
    text: "#4A3B32",
    textMuted: "#8E7D72",
    border: "rgba(74, 59, 50, 0.1)",
    accent: "#B45309",
    bubbleOut: "#854D0E",
    bubbleIn: "#F5F5F4",
    keyboardBackground: "#F5F5F4",
    emojiGlow: "rgba(180, 83, 9, 0.15)",
    isDark: false
  },
  {
    id: "midnight_aura",
    name: "Midnight Aura",
    background: "#0D0C1F",
    backgroundSecondary: "#151336",
    surface: "#1D1A4C",
    text: "#E0E7FF",
    textMuted: "#818CF8",
    border: "rgba(99, 102, 241, 0.2)",
    accent: "#818CF8",
    bubbleOut: "#4F46E5",
    bubbleIn: "#1E1B4B",
    keyboardBackground: "#242054",
    emojiGlow: "rgba(129, 140, 248, 0.3)",
    isDark: true
  },
  {
    id: "glitch",
    name: "Glitch Brutalist",
    background: "#121212",
    backgroundSecondary: "#1A1A1A",
    surface: "#000000",
    text: "#FF0055",
    textMuted: "#AAAAAA",
    border: "rgba(255, 0, 85, 0.4)",
    accent: "#FF0055",
    bubbleOut: "#FF0055",
    bubbleIn: "#1A1A1A",
    keyboardBackground: "#111111",
    emojiGlow: "rgba(255, 0, 85, 0.35)",
    isDark: true
  },
  {
    id: "cloud_nine",
    name: "Cloud Nine",
    background: "#EDF8FF",
    backgroundSecondary: "#D8EEFF",
    surface: "#FFFFFF",
    text: "#1E40AF",
    textMuted: "#60A5FA",
    border: "rgba(96, 165, 250, 0.2)",
    accent: "#3B82F6",
    bubbleOut: "#3B82F6",
    bubbleIn: "#EFF6FF",
    keyboardBackground: "#EFF6FF",
    emojiGlow: "rgba(59, 130, 246, 0.18)",
    isDark: false
  }
];

// Beautiful high-quality royalty free mockup background representations
export interface WallpaperPreset {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  url: string;
  thumbnail: string;
  isAnimated?: boolean;
}

export const wallpaperPresets: WallpaperPreset[] = [
  // Anime
  {
    id: "wall-anime-1",
    name: "Cyberpunk Alleyway",
    category: "Anime",
    subcategory: "Cyberpunk anime",
    url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600",
    thumbnail: "💥"
  },
  {
    id: "wall-anime-2",
    name: "Warm Tea Room",
    category: "Anime",
    subcategory: "Chill lo-fi anime",
    url: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&q=80&w=600",
    thumbnail: "☕"
  },
  {
    id: "wall-anime-3",
    name: "Romantic Starlit Peak",
    category: "Anime",
    subcategory: "Romantic anime",
    url: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=600",
    thumbnail: "☄️"
  },
  {
    id: "wall-anime-4",
    name: "Neon Expressway",
    category: "Anime",
    subcategory: "Night city anime",
    url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&q=80&w=600",
    thumbnail: "🌃"
  },
  // Aesthetic
  {
    id: "wall-aes-1",
    name: "Soft Pastel Dreamscape",
    category: "Aesthetic",
    url: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=600",
    thumbnail: "🌸"
  },
  {
    id: "wall-aes-2",
    name: "Prism Rainbow Glass",
    category: "Aesthetic",
    url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600",
    thumbnail: "🌈"
  },
  // Dark
  {
    id: "wall-dark-1",
    name: "Obsidian Topography",
    category: "Dark",
    url: "https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&q=80&w=600",
    thumbnail: "🌚"
  },
  // Neon
  {
    id: "wall-neon-1",
    name: "Retro Glowwave Grid",
    category: "Neon",
    url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=600",
    thumbnail: "⚡"
  },
  // Minimalist
  {
    id: "wall-min-1",
    name: "Pristine Ceramic White",
    category: "Minimalist",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
    thumbnail: "⬜"
  }
];

// Presets for initial statuses
import { StatusUpdate, CallRecord, MoodRoom } from "./types";

export const initialStatuses: StatusUpdate[] = [
  {
    id: "status-user",
    displayName: "Me (My Status)",
    avatarCombo: "🔥✨",
    timestamp: "Just now",
    content: "Main character energy activated in Emora v3! 👾",
    color: "#9F7AEA",
    font: "Space Grotesk",
    hasSeen: true,
    reactions: { "🔥": 2, "😎": 1 }
  },
  {
    id: "status-1",
    displayName: "Lily ❤️",
    avatarCombo: "❤️🌹",
    timestamp: "12 mins ago",
    content: "I've been dreaming of soft spring air and cute tea parties... 🌸🥐",
    color: "#D4537E",
    font: "serif",
    hasSeen: false,
    reactions: { "🥰": 3, "❤️": 2 },
    songName: "Cruel Summer - Taylor Swift"
  },
  {
    id: "status-2",
    displayName: "Alex 💀",
    avatarCombo: "💀😂",
    timestamp: "1 hr ago",
    content: "WHO THOUGHT COOKING A 4-COURSE MEAL AT 2AM WAS SMART. I am literally dead.",
    color: "#E24B4A",
    font: "monospace",
    hasSeen: false,
    reactions: { "😂": 8, "💀": 4 },
    songName: "Midnight City - M83"
  },
  {
    id: "status-3",
    displayName: "Kobe ⚡",
    avatarCombo: "⚡💪",
    timestamp: "4 hrs ago",
    content: "ERA UNLOCKED! Just beat my personal gym record! Let's goooo!",
    color: "#EF9F27",
    font: "sans-serif",
    hasSeen: true,
    reactions: { "🏆": 4, "💪": 3 }
  }
];

// Presets for initial calls
export const initialCalls: CallRecord[] = [
  {
    id: "call-1",
    displayName: "Emmy ✨",
    avatarCombo: "🔥✨",
    timestamp: "Today, 10:15 AM",
    type: "voice",
    status: "incoming",
    emotionLabel: "🔥 hyped energy"
  },
  {
    id: "call-2",
    displayName: "Alex 💀",
    avatarCombo: "💀😂",
    timestamp: "Yesterday, 8:40 PM",
    type: "video",
    status: "missed",
    emotionLabel: "💀 unhinged humor"
  },
  {
    id: "call-3",
    displayName: "Lily 🌹",
    avatarCombo: "❤️🌹",
    timestamp: "Yesterday, 3:12 PM",
    type: "voice",
    status: "outgoing",
    emotionLabel: "❤️ romantic & soft"
  },
  {
    id: "call-4",
    displayName: "Quiet Mode",
    avatarCombo: "🧊😶",
    timestamp: "May 20, 11:30 AM",
    type: "voice",
    status: "incoming",
    emotionLabel: "😭 low battery / sad"
  }
];

// Presets for joinable Mood groups (communities)
export const initialRooms: MoodRoom[] = [
  {
    id: "room-late",
    name: "Late Night Thoughts",
    avatarEmoji: "🌙",
    memberCount: 2404,
    badge: "vibe",
    votersCount: 382
  },
  {
    id: "room-heart",
    name: "Heartbreak Room",
    avatarEmoji: "💔",
    memberCount: 1205,
    badge: "sad",
    votersCount: 198
  },
  {
    id: "room-chaos",
    name: "Chaos Room",
    avatarEmoji: "🔥",
    memberCount: 4890,
    badge: "chaos",
    votersCount: 912
  },
  {
    id: "room-best",
    name: "Meme Room",
    avatarEmoji: "💀",
    memberCount: 8840,
    badge: "hype",
    votersCount: 1405
  },
  {
    id: "room-soft",
    name: "Soft Life Room",
    avatarEmoji: "✨",
    memberCount: 3122,
    badge: "romantic",
    votersCount: 420
  }
];

