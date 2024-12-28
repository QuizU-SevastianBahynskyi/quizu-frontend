"use client";

import { useEffect } from "react";
import { themeChange } from "theme-change";

export const ThemeInitializer = () => {
  useEffect(() => {
    themeChange(false); // Initialize the themeChange library
  }, []);

  return null; // No visible UI component is rendered
};
