import styles from './ThemeToggleButton.module.css'
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function ThemeToggleButton() {

    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <>
            <button className={styles.toggleButton} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ? 'Dark' : 'Light'}</button>
        </>
    );
}

export default ThemeToggleButton