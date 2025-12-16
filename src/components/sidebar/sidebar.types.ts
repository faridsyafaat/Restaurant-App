import { LucideIcon } from 'lucide-react';

export interface SidebarItemType {
  label: string;
  path?: string;
  icon: LucideIcon;
  onClick?: () => void;
}
