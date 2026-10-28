import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export interface ThemeToggleProps {
  variant?: 'icon' | 'segmented' | 'switch';
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'icon',
  className = '',
  showLabel = false,
}) => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  if (variant === 'segmented') {
    return (
      <div 
        role="group" 
        aria-label="Theme selection" 
        className={`inline-flex items-center p-1 rounded-xl bg-[#F4F2EC] border border-[#E6E3DC] ${className}`}
      >
        <button
          type="button"
          onClick={() => setTheme('light')}
          aria-pressed={theme === 'light'}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] cursor-pointer ${
            theme === 'light'
              ? 'bg-[#FFFFFF] text-[#15171A] shadow-xs'
              : 'text-[#4B525C] hover:text-[#15171A]'
          }`}
        >
          <Sun className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Light</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('dark')}
          aria-pressed={theme === 'dark'}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] cursor-pointer ${
            theme === 'dark'
              ? 'bg-[#FFFFFF] text-[#15171A] shadow-xs'
              : 'text-[#4B525C] hover:text-[#15171A]'
          }`}
        >
          <Moon className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Dark</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('system')}
          aria-pressed={theme === 'system'}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] cursor-pointer ${
            theme === 'system'
              ? 'bg-[#FFFFFF] text-[#15171A] shadow-xs'
              : 'text-[#4B525C] hover:text-[#15171A]'
          }`}
        >
          <Laptop className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Auto</span>
        </button>
      </div>
    );
  }

  if (variant === 'switch') {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        onClick={toggleTheme}
        className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors bg-[#F4F2EC] hover:bg-[#E6E3DC] text-[#15171A] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] ${className}`}
      >
        <span className="flex items-center gap-2">
          {isDark ? (
            <Moon className="w-4 h-4 text-[#8AB4F8]" aria-hidden="true" />
          ) : (
            <Sun className="w-4 h-4 text-[#F9AB00]" aria-hidden="true" />
          )}
          <span>{isDark ? 'Dark Theme' : 'Light Theme'}</span>
        </span>
        <div className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${isDark ? 'bg-[#1A73E8]' : 'bg-[#D1CDC2]'}`}>
          <span
            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
              isDark ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </div>
      </button>
    );
  }

  // Default 'icon' button variant (standard top bar header toggle)
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`p-2 rounded-lg text-[#4B525C] hover:text-[#15171A] bg-[#FFFFFF] border border-[#E6E3DC] hover:border-[#D1CDC2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] cursor-pointer flex items-center gap-1.5 shadow-2xs ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <Sun 
          className={`w-4 h-4 text-[#F9AB00] transition-all duration-300 absolute inset-0 ${
            isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-50 pointer-events-none'
          }`} 
          aria-hidden="true" 
        />
        <Moon 
          className={`w-4 h-4 text-[#4B525C] transition-all duration-300 absolute inset-0 ${
            !isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-90 scale-50 pointer-events-none'
          }`} 
          aria-hidden="true" 
        />
      </div>
      {showLabel && (
        <span className="text-xs font-semibold text-[#15171A]">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};
