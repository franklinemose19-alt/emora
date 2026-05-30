import React, { useState } from "react";
import {
  Sparkles,
  Heart,
  Smile,
  Send,
  Flame,
  Moon,
  Sun,
  Layout,
  Music,
  Image as ImageIcon,
  Compass,
  Zap,
  RotateCcw,
  Volume2
} from "lucide-react";
import { MoodType, UserProfile, ThemePreset, WallpaperState } from "../types";
import { moods, themePresets, wallpaperPresets } from "../data";

interface SidebarProps {
  activeMood: MoodType;
  setActiveMood: (mood: MoodType) => void;
  onSendEmojiSequence: (emojis: string) => void;
  spawnEmojis: (emoji: string) => void;
  
  // Custom synced properties for Emora control panel
  currentTheme: ThemePreset;
  onChangeTheme: (theme: ThemePreset) => void;
  currentWallpaper: WallpaperState;
  onChangeWallpaper: (wall: WallpaperState) => void;
  userProfile: UserProfile;
  onChangeProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export default function Sidebar({
  activeMood,
  setActiveMood,
  onSendEmojiSequence,
  spawnEmojis,
  currentTheme,
  onChangeTheme,
  currentWallpaper,
  onChangeWallpaper,
  userProfile,
  onChangeProfile
}: SidebarProps) {
  const [translatorInput, setTranslatorInput] = useState("");
  const [translatedResult, setTranslatedResult] = useState("");
  const [translating, setTranslating] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  // Custom static pasteboard for custom wallpaper link
  const [customWallUrl, setCustomWallUrl] = useState("");

  const quickReactionsMap: Record<MoodType, string[]> = {
    vibe: ["😂💀🔥👀", "🫶💅👀💀", "😂😭🤩🫠", "💀🔥✨🫶"],
    chaos: ["🔥💀🚨⚡", "😈👹🌀💥", "🎭🤡😤🗡️", "🚨🤡💀💥"],
    romantic: ["❤️🌹✨💕", "🥰💖🌸💌", "🫦💞🌷💫", "🥰💖🌹💕"],
    sad: ["😭🌧️🧊💔", "🫂😢🖤🌫️", "💀😶🌊🥺", "🥺💔😭🌧️"],
    hype: ["🔥⚡🏆💪", "🎉🚀👑💯", "🎯🥳🙌✅", "👑💯🏆🚀"]
  };

  const handleTranslate = async () => {
    if (!translatorInput.trim()) return;
    setTranslating(true);
    setErrorStatus(null);
    setTranslatedResult("");

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: translatorInput }),
      });

      if (response.ok) {
        const data = await response.json();
        setTranslatedResult(data.emojis || "✨📱💬");
      } else {
        const errData = await response.json();
        throw new Error(errData.error || "Server error");
      }
    } catch (err: any) {
      console.error("AI Translator offline, running fallback:", err);
      // Fallback
      const textVal = translatorInput.toLowerCase();
      let fallbackEmojis = "";
      if (textVal.includes("love") || textVal.includes("like")) fallbackEmojis = "💖🥰🫶❤️";
      else if (textVal.includes("sad") || textVal.includes("cry")) fallbackEmojis = "😭🌧️💔🥺";
      else if (textVal.includes("angry") || textVal.includes("hate")) fallbackEmojis = "😡😤🤬👿";
      else if (textVal.includes("fire") || textVal.includes("hype") || textVal.includes("lit")) fallbackEmojis = "🔥⚡🏆💪";
      else {
        const activeEmojis = moods[activeMood].emojis;
        const shuffled = [...activeEmojis].sort(() => 0.5 - Math.random());
        fallbackEmojis = shuffled.slice(0, 4).join("");
      }
      setTranslatedResult(fallbackEmojis);
      setErrorStatus("API offline, activated smart offline translation generator.");
    } finally {
      setTranslating(false);
    }
  };

  const handleRewriteEnhance = async () => {
    if (!translatorInput.trim()) return;
    setTranslating(true);
    setErrorStatus(null);
    setTranslatedResult("");

    try {
      const response = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: translatorInput, mood: activeMood }),
      });

      if (response.ok) {
        const data = await response.json();
        setTranslatedResult(data.enhanced || translatorInput);
      } else {
        throw new Error("Server error");
      }
    } catch (err: any) {
      // Local fallback
      let fallbackText = translatorInput;
      const lower = translatorInput.toLowerCase();
      if (lower.includes("meeting") || lower.includes("work") || lower.includes("long")) {
        fallbackText = translatorInput.replace(/meeting|work|long/i, (match) => `${match} 💀`) + " 🫨";
      } else if (lower.includes("miss") || lower.includes("love") || lower.includes("heart")) {
        fallbackText = translatorInput.replace(/miss|love|heart/i, (match) => `${match} ❤️`) + " 🥺";
      } else if (lower.includes("excit") || lower.includes("yay") || lower.includes("cool")) {
        fallbackText = translatorInput.replace(/excited|excit|yay|cool/i, (match) => `${match} ✨`) + " 🔥";
      } else {
        fallbackText = `${translatorInput} ✨`;
      }
      setTranslatedResult(fallbackText);
      setErrorStatus("Smart offline emoji-weaver helper active.");
    } finally {
      setTranslating(false);
    }
  };

  const handleSendToChat = () => {
    if (!translatedResult) return;
    onSendEmojiSequence(translatedResult);
    const textArray = Array.from(translatedResult) as string[];
    textArray.forEach((char, index) => {
      setTimeout(() => {
        spawnEmojis(char);
      }, index * 90);
    });
  };

  const handleQuickReactionTap = (combo: string) => {
    onSendEmojiSequence(combo);
    const textArray = Array.from(combo) as string[];
    textArray.forEach((char, index) => {
      setTimeout(() => {
        spawnEmojis(char);
      }, index * 90);
    });
  };

  // Paste custom mock wallpaper uploader
  const handlePickCustomWallpaper = () => {
    if (!customWallUrl.trim()) return;
    onChangeWallpaper({
      category: "My uploads",
      url: customWallUrl,
      isAnimated: true,
      reactiveEnabled: true,
      blur: currentWallpaper.blur,
      brightness: currentWallpaper.brightness,
      name: "Custom pasted URL"
    });
    setCustomWallUrl("");
    spawnEmojis("🎨");
  };

  return (
    <div id="sidebar-container" className="flex-1 flex flex-col gap-5 select-none" style={{ minWidth: "280px" }}>
      
      {/* Utility Panel header */}
      <div className="flex justify-between items-center p-3 px-4.5 bg-white dark:bg-zinc-900 border rounded-2xl" style={{ borderColor: currentTheme.border }}>
        <div className="flex items-center gap-2">
          <div className="w-5.5 h-5.5 rounded-md bg-purple-500/10 flex items-center justify-center font-bold text-xs text-purple-500">
            ✨
          </div>
          <span className="text-[12.5px] font-bold" style={{ color: currentTheme.text }}>Emora Center Command</span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-500 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded-full">
          v3 Ready
        </span>
      </div>

      {/* CARD 1: EXQUISITE THEME BROWSER GRID */}
      <div className="bg-white dark:bg-zinc-900 border p-4 rounded-2xl flex flex-col gap-3" style={{ borderColor: currentTheme.border }}>
        <div className="flex justify-between items-center pb-2 border-b" style={{ borderColor: currentTheme.border }}>
          <div className="flex items-center gap-1.5">
            <Layout size={13} className="text-purple-500" />
            <h3 className="text-xs font-bold uppercase tracking-wide" style={{ color: currentTheme.text }}>Theme Engine Browser</h3>
          </div>
          <span className="text-[9.5px] text-zinc-400 font-mono">8 presets</span>
        </div>

        <div className="grid grid-cols-2 gap-2 max-h-[145px] overflow-y-auto pr-1">
          {themePresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onChangeTheme(preset)}
              className={`p-2 rounded-xl text-left border-[0.5px] transition hover:scale-98 active:scale-95 flex flex-col justify-between h-14 relative ${currentTheme.id === preset.id ? 'ring-2 ring-purple-500/30' : ''}`}
              style={{
                background: preset.surface,
                borderColor: currentTheme.id === preset.id ? "#9F7AEA" : currentTheme.border,
              }}
            >
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: preset.accent }} />
                <span className="text-[10px] font-extrabold truncate" style={{ color: preset.text }}>
                  {preset.name}
                </span>
              </div>
              <div className="flex gap-0.5 mt-1">
                <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: preset.background }} />
                <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: preset.bubbleOut }} />
                <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: preset.bubbleIn }} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CARD 2: AI EXPRESSION KEYBOARD CONTROLS */}
      <div className="bg-white dark:bg-zinc-900 border p-4 rounded-2xl flex flex-col gap-3" style={{ borderColor: currentTheme.border }}>
        <div className="flex justify-between items-center pb-2 border-b" style={{ borderColor: currentTheme.border }}>
          <div className="flex items-center gap-1.5">
            <Sparkles size={13} className="text-pink-500" />
            <h3 className="text-xs font-bold uppercase tracking-wide" style={{ color: currentTheme.text }}>AI Expression Keyboard</h3>
          </div>
          <span className="text-[10px] bg-purple-50 dark:bg-purple-950/20 px-1.5 py-0.5 rounded text-purple-600 font-bold select-none">AI Smart Modes</span>
        </div>

        <textarea
          value={translatorInput}
          onChange={(e) => setTranslatorInput(e.target.value)}
          placeholder="Type messages... (e.g. 'i love you so much let us hang')"
          className="w-full p-2.5 text-xs rounded-xl focus:outline-hidden border h-18 resize-none decoration-transparent"
          style={{ background: currentTheme.background, borderColor: currentTheme.border, color: currentTheme.text }}
        />

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleTranslate}
            disabled={translating || !translatorInput.trim()}
            className="py-1.5 px-2 text-[10.5px] font-bold text-white rounded-xl hover:opacity-95 transition disabled:opacity-50"
            style={{ backgroundColor: "#9F7AEA" }}
          >
            {translating ? "Translating..." : "Translate Emojis 💬"}
          </button>
          <button
            onClick={handleRewriteEnhance}
            disabled={translating || !translatorInput.trim()}
            className="py-1.5 px-2 text-[10.5px] font-bold text-purple-600 bg-purple-500/10 hover:bg-purple-500/15 transition disabled:opacity-50 rounded-xl"
            style={{ color: "#9F7AEA" }}
          >
            ✨ Emoji-Weave
          </button>
        </div>

        {translatedResult && (
          <div className="mt-1 p-3 bg-zinc-50 dark:bg-zinc-800 border rounded-xl flex flex-col items-center gap-2">
            <span className="text-[9px] uppercase font-bold text-zinc-400">Result</span>
            <div className="text-xl font-mono text-zinc-800 dark:text-white font-extrabold pb-1">
              {translatedResult}
            </div>
            {errorStatus && (
              <span className="text-[9px] text-purple-500 font-bold block">{errorStatus}</span>
            )}
            <button
              onClick={handleSendToChat}
              className="w-full py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 font-bold text-xs rounded-lg transition"
              style={{ color: "#9F7AEA" }}
            >
              Send to Chat thread 🚀
            </button>
          </div>
        )}
      </div>

      {/* CARD 3: RECT-CHATS ACTIVE VIBE SYNCER */}
      <div className="bg-white dark:bg-zinc-900 border p-4 rounded-2xl flex flex-col gap-3" style={{ borderColor: currentTheme.border }}>
        <div className="flex items-center gap-1.5 pb-2 border-b" style={{ borderColor: currentTheme.border }}>
          <Smile size={13} className="text-green-500" />
          <h3 className="text-xs font-bold uppercase tracking-wide" style={{ color: currentTheme.text }}>Vibe Syncer Panel</h3>
        </div>

        <div className="grid grid-cols-5 gap-1.5 select-none">
          {(Object.keys(moods) as MoodType[]).map((mName) => {
            const mData = moods[mName];
            const isSelected = activeMood === mName;
            return (
              <button
                key={mName}
                onClick={() => {
                  setActiveMood(mName);
                  spawnEmojis(mData.emojis[0]);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[13px] transition ${isSelected ? 'ring-2 ring-purple-500/35 border-purple-500' : 'bg-transparent'}`}
                style={{
                  borderColor: isSelected ? mData.color : currentTheme.border,
                  backgroundColor: isSelected ? `${mData.color}15` : "transparent"
                }}
              >
                <span>{mData.emojis[0]}</span>
                <span className="text-[8px] font-extrabold uppercase mt-1" style={{ color: isSelected ? mData.color : currentTheme.textMuted }}>
                  {mName}
                </span>
                {isSelected && (
                  <span className="text-[7px] text-purple-600 font-bold block text-center leading-none mt-0.5">ON</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* CARD 4: MOCK WALLPAPER UPLOADER / CROPS */}
      <div className="bg-white dark:bg-zinc-900 border p-4 rounded-2xl flex flex-col gap-2.5" style={{ borderColor: currentTheme.border }}>
        <div className="flex items-center gap-1.5 pb-2 border-b" style={{ borderColor: currentTheme.border }}>
          <ImageIcon size={13} className="text-teal-500" />
          <h3 className="text-xs font-bold uppercase tracking-wide" style={{ color: currentTheme.text }}>Upload Mock Wallpaper</h3>
        </div>

        <p className="text-[10px] leading-tight" style={{ color: currentTheme.textMuted }}>
          Paste Unsplash urls to test custom crop, blurs, and light reactive overlays:
        </p>

        <div className="space-y-2">
          <input
            type="text"
            value={customWallUrl}
            onChange={(e) => setCustomWallUrl(e.target.value)}
            placeholder="Paste high quality image URL..."
            className="w-full text-xs p-2 rounded-lg border focus:outline-hidden"
            style={{ background: currentTheme.background, borderColor: currentTheme.border, color: currentTheme.text }}
          />
          <div className="flex gap-1.5">
            <button
              onClick={() => {
                setCustomWallUrl("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600");
              }}
              className="text-[9px] font-bold text-zinc-500 bg-zinc-50 dark:bg-zinc-800 p-1.5 rounded-lg border"
              style={{ borderColor: currentTheme.border }}
            >
              Use Abstract template
            </button>
            <button
              onClick={handlePickCustomWallpaper}
              disabled={!customWallUrl.trim()}
              className="flex-1 py-1.5 bg-teal-500 text-white font-bold text-xs rounded-lg transition hover:bg-teal-600 disabled:opacity-50"
            >
              Upload / Crop ✂️
            </button>
          </div>
        </div>
      </div>

      {/* CARD 5: QUICK REACTION COMBO MATRIX */}
      <div className="bg-white dark:bg-zinc-900 border p-4 rounded-2xl flex flex-col gap-2.5" style={{ borderColor: currentTheme.border }}>
        <div className="flex items-center gap-1.5 pb-2" style={{ borderColor: currentTheme.border }}>
          <Flame size={13} className="text-amber-500" />
          <h3 className="text-xs font-bold uppercase tracking-wide" style={{ color: currentTheme.text }}>Quick Burst Combos</h3>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {quickReactionsMap[activeMood].map((combo, idx) => (
            <button
              key={`${combo}-${idx}`}
              onClick={() => handleQuickReactionTap(combo)}
              className="p-1 px-1.5 border rounded-lg hover:opacity-85 text-center text-[11px] font-bold select-none active:scale-95"
              style={{ borderColor: moods[activeMood].color, color: currentTheme.text }}
            >
              {combo}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
