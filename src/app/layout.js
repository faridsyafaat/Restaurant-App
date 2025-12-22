import { jsx as _jsx } from "react/jsx-runtime";
import { SearchProvider } from '@/context/SearchProvider';
import './globals.css';
const RootLayout = ({ children }) => {
    return _jsx(SearchProvider, { children: children });
};
export default RootLayout;
