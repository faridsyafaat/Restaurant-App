import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import NavbarBefore from '../../components/NavbarBefore';
import HeroSection from '../../components/HeroSection';
import CategorySection from '../../components/CategorySection';
import RecommendationSection from '../../components/RecommendationSection';
import FooterSection from '../../components/FooterSection';
export default function HomeBefore() {
    return (_jsxs("div", { className: 'min-h-screen w-full bg-white', children: [_jsx(NavbarBefore, {}), _jsx(HeroSection, {}), _jsx(CategorySection, {}), _jsx(RecommendationSection, {}), _jsx(FooterSection, {})] }));
}
