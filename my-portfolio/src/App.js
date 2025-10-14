import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppProvider } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
const App = () => (_jsxs(AppProvider, { children: [_jsx(Sidebar, {}), _jsx(MainContent, {})] }));
export default App;
