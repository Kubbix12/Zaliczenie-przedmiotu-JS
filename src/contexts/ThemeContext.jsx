import { createContext, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const[theme, setTheme] = useLocalStorageState('theme', 
        {
            defaultValue: 'light'
        }
    );
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeProvider };