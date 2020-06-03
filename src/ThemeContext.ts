import { createContext, useState } from "react";

// <[string, (theme: string) => void]> is the TYPE PARAMETER to make tslint happy - defines what they types are that we're passing into the createContext
const ThemeContext = createContext<[string, (theme: string) => void]>(["green", () => {/* do/return nothing - we define a func here bc that is what hooks expect/structurally look like */ }]);

export default ThemeContext;