"use client";

import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// Define types for theme and update functions
interface Theme {
  main: string;
  sidebar: string;
  sidenav: string;
  sidebarVisibility: boolean;
  sidebarMobile: boolean;
  header: string;
  skin: string;
}

interface ThemeUpdate {
  uistyle: (value: string) => void;
  sidebar: (value: string) => void;
  sidenav: (value: string) => void;
  sidebarVisibility: () => void;
  sidebarHide: () => void;
  header: (value: string) => void;
  skin: (value: string) => void;
  reset: () => void;
}

const defaultTheme: Theme = {
  main: "default", // other values: "softy"
  sidebar: "white", // other values: "light", "dark", "theme"
  sidenav: "light", // other values: "theme", "white", "dark"
  sidebarVisibility: false,
  sidebarMobile: false,
  header: "white", // other values: "light", "dark", "theme"
  skin: "light", // other value: "dark"
};

// Create contexts with default values
const ThemeContext = createContext<Theme>(defaultTheme);
const ThemeUpdateContext = createContext<ThemeUpdate>({
  uistyle: (value: string) => {},
  sidebar: (value: string) => {},
  sidenav: (value: string) => {},
  sidebarVisibility: () => {},
  sidebarHide: () => {},
  header: (value: string) => {},
  skin: (value: string) => {},
  reset: () => {},
});

// Custom hooks for accessing theme context
export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}

// Define the props for the ThemeProvider
interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const defaultTheme: Theme = {
    main: "default", // other values: "softy"
    sidebar: "white", // other values: "light", "dark", "theme"
    sidenav: "light", // other values: "theme", "white", "dark"
    sidebarVisibility: false,
    sidebarMobile: false,
    header: "white", // other values: "light", "dark", "theme"
    skin: "light", // other value: "dark"
  };

  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const themeUpdate: ThemeUpdate = {
    uistyle: (value: string) => {
      setTheme((prevTheme) => ({ ...prevTheme, main: value }));
    },
    sidebar: (value: string) => {
      setTheme((prevTheme) => ({ ...prevTheme, sidebar: value }));
    },
    sidenav: (value: string) => {
      setTheme((prevTheme) => ({ ...prevTheme, sidenav: value }));
    },
    sidebarVisibility: () => {
      setTheme((prevTheme) => ({
        ...prevTheme,
        sidebarVisibility: !prevTheme.sidebarVisibility,
      }));
    },
    sidebarHide: () => {
      setTheme((prevTheme) => ({ ...prevTheme, sidebarVisibility: false }));
    },
    header: (value: string) => {
      setTheme((prevTheme) => ({ ...prevTheme, header: value }));
    },
    skin: (value: string) => {
      setTheme((prevTheme) => ({ ...prevTheme, skin: value }));
    },
    reset: () => {
      setTheme((prevTheme) => ({
        ...prevTheme,
        main: defaultTheme.main,
        sidebar: defaultTheme.sidebar,
        sidenav: defaultTheme.sidenav,
        skin: defaultTheme.skin,
      }));
    },
  };

  // const bodyClass = classNames({
  //   "nk-body ui-rounder has-sidebar has-touch nk-nio-theme": true,
  // });

  // useEffect(() => {
  //   const body = document.querySelector("body");
  //   if (body) {
  //     body.className = bodyClass;
  //   }
  // }, [bodyClass]);

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      if (theme.main === "default") {
        body.classList.add("ui-default");
        body.classList.remove("ui-softy");
      }
      if (theme.main === "softy") {
        body.classList.add(`ui-softy`);
        body.classList.remove("ui-default");
      }
      if (theme.skin === "dark") {
        body.classList.add(`dark-mode`);
      } else {
        body.classList.remove("dark-mode");
      }
      if (theme.sidebarVisibility) {
        body.classList.add("nav-shown");
      } else {
        body.classList.remove("nav-shown");
      }
    }
  }, [theme]);

  useEffect(() => {
    const handleMobileSidebar = () => {
      if (window.innerWidth < 1200) {
        setTheme((prevTheme) => ({ ...prevTheme, sidebarMobile: true }));
      } else {
        setTheme((prevTheme) => ({
          ...prevTheme,
          sidebarMobile: false,
          sidebarVisibility: false,
        }));
      }
    };

    handleMobileSidebar();
    window.addEventListener("resize", handleMobileSidebar);
    return () => {
      window.removeEventListener("resize", handleMobileSidebar);
    };
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeUpdateContext.Provider value={themeUpdate}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
