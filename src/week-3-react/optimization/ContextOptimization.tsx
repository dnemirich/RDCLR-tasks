import {createContext, type Dispatch, type ReactNode, type SetStateAction, useContext, useState} from "react";
import {useRenderCount} from "./utils.tsx";

type ThemeContextType = {
    theme: string;
    setTheme: Dispatch<SetStateAction<string>>;
};

const ThemeContext = createContext<ThemeContextType>({
    theme: "light", setTheme: () => {
    }
});

export const BadContextExample = () => {
    const [theme, setTheme] = useState("light");

    useRenderCount("BadContextExample");

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <div>
                <h2>Bad context</h2>
                <Panel/>
                <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                    Toggle Theme
                </button>
            </div>
        </ThemeContext.Provider>
    );
};

const Panel = () => {
    useRenderCount("Bad Panel");
    return (
        <div>
            <ThemeConsumer/>
            <UnrelatedComponent/>
        </div>
    );
};

const ThemeConsumer = () => {
    useRenderCount("Bad ThemeConsumer");
    const {theme} = useContext(ThemeContext);
    return <div style={{width: "40px", height: "40px", background: theme === "light" ? "orange" : "gray"}}></div>;
};

const UnrelatedComponent = () => {
    useRenderCount("Bad UnrelatedComponent");
    return <p>Irrelevant to the theme component</p>;
};


// --------------------------------------------------------------

const ThemeValueContext = createContext<string>("light");
const ThemeUpdateContext = createContext<Dispatch<SetStateAction<string>>>(() => {
});

const ThemeProvider = ({children}: { children: ReactNode }) => {
    const [theme, setTheme] = useState("light");

    return (
        <ThemeValueContext.Provider value={theme}>
            <ThemeUpdateContext.Provider value={setTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeValueContext.Provider>)
}

const useTheme = () => useContext(ThemeValueContext);
const useSetTheme = () => useContext(ThemeUpdateContext);

export const GoodContextExample = () => {
    useRenderCount("GoodContextExample");

    return (
        <ThemeProvider>
            <div>
                <h2>Good context</h2>
                <GoodPanel/>
                <ButtonToggler/>
            </div>
        </ThemeProvider>
    );
};

const ButtonToggler = () => {
    const setTheme = useSetTheme();
    useRenderCount("Good ButtonToggler");

    return (
        <button onClick={() => setTheme((theme) => theme === "light" ? "dark" : "light")}>
            Toggle Theme
        </button>
    )
}

const GoodPanel = () => {
    useRenderCount("GoodPanel");
    return (
        <div>
            <GoodThemeConsumer/>
            <GoodUnrelatedComponent/>
        </div>
    );
};

const GoodThemeConsumer = () => {
    useRenderCount("GoodThemeConsumer");
    const theme = useTheme();
    return <div style={{width: "40px", height: "40px", background: theme === "light" ? "orange" : "gray"}}></div>;
};

const GoodUnrelatedComponent = () => {
    useRenderCount("GoodUnrelatedComponent");
    return <p>Irrelevant to the theme component</p>;
};

