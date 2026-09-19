"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

type Theme = "dark" | "light" | "system";

interface ThemeContextType {
    theme: Theme;
    setDark: () => void;
    setLight: () => void;
    setSystem: () => void;
    systemTheme: "dark" | "light";
}

const ThemeContext = createContext<
    ThemeContextType | undefined
>(undefined);

export function ThemeProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [theme, setTheme] = useState<Theme>("system");
    const [systemTheme, setSystemTheme] =
        useState<"dark" | "light">("dark");

    // detect system theme
    useEffect(() => {
        const media = window.matchMedia(
            "(prefers-color-scheme: dark)"
        );

        const updateSystemTheme = () => {
            setSystemTheme(media.matches ? "dark" : "light");
        };

        updateSystemTheme();

        media.addEventListener("change", updateSystemTheme);

        return () =>
            media.removeEventListener(
                "change",
                updateSystemTheme
            );
    }, []);

    // load saved theme
    useEffect(() => {
        const savedTheme = localStorage.getItem(
            "theme"
        ) as Theme | null;

        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            applyTheme("system");
        }
    }, []);

    const applyTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        document.documentElement.classList.remove(
            "light",
            "dark"
        );

        if (newTheme === "system") {
            const current = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
                ? "dark"
                : "light";

            document.documentElement.classList.add(current);
        } else {
            document.documentElement.classList.add(newTheme);
        }
    };

    useEffect(() => {
        if (theme === "system") {
            document.documentElement.classList.remove(
                "light",
                "dark"
            );
            document.documentElement.classList.add(systemTheme);
        }
    }, [systemTheme, theme]);

    const setDark = () => applyTheme("dark");
    const setLight = () => applyTheme("light");
    const setSystem = () => applyTheme("system");

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setDark,
                setLight,
                setSystem,
                systemTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            "useTheme must be used inside ThemeProvider"
        );
    }

    return context;
}