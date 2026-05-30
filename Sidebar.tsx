@import 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap';
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Space Grotesk", sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
  
  --color-purple-accent: #9F7AEA;
  --color-chaos-accent: #E24B4A;
  --color-romantic-accent: #D4537E;
  --color-sad-accent: #378ADD;
  --color-hype-accent: #EF9F27;
}

:root {
  --color-background: #F4F4F7;
  --color-background-secondary: #E9EAF0;
  --color-surface: #FFFFFF;
  --color-text: #1A1A1A;
  --color-text-muted: #6B7280;
  --color-border: rgba(0, 0, 0, 0.08);
  --color-chat-bubble-incoming: #FFFFFF;
  --color-phone-border: #000000;
  --color-card-border: rgba(0, 0, 0, 0.08);
}

.dark {
  --color-background: #0E0E11;
  --color-background-secondary: #19191D;
  --color-surface: #1E1E22;
  --color-text: #F4F4F7;
  --color-text-muted: #9CA3AF;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-chat-bubble-incoming: #28282C;
  --color-phone-border: #000000;
  --color-card-border: rgba(255, 255, 255, 0.08);
}

body {
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-sans);
  transition: background-color 0.2s ease, color 0.2s ease;
}

/* Animations */
@keyframes floatUp {
  0% {
    transform: translateY(0) scale(0.6) rotate(0deg);
    opacity: 0;
  }
  15% {
    opacity: 1;
    transform: translateY(-20px) scale(1.1) rotate(5deg);
  }
  100% {
    transform: translateY(-150px) scale(0.8) rotate(-15deg);
    opacity: 0;
  }
}

.animate-float-particle {
  animation: floatUp 1.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

@keyframes pulseDot {
  0%, 100% {
    transform: scale(0.8);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

.animate-pulse-dot {
  animation: pulseDot 1s infinite ease-in-out;
}

/* Utilities */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Base custom definitions */
.phone-mockup {
  width: 355px;
  height: 710px;
  border-radius: 32px;
  background-color: var(--color-surface);
  border: 10px solid var(--color-phone-border);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
