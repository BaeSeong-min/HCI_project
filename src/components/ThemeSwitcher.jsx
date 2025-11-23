import React, { useState, useEffect } from "react";
import "./ThemeSwitcher.css";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  const isLight = theme === "light";

  return (
    <button
      className="theme-button"
      onClick={toggleTheme}
      aria-label={`Change ${isLight ? "dark" : "light"} theme`}
    >
      {isLight ? <FiMoon size={20} /> : <FiSun size={20} />}
    </button>
  );
};

export default ThemeSwitcher;
