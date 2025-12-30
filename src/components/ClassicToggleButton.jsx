import "@theme-toggles/react/css/Classic.css"
import { Classic } from "@theme-toggles/react"
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function ClassicToggleButton() {

    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <>
            <Classic duration={750}
                    style = {
                        {   
                            color: theme === "light" ? 'blue' : 'yellow',
                            backgroundColor: "var(--background-color)",
                            fontSize: "1.5em"
                        }
                    }

                    toggled={theme === 'light'}
                    toggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
        </>
    );
}

export default ClassicToggleButton