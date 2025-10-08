"use client";

import React from 'react';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeToggle = ({className} : {className?: string}) => {
  const { theme, setTheme } = useTheme();

  // 👇 wait until mounted before reading theme
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Avoid rendering mismatched icons on server
    return (
      <Button variant="outline" size="icon">
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`${className}`}
    >
      <Sun
        className={`${theme === 'dark'
          ? 'scale-100 rotate-0'
          : 'scale-0 -rotate-90'
          } h-[1.2rem] w-[1.2rem] transition-all`}
      />
      <Moon
        className={`${theme === 'light'
          ? 'scale-100 rotate-0'
          : 'scale-0 -rotate-90'
          } absolute h-[1.2rem] w-[1.2rem] transition-all`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
