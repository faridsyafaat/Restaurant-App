import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarItemType } from './sidebar.types';

interface Props {
  item: SidebarItemType;
  closeSidebar?: () => void;
}

const SidebarItem: React.FC<Props> = ({ item, closeSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = item.path ? location.pathname === item.path : false;

  const handleClick = () => {
    if (item.onClick) item.onClick();
    if (item.path) navigate(item.path);
    closeSidebar?.();
  };

  const Icon = item.icon;

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition text-left
        ${
          isActive
            ? 'bg-red-100 text-red-600 font-semibold'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
    >
      <Icon size={20} />
      <span>{item.label}</span>
    </button>
  );
};

export default SidebarItem;
