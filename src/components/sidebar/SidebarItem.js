import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLocation, useNavigate } from 'react-router-dom';
const SidebarItem = ({ item, closeSidebar }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isActive = item.path ? location.pathname === item.path : false;
    const handleClick = () => {
        if (item.onClick)
            item.onClick();
        if (item.path)
            navigate(item.path);
        closeSidebar?.();
    };
    const Icon = item.icon;
    return (_jsxs("button", { onClick: handleClick, className: `flex items-center gap-3 px-4 py-3 rounded-xl transition text-left
        ${isActive
            ? 'bg-red-100 text-red-600 font-semibold'
            : 'text-gray-700 hover:bg-gray-100'}`, children: [_jsx(Icon, { size: 20 }), _jsx("span", { children: item.label })] }));
};
export default SidebarItem;
