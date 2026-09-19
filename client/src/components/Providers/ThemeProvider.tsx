"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";


type Theme = "light" ;

interface ThemeContextType {
    theme: Theme;
    setLight: () => void;
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
        document.documentElement.classList.add("light");
        localStorage.setItem("theme", "light");
    }, []);

    const setLight = () => {};

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setLight,
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