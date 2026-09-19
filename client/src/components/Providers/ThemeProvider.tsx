"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";


type Theme = "dark" | "light" ;

interface ThemeContextType {
    theme: Theme;
    setDark: () => void;
    setLight: () => void;
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
    const [theme] = useState<Theme>("light");
    const [systemTheme] = useState<"dark" | "light">("light");

    // Always force light mode
    useEffect(() => {
        document.documentElement.classList.remove("dark", "system");
        document.documentElement.classList.add("light");
        localStorage.setItem("theme", "light");
    }, []);

    const setDark = () => {};
    const setLight = () => {};

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setDark,
                setLight,
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